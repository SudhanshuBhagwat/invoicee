import Form, { IQuotation } from "@/components/Form";
import Preview from "@/components/Preview";
import { firestore } from "@/utils/firebase-admin";
import { redirect } from "next/navigation";

async function fetchQuotation(id: string) {
  const quotation = await firestore.collection("quotation").doc(id).get();
  if (quotation.exists) {
    return quotation.data() as IQuotation;
  }
  return redirect("/quotation");
}

export default async function Page({ params }) {
  const quotation = await fetchQuotation(params.id);

  return <div className={`grid grid-cols-2 gap-4 divide-x-2`}>
    <Form type="Quotation" initial={quotation} />
    <Preview />
  </div>
}
