import { createClient } from "@/utils/supabase/server";
import Dashboard from "./dashboard";
import { getInvoices } from "@/services/database";

export default async function Page() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const invoices = await getInvoices();

  return (
    <div className="mt-4 mx-6">
      <Dashboard invoices={invoices} userId={data.user?.id!} />
    </div>
  );
}
