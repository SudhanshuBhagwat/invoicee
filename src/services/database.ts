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
    return data[0];
  }
}

export async function getUser(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase
    .from(USERS)
    .select("name, company, email, mobile, quotations, notes")
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
    .select("id, client_name, quote_number, date, amount, created_by")
    .filter("created_by", "eq", userId)) as PostgrestSingleResponse<
    Quotation[]
  >;

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
      notes: quotation.note,
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
      notes: quotation.note,
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
