"use server";

import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "./database";
import { Customer } from "@/types/types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import getUnpaidInvoiceForCustomer from "./customers/get_unpaid-invoice-for-customer";

export async function getCustomers() {
  const customers: Customer[] = [];
  const supabase = createClient();
  const user = await getCurrentUser(supabase);

  const { data, error } = await supabase
    .from("customers")
    .select("*, invoices(totalInvoices:id.count(), totalRevenue:amount.sum())")
    .eq("user_id", user?.id!);

  if (!error) {
    for (const customer of data) {
      const unpaidInvoiceForCustomer = await getUnpaidInvoiceForCustomer(
        customer.id
      );
      customers.push({
        ...customer,
        invoices: {
          // @ts-ignore
          ...customer.invoices["0"],
          ...unpaidInvoiceForCustomer,
        },
      });
    }
  }

  console.log(customers[4]);
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
  const { error } = await supabase.from("customers").insert(rawFormData);

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
    .eq("id", id)
    .single();

  if (error || !user) {
    return null;
  }

  return customer;
}
