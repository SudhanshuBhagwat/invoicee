import Dashboard from "@/components/Dashboard";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { getDashboardForEntity } from "@/services/database";

export interface Quotation {
  id: string;
  quote_number: string;
  client_name: string;
  date: string;
  amount: number;
}

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function Page() {
  const supabase = createServerComponentClient({
    cookies,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  let { data: quotations } = await getDashboardForEntity(
    supabase,
    "quotation",
    session.user.id
  );

  let { data: invoices } = await getDashboardForEntity(
    supabase,
    "invoice",
    session.user.id
  );

  return (
    <main className="antialiased p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Dashboard
        quotations={quotations ?? []}
        invoices={invoices ?? []}
        userId={session.user.id}
      />
    </main>
  );
}
