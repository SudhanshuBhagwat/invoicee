import QuotationForm from "@/components/QuotationForm";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Invoicee</h1>
      <section className="mt-6 space-y-4">
        <QuotationForm />
      </section>
    </main >
  )
}
