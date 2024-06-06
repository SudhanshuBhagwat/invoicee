"use server";

import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "./database";
import { Customer } from "@/types/types";
import { redirect } from "next/navigation";

export async function getCustomers() {
  const customers: Customer[] = [];
  const supabase = createClient();
  const user = await getCurrentUser(supabase);

  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("user_id", user?.id!);

  if (!error) {
    for (const customer of data) {
      customers.push({
        id: customer.id,
        first_name: customer.first_name || "",
        last_name: customer.last_name,
        company: customer.company || "",
        mobile: customer.mobile || "",
        email: customer.email || "",
        user_id: customer.user_id,
        created_at: customer.created_at || "",
      });
    }
  }

  return customers;
}

export async function createCustomer(formData: FormData) {
  const supabase = createClient();
  const user = await getCurrentUser(supabase);

  const rawFormData = {
    first_name: formData.get("first-name")?.toString(),
    last_name: formData.get("last-name")?.toString(),
    mobile: formData.get("number")?.toString(),
    email: formData.get("email")?.toString(),
    company: formData.get("company")?.toString(),
    billing_address: formData.get("address")?.toString(),
    user_id: user?.id!,
  };
  const { data, error } = await supabase.from("customers").insert(rawFormData);

  if (!error) {
    redirect("/customers");
  }
}
