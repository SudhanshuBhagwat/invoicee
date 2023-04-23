import Form, { IQuotation } from "@/components/Form";
import Preview from "@/components/Preview";
import { firestore } from "@/utils/firebase-admin";
import { redirect } from "next/navigation";

async function fetchInvoice(id: string) {
  const invoice = await firestore.collection("invoice").doc(id).get();
  if (invoice.exists) {
    return invoice.data() as IQuotation;
  }
  return redirect("/invoice");
}

interface Props {
  params: { id: string };
}

export default async function Page({ params }: Props) {
  const invoice = await fetchInvoice(params.id);

  return <div className={`grid grid-cols-2 gap-4 divide-x-2`}>
    <Form type="Quotation" initial={invoice} />
    <Preview />
  </div>
}
