"use server";

import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "../database";

export default async function getTotalRevenue() {
  const supabase = createClient();
  const user = await getCurrentUser(supabase);

  const { data, error } = await supabase
    .from("invoices")
    .select("amount.sum()")
    .eq("created_by_id", user?.id!)
    .returns<{ sum: string }[]>()
    .single();

  if (error) {
    console.error(error);
  }

  return data?.sum;
}
