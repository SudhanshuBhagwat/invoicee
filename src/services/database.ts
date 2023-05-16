import { Quotation } from "@/app/page";
import { IQuotation, Value } from "@/components/Form";
import { Item } from "@/components/table-form";
import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";

const QUOTATIONS: string = "quotations";
const USERS: string = "users";
const SERVICES: string = "services";

export async function getEntityNumber(
  supabase: SupabaseClient,
  entity: "Quotations" | "Invoices",
  userId: string
) {
  const { data, error } = await supabase.from(USERS).select().eq("id", userId);

  if (!error) {
    return data[0][entity.toLowerCase()];
  }
}

export async function getUser(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase
    .from(USERS)
    .select("name, company, email, mobile")
    .eq("id", userId);

  if (!error) {
    return data[0];
  }
}

export async function getDashboardQuotations(
  supabase: SupabaseClient,
  userId: string
) {
  const { data, error } = (await supabase
    .from(QUOTATIONS)
    .select("id, client_name, quote_number, date, amount")
    .eq("created_by", userId)) as PostgrestSingleResponse<Quotation[]>;

  return {
    data,
    error,
  };
}

export async function getQuotation(
  supabase: SupabaseClient,
  quotationId: string,
  userId: string
) {
  const { data, error } = await supabase
    .from(QUOTATIONS)
    .select()
    .filter("id", "eq", quotationId)
    .filter("created_by", "eq", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}

export async function createQuotation(
  supabase: SupabaseClient,
  quotation: IQuotation,
  userId: string
) {
  const { data } = await supabase
    .from(QUOTATIONS)
    .insert({
      client_name: quotation.details.clientName,
      client_mobile: quotation.details.clientMobile,
      client_email: quotation.details.clientEmail,
      client_company: quotation.details.clientCompany,
      date: quotation.date,
      amount: quotation.amount,
      quote_number: Number(quotation.id.substring(2)),
      created_by: userId,
      items: quotation.items,
    })
    .select("id");

  return data;
}

export async function updateQuotationCount(
  supabase: SupabaseClient,
  quotationCount: number,
  userId: string
) {
  const { data } = await supabase
    .from(USERS)
    .update({
      quotations: quotationCount,
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
