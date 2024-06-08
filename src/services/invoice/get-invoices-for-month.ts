"use server";

import { createClient } from "@/utils/supabase/server";
import { endOfMonth, format, startOfMonth } from "date-fns";

export default async function getInvoicesForMonth() {
  const supabase = createClient();
  const start = format(startOfMonth(new Date()), "yyyy-MM-dd");
  const end = format(endOfMonth(new Date()), "yyyy-MM-dd");

  const { data, error } = await supabase
    .from("invoices")
    .select("amount, customers(id, first_name, last_name, email)")
    .gt("created_at", start)
    .lt("created_at", end);

  if (error) {
    console.error(error);
  }

  return data;
}
