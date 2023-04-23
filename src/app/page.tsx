import Dashboard from "@/components/Dashboard";
import { firestore } from "@/utils/firebase-admin";

export interface Quotation {
  number: string,
  name: string,
  date: string,
  amount: number
}

async function getQuotations() {
  const quotationsList: Quotation[] = [];
  const results = await firestore.collection("quotation").get();
  results.forEach((result) => {
    quotationsList.push({
      number: result.id,
      name: result.data().details.clientName,
      date: result.data().date,
      amount: result.data().amount
    });
  })

  return quotationsList;
}

async function getInvoices() {
  const quotationsList: Quotation[] = [];
  const results = await firestore.collection("invoices").get();
  results.forEach((result) => {
    quotationsList.push({
      number: result.id,
      name: result.data().details.clientName,
      date: result.data().date,
      amount: result.data().amount
    });
  })

  return quotationsList;
}

export default async function Page() {
  const quotations = await getQuotations();
  const invoices = await getInvoices();

  return <main className="antialiased">
    <h1 className="text-2xl font-bold">Dashboard</h1>
    <Dashboard quotations={quotations} invoices={invoices} />
  </main>
}
