import { Quotation } from "@/app/page";
import { IQuotation, Value } from "@/components/Form";
import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";

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
    return data[0][`${entity.toLowerCase()}s`];
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

export async function getDashboardForEntity(
  supabase: SupabaseClient,
  entity: Entity,
  userId: string
) {
  const { data, error } = (await supabase
    .from(entity === "quotation" ? QUOTATIONS : INVOICES)
    .select("id, client_name, quote_number, date, amount")
    .eq("created_by", userId)) as PostgrestSingleResponse<Quotation[]>;

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
    .filter("id", "eq", entityId)
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
      quote_number: Number(quotation.id.substring(2)),
      created_by: userId,
      items: quotation.items,
    })
    .select("id");

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
      [entity]: entityCount,
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
