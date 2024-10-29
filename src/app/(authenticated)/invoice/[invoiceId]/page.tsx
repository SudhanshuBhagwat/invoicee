import Form from "@/components/Form";
import Preview from "@/components/Preview";
import CreateCustomerSheet from "@/components/create-customer-sheet";
import NotesEditor from "@/components/notes-editor";
import TableForm from "@/components/table-form";
import { getCustomerById, getCustomers } from "@/services/customers";
import { getInvoiceByID } from "@/services/database";
import { redirect } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: { invoiceId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const quotation = await getInvoiceByID(params.invoiceId);
  const customers = await getCustomers();
  const customerId = searchParams["addCustomer"];
  // const customer = customerId ? await getCustomerById(String(customerId)) : {};
  let customer;

  if (!quotation) {
    redirect("/dashboard");
  }

  return (
    <div className={`lg:grid lg:grid-cols-2 lg:divide-x-2 gap-4 flex flex-col`}>
      <Form initial={quotation} type={"invoice"} customers={customers}>
        <TableForm />
        <NotesEditor notes={quotation?.notes} />
      </Form>
      <Preview isSaved={true} />
      <CreateCustomerSheet isOpen={!!customerId} initial={customer} />
    </div>
  );
}
