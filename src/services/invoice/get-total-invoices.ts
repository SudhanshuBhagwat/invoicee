"use server";

import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "../database";

export default async function getTotalInvoices() {
  const supabase = createClient();
  const user = await getCurrentUser(supabase);

  const { data, error } = await supabase
    .from("invoices")
    .select("id.count()")
    .eq("created_by_id", user?.id!)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}
