import { createClient } from "@/utils/supabase/server";
import Dashboard from "./dashboard";
import { getInvoices } from "@/services/database";

export default async function Page() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const invoices = await getInvoices();

  return (
    <div>
      <h2 className="text-2xl font-bold mt-4 mb-2">Dashboard</h2>
      <Dashboard invoices={invoices} userId={data.user?.id!} />
    </div>
  );
}
