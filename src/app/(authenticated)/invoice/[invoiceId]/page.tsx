import Form from "@/components/Form";
import Preview from "@/components/Preview";
import NotesEditor from "@/components/notes-editor";
import TableForm from "@/components/table-form";
import { getCustomers } from "@/services/customers";
import { getCurrentUser, getInvoiceByID } from "@/services/database";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { invoiceId: string };
}) {
  const quotation = await getInvoiceByID(params.invoiceId);
  const user = await getCurrentUser(createClient());
  const customers = await getCustomers();

  if (!quotation) {
    redirect("/dashboard");
  }

  return (
    <div className={`grid grid-cols-2 gap-4 divide-x-2`}>
      <Form
        initial={quotation}
        type={"invoice"}
        user={user!}
        customers={customers}
      >
        <TableForm />
        <NotesEditor notes={quotation?.notes} />
      </Form>
      <Preview isSaved={true} user={user!} />
    </div>
  );
}
