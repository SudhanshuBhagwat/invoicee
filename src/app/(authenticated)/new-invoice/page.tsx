import Form, { IQuotation } from "@/components/Form";
import Preview from "@/components/Preview";
import NotesEditor from "@/components/notes-editor";
import TableForm from "@/components/table-form";
import { INITIAL_STATE } from "@/store/store";

export default function Page() {
  const quotation: IQuotation = {
    ...INITIAL_STATE,
    note: "",
  };

  return (
    <div className={`grid grid-cols-2 gap-4 divide-x-2`}>
      <Form initial={quotation} type={"invoice"}>
        <TableForm />
        <NotesEditor notes={quotation.note} />
      </Form>
      <Preview isSaved={true} />
    </div>
  );
}
