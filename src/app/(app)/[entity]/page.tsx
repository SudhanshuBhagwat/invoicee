import Form, { IQuotation } from "@/components/Form";
import Preview from "@/components/Preview";
import TableForm from "@/components/table-form";
import { Entity, getUser } from "@/services/database";
import { INITIAL_STATE } from "@/store/store";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import NotesEditor from "@/components/notes-editor";

export default async function Page({
  params,
}: {
  params: { entity: Entity; id: string };
}) {
  // if (params.entity !== "quotation" && params.entity !== "invoice") {
  //   notFound();
  // }

  const supabase = createServerComponentClient({
    cookies,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const userData = await getUser(supabase, session?.user.id!);

  const initialData: IQuotation = {
    ...INITIAL_STATE,
    details: {
      ...INITIAL_STATE.details,
      ownerName: userData?.name,
      ownerCompany: userData?.company,
      ownerEmail: userData?.email,
      ownerMobile: userData?.mobile,
    },
    note: userData?.notes,
    number: `${Number(userData?.quotations) + 1}`.padStart(5, "0"),
  };

  return (
    <div className={`grid grid-cols-2 gap-4 divide-x-2`}>
      <Form initial={initialData} type={params.entity}>
        <TableForm />
        <NotesEditor notes={initialData.note} />
      </Form>
      <Preview />
    </div>
  );
}
