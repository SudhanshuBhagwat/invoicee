import "server-only";

import Form, { IQuotation } from "@/components/Form";
import Preview from "@/components/Preview";
import TableForm from "@/components/table-form";
import { Entity, getEntityNumber, getUser } from "@/services/database";
import { INITIAL_STATE } from "@/store/store";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { entity: Entity; id: string };
}) {
  if (params.entity !== "quotation" && params.entity !== "invoice") {
    notFound();
  }

  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth");
  }

  const entityCount = await getEntityNumber(
    supabase,
    params.entity,
    session?.user.id!
  );

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
    number: `${Number(entityCount) + 1}`.padStart(5, "0"),
  };

  return (
    <div className={`grid grid-cols-2 gap-4 divide-x-2`}>
      <Form initial={initialData} type={params.entity}>
        <TableForm />
      </Form>
      <Preview />
    </div>
  );
}
