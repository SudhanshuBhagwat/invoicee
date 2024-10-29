"use server";

import { createClient } from "@/utils/supabase/server";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { getCurrentUser } from "../database";

export default async function getInvoicesForMonth() {
  const supabase = createClient();
  const start = format(startOfMonth(new Date()), "yyyy-MM-dd");
  const end = format(endOfMonth(new Date()), "yyyy-MM-dd");
  const user = await getCurrentUser(supabase);
  console.log({ end, user });

  const { data, error } = await supabase
    .from("invoices")
    .select("amount, customers(id, first_name, last_name, email)")
    .gt("created_at", start)
    .lt("created_at", end)
    .eq("created_by_id", user?.id!);

  if (error) {
    console.error(error);
  }

  return data;
}
