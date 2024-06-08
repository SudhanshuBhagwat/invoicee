import Form from "@/components/Form";
import Preview from "@/components/Preview";
import NotesEditor from "@/components/notes-editor";
import TableForm from "@/components/table-form";
import { getCustomers } from "@/services/customers";
import { getCurrentUser } from "@/services/database";
import { INITIAL_STATE } from "@/store/store";
import { IQuotation } from "@/types/types";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const quotation: IQuotation = {
    ...INITIAL_STATE,
  };
  const user = await getCurrentUser(createClient());
  const customers = await getCustomers();

  return (
    <div className={`grid grid-cols-2 gap-4 divide-x-2`}>
      <Form
        initial={quotation}
        type={"invoice"}
        user={user!}
        customers={customers}
      >
        <TableForm />
        <NotesEditor notes={quotation.notes} />
      </Form>
      <Preview isSaved={true} user={user!} />
    </div>
  );
}
