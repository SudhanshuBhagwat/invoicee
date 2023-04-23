import Form from "@/components/Form";
import Preview from "@/components/Preview";
import { firestore } from "@/utils/firebase-admin";

async function fetchQuotationCount() {
  const result = await firestore.collection("quotation").count().get();
  const count = result.data().count;

  return count === 0 ? `${1}`.padStart(5, "0") : `${Number(count) + 1}`.padStart(5, "0");
}

export default async function Page() {
  const count = await fetchQuotationCount();

  return <div className={`grid grid-cols-2 gap-4 divide-x-2`}>
    <Form type="Quotation" initial={count} />
    <Preview />
  </div>
}
