"use server";

import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "../database";

export default async function getTotalCustomers() {
  const supabase = createClient();
  const user = await getCurrentUser(supabase);

  const { data, error } = await supabase
    .from("customers")
    .select("id.count()")
    .eq("user_id", user?.id!)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}
