import Form from "@/components/Form";
import Preview from "@/components/Preview";
import NotesEditor from "@/components/notes-editor";
import TableForm from "@/components/table-form";
import { getCustomers } from "@/services/customers";
import { INITIAL_STATE } from "@/store/store";
import { IQuotation } from "@/types/types";

export default async function Page() {
  const quotation: IQuotation = {
    ...INITIAL_STATE,
  };
  const customers = await getCustomers();

  return (
    <div className={`lg:grid lg:grid-cols-2 lg:divide-x-2 gap-4 flex flex-col`}>
      <Form initial={quotation} type={"invoice"} customers={customers}>
        <TableForm />
        <NotesEditor notes={quotation.notes} />
      </Form>
      <Preview isSaved={true} />
    </div>
  );
}
