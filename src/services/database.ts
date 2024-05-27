"use server";

import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { format, parseISO } from "date-fns";
import { calculateTotalAmount } from "@/utils/utils";
import { IQuotation, UserData, Value } from "@/types/types";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const QUOTATIONS: string = "quotations";
const INVOICES: string = "invoices";
const USERS: string = "users";

export type Entity = "quotation" | "invoice";

export async function getEntityNumber(
  supabase: SupabaseClient,
  entity: Entity,
  userId: string
) {
  const { data, error } = await supabase.from(USERS).select().eq("id", userId);

  if (!error) {
    return data[0];
  }
}

export async function getUser(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase
    .from(USERS)
    .select("name, company, email, mobile, quotations, invoices, notes")
    .eq("id", userId);

  if (!error) {
    return data[0];
  }
}

export async function updateUserDetails(
  supabase: SupabaseClient,
  details: any,
  userId: string
) {
  const { data, error } = await supabase
    .from(USERS)
    .update(details)
    .eq("id", userId);
}

export async function getDashboardForEntity(
  supabase: SupabaseClient,
  entity: Entity,
  userId: string
) {
  const { data, error } = (await supabase
    .from(entity === "quotation" ? QUOTATIONS : INVOICES)
    .select("id, client_name, quote_number, date, amount, created_by")
    .filter("created_by", "eq", userId)
    .order("quote_number", { ascending: false })
    .limit(5)) as PostgrestSingleResponse<any[]>;

  return {
    data,
    error,
  };
}

export async function getEntity(
  supabase: SupabaseClient,
  entity: Entity,
  entityId: string,
  userId: string
) {
  const { data, error } = await supabase
    .from(entity === "quotation" ? QUOTATIONS : INVOICES)
    .select()
    .eq("id", entityId)
    .filter("created_by", "eq", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}

export async function createEntity(
  supabase: SupabaseClient,
  entity: Entity,
  quotation: IQuotation,
  userId: string
) {
  const { data } = await supabase
    .from(entity === "quotation" ? QUOTATIONS : INVOICES)
    .insert({
      client_name: quotation.details.clientName,
      client_mobile: quotation.details.clientMobile,
      client_email: quotation.details.clientEmail,
      client_company: quotation.details.clientCompany,
      date: quotation.date,
      amount: quotation.amount,
      quote_number: Number(quotation.number.substring(2)),
      created_by: userId,
      items: quotation.items,
      notes: quotation.notes,
    })
    .select("id");

  return data;
}

export async function updateEntity(
  supabase: SupabaseClient,
  entity: Entity,
  quotation: IQuotation
) {
  const { data } = await supabase
    .from(entity === "quotation" ? QUOTATIONS : INVOICES)
    .update({
      client_name: quotation.details.clientName,
      client_mobile: quotation.details.clientMobile,
      client_email: quotation.details.clientEmail,
      client_company: quotation.details.clientCompany,
      amount: quotation.amount,
      items: quotation.items,
      notes: quotation.notes,
    })
    .eq("id", quotation.id);

  return data;
}

export async function deleteEntity(
  supabase: SupabaseClient,
  entity: string,
  id: string
) {
  const { data } = await supabase
    .from(entity === "quotation" ? QUOTATIONS : INVOICES)
    .delete()
    .eq("id", id);

  return data;
}

export async function updateEntityCount(
  supabase: SupabaseClient,
  entity: Entity,
  entityCount: number,
  userId: string
) {
  const { data } = await supabase
    .from(USERS)
    .update({
      [`${entity}s`]: entityCount,
    })
    .eq("id", userId);

  return data;
}

export async function getServices(supabase: SupabaseClient, userId: string) {
  const services: Value[] = [];
  const categories: Value[] = [];
  let { data } = await supabase
    .from("services")
    .select(`*, services(*)`)
    .eq("created_by", userId)
    .is("parent_id", null);

  data?.forEach((service) => {
    services.push({
      id: service.id,
      value: service.name,
      description: service.description,
    });

    if (service.services.length > 0) {
      service?.services.forEach((category: any) => {
        categories.push({
          id: category.id,
          value: category.name,
          description: category.description,
        });
      });
    }
  });

  return {
    services,
    categories,
  };
}

export async function getInvoiceByID(id: string) {
  const supabase = createClient();
  const user = await getCurrentUser(supabase);
  const { data: invoice, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id);

  if ((!error && invoice.length === 0) || !user) {
    return null;
  }

  return {
    amount: invoice![0].amount || 0,
    date: format(invoice![0].date, "yyyy-MM-dd"),
    id: invoice![0].id,
    number: String(invoice![0].quote_number),
    items: JSON.parse(invoice![0].items),
    notes: JSON.parse(invoice![0].notes || ""),
    details: {
      clientCompany: invoice![0].client_company,
      clientEmail: invoice![0].client_email,
      clientMobile: invoice![0].client_mobile,
      clientName: invoice![0].client_name,
      ownerCompany: user.company || "",
      ownerEmail: user.email || "",
      ownerMobile: user.mobile || "",
      ownerName: user.name || "",
    },
  };
}

export async function getInvoices() {
  const invoices: IQuotation[] = [];
  const supabase = createClient();
  const user = await getCurrentUser(supabase);
  const serverInvoices = await supabase
    .from("invoices")
    .select("*")
    .eq("created_by_id", user!.id);

  if (serverInvoices.count === 0 || !user) {
    return invoices;
  }

  for (const invoice of serverInvoices.data!) {
    invoices.push({
      amount: invoice.amount || 0,
      date: format(parseISO(invoice.date), "yyyy-MM-dd"),
      id: invoice.id,
      number: String(invoice.quote_number),
      items: JSON.parse(invoice.items),
      notes: JSON.parse(invoice.notes || ""),
      details: {
        clientCompany: invoice.client_company,
        clientEmail: invoice.client_email,
        clientMobile: invoice.client_mobile,
        clientName: invoice.client_name,
        ownerCompany: user.company || "",
        ownerEmail: user.email || "",
        ownerMobile: user.mobile || "",
        ownerName: user.name || "",
      },
    });
  }

  return invoices;
}

export async function getCurrentUser(
  client: SupabaseClient
): Promise<UserData | null> {
  const user = await client.auth.getUser();
  const userData = await client
    .from("User")
    .select("*")
    .eq("provider_id", user.data.user?.id!);

  if (!user.error && !userData.error) {
    return {
      id: userData.data[0].id,
      providerId: user.data.user.id,
      name: userData.data[0].name!,
      company: userData.data[0].company!,
      email: userData.data[0].email!,
      mobile: userData.data[0].mobile!,
    };
  }

  return null;
}

export async function createInvoice(quotation: IQuotation, userId: string) {
  const supabase = await createClient();
  const totalAmount = calculateTotalAmount(quotation);

  let finalQuote = {
    amount: Number(totalAmount),
    created_at: quotation.date,
    client_company: quotation.details.clientCompany,
    client_email: quotation.details.clientEmail,
    client_mobile: quotation.details.clientMobile,
    client_name: quotation.details.clientName,
    date: quotation.date,
    items: JSON.stringify(quotation.items),
    notes: JSON.stringify(quotation.notes),
    quote_number: Number(quotation.number),
    created_by_id: userId,
  };

  let result;

  if (quotation.id) {
    result = await supabase
      .from("invoices")
      .update(finalQuote)
      .eq("id", quotation.id);
  } else {
    result = await supabase.from("invoices").insert(finalQuote);
  }

  if (!result.error) {
    revalidatePath("/dashboard");
    redirect("/dashboard");
  }
}

export async function deleteInvoice(invoiceId: string) {
  console.log(invoiceId);
  const supabase = await createClient();
  const { error } = await supabase
    .from("invoices")
    .delete()
    .eq("id", invoiceId);
  console.log(error);
  if (!error) {
    revalidatePath("/dashboard");
  }
}
