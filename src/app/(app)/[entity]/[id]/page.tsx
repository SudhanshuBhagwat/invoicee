import Form, { IQuotation } from "@/components/Form";
import Preview from "@/components/Preview";
import TableForm from "@/components/table-form";
import { Entity, getEntity, getUser } from "@/services/database";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import NotesEditor from "@/components/notes-editor";

interface Props {
  params: { entity: Entity; id: string };
}

export default async function Page({ params }: Props) {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const quotationData = await getEntity(
    supabase,
    params.entity,
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
    number: `${Number(quotationData["quote_number"])}`.padStart(5, "0"),
    items: quotationData.items,
    note: userData?.notes,
  };

  return (
    <div className={`grid grid-cols-2 gap-4 divide-x-2`}>
      <Form initial={quotation} type={params.entity}>
        <TableForm />
        <NotesEditor notes={quotation.note} />
      </Form>
      <Preview isSaved={!!quotation} />
    </div>
  );
}
