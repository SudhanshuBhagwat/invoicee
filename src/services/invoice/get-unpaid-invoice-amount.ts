"use server";

import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "../database";

export default async function getUnpaidInvoiceAmount() {
  const supabase = createClient();

  const user = await getCurrentUser(supabase);

  const { data, error } = await supabase
    .from("invoices")
    .select("amount.sum()")
    .neq("status", "2")
    .eq("created_by_id", user?.id!)
    .returns<{ sum: string }[]>()
    .single();

  if (error) {
    return error;
  }

  return data?.sum;
}
