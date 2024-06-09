"use server";

import { createClient } from "@/utils/supabase/server";

export default async function getInvoiceOverview() {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_total_amount_per_month");

  if (error) {
    console.error(error);
  }

  return data || [];
}
