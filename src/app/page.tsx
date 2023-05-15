import Dashboard from "@/components/Dashboard";
import { firestore } from "@/utils/firebase-admin";
import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { getDashboardQuotations, getServices } from "@/services/database";

export interface Quotation {
  quote_number: string;
  client_name: string;
  date: string;
  amount: number;
}

async function getQuotations() {
  const quotationsList: Quotation[] = [];
  const results = await firestore.collection("quotation").get();
  results.forEach((result) => {
    quotationsList.push({
      quote_number: result.id,
      client_name: result.data().details.clientName,
      date: result.data().date,
      amount: result.data().amount,
    });
  });

  return quotationsList;
}

async function getInvoices() {
  const quotationsList: Quotation[] = [];
  const results = await firestore.collection("invoices").get();
  results.forEach((result) => {
    quotationsList.push({
      quote_number: result.id,
      client_name: result.data().details.clientName,
      date: result.data().date,
      amount: result.data().amount,
    });
  });

  return quotationsList;
}

export default async function Page() {
  // const quotations = await getQuotations();
  // const invoices = await getInvoices();
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

  // let { data: service_pricing } = await supabase
  //   .from("service_pricing")
  //   .select(`*, services(*, services(*)), quotations(*)`);

  return (
    <main className="antialiased p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Dashboard quotations={quotations ?? []} invoices={invoices} />
    </main>
  );
}
