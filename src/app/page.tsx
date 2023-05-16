import Dashboard from "@/components/Dashboard";
import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { getDashboardQuotations } from "@/services/database";

export interface Quotation {
  id: string;
  quote_number: string;
  client_name: string;
  date: string;
  amount: number;
}

export default async function Page() {
  const invoices: Quotation[] = [];
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth");
  }

  let { data: quotations, error } = await getDashboardQuotations(
    supabase,
    session.user.id
  );

  return (
    <main className="antialiased p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Dashboard quotations={quotations ?? []} invoices={invoices} />
    </main>
  );
}
