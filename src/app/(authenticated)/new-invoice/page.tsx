import Form, { IQuotation } from "@/components/Form";
import Preview from "@/components/Preview";
import NotesEditor from "@/components/notes-editor";
import TableForm from "@/components/table-form";
import { getCurrentUser } from "@/services/database";
import { INITIAL_STATE } from "@/store/store";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const quotation: IQuotation = {
    ...INITIAL_STATE,
  };
  const user = await getCurrentUser(createClient());

  return (
    <div className={`grid grid-cols-2 gap-4 divide-x-2`}>
      <Form initial={quotation} type={"invoice"} user={user!}>
        <TableForm />
        <NotesEditor notes={quotation.notes} />
      </Form>
      <Preview isSaved={true} user={user!} />
    </div>
  );
}
