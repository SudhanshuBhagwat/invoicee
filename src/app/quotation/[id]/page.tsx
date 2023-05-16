import Form, { IQuotation } from "@/components/Form";
import Preview from "@/components/Preview";
import TableForm from "@/components/table-form";
import { getQuotation, getUser } from "@/services/database";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

interface Props {
  params: { id: string };
}

export default async function Page({ params }: Props) {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const quotationData = await getQuotation(
    supabase,
    params.id,
    session?.user.id!
  );
  const userData = await getUser(supabase, session?.user.id!);

  const quotation: IQuotation = {
    id: quotationData.id,
    amount: quotationData.amount,
    date: quotationData.date,
    details: {
      clientName: quotationData["client_name"],
      clientCompany: quotationData["client_company"],
      clientMobile: quotationData["client_mobile"],
      clientEmail: quotationData["client_email"],
      ownerName: userData?.name,
      ownerCompany: userData?.company,
      ownerEmail: userData?.email,
      ownerMobile: userData?.mobile,
    },
    number: `${Number(quotationData["quote_number"]) + 1}`.padStart(5, "0"),
    items: quotationData.items,
    note: [],
  };

  return (
    <div className={`grid grid-cols-2 gap-4 divide-x-2`}>
      <Form initial={quotation} type="Quotation">
        <TableForm />
      </Form>
      <Preview />
    </div>
  );
}
