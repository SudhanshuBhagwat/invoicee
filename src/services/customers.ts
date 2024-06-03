import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "./database";
import { Customer } from "@/types/types";

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
        name: customer.name || "",
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
