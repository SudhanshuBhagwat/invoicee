import { createClient } from "@/utils/supabase/server";
import Dashboard from "./dashboard";
import { getInvoices } from "@/services/database";

export default async function Page() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const invoices = await getInvoices();

  return (
    <div className="mx-6 py-2">
      <Dashboard invoices={invoices} userId={data.user?.id!} />
    </div>
  );
}
