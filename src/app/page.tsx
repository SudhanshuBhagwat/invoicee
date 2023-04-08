import QuotationForm from "@/components/QuotationForm";
import Preview from "@/components/Preview";

export default function Home() {
  return (
    <main className="">
      <nav className="bg-slate-100 px-6 py-4">
        <h1 className="text-3xl font-bold">Invoicee</h1>
      </nav>
      <section className="mt-6 space-y-4 px-6">
        {/* <QuotationForm /> */}
        <Preview />
      </section>
    </main >
  )
}
