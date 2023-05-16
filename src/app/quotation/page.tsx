import Form, { IQuotation } from "@/components/Form";
import Preview from "@/components/Preview";
import TableForm from "@/components/table-form";
import { getEntityNumber, getUser } from "@/services/database";
import { INITIAL_STATE } from "@/store/store";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

export default async function Page() {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const quotationCount = await getEntityNumber(
    supabase,
    "Quotations",
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
    id: `${Number(quotationCount) + 1}`.padStart(5, "0"),
  };

  const type = "Quotation";

  return (
    <div className={`grid grid-cols-2 gap-4 divide-x-2`}>
      <Form initial={initialData} type="Quotation">
        <TableForm />
      </Form>
      <Preview />
    </div>
  );
}
