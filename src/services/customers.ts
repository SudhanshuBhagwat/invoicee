"use server";

import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "./database";
import { Customer } from "@/types/types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
        billing_address: customer.billing_address || "",
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

export async function deleteCustomer(customerId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("invoices")
    .delete()
    .eq("id", customerId);
  if (!error) {
    revalidatePath("/customers");
  }
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  const supabase = createClient();
  const user = await getCurrentUser(supabase);
  const { data: customer, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id);

  if ((!error && customer.length === 0) || !user) {
    return null;
  }

  return {
    company: customer![0].company!,
    email: customer![0].email!,
    first_name: customer![0].first_name!,
    last_name: customer![0].last_name!,
    mobile: customer![0].mobile!,
    id: customer![0].id!,
    user_id: customer![0].user_id!,
    created_at: customer![0].created_at!,
    billing_address: customer![0].billing_address!,
  };
}
