"use server";

import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "../database";

export default async function getUnpaidInvoiceForCustomer(customer_id: string) {
  const supabase = createClient();

  const user = await getCurrentUser(supabase);

  const { data, error } = await supabase
    .from("invoices")
    .select("amountDue:amount.sum(), firstInvoiceDate:date.min()")
    .neq("status", "2")
    .eq("created_by_id", user?.id!)
    .eq("customer_id", customer_id)
    .returns<{ amountDate: string; firstInvoiceDate: string }[]>()
    .single();

  if (error) {
    return error;
  }

  return data;
}
