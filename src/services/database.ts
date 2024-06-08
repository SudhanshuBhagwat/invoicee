"use server";

import { SupabaseClient } from "@supabase/supabase-js";
import { format, parseISO } from "date-fns";
import { calculateTotalAmount } from "@/utils/utils";
import { IQuotation, UserData } from "@/types/types";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type Entity = "quotation" | "invoice";

export async function getInvoiceByID(id: string) {
  const supabase = createClient();
  const user = await getCurrentUser(supabase);
  const { data: invoice, error } = await supabase
    .from("invoices")
    .select("*, customers(*)")
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
    status: invoice![0].status,
    customer_id: invoice![0].customer_id,
    customer: invoice![0].customers,
    details: {
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
    .select("*, customers(*)")
    .eq("created_by_id", user!.id);

  if (!serverInvoices.data || !user) {
    return invoices;
  }

  for (const invoice of serverInvoices.data) {
    invoices.push({
      amount: invoice.amount || 0,
      date: format(parseISO(invoice.date), "yyyy-MM-dd"),
      id: invoice.id,
      number: String(invoice.quote_number),
      status: invoice.status,
      customer_id: invoice.customer_id,
      customer: invoice.customers,
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
    date: quotation.date,
    items: JSON.stringify(quotation.items),
    notes: JSON.stringify(quotation.notes),
    quote_number: Number(quotation.number),
    created_by_id: userId,
    status: quotation.status,
    customer_id: quotation.customer_id,
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
    revalidatePath("/invoices");
    redirect("/invoices");
  }
}

export async function deleteInvoice(invoiceId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("invoices")
    .delete()
    .eq("id", invoiceId);
  if (!error) {
    revalidatePath("/dashboard");
  }
}
