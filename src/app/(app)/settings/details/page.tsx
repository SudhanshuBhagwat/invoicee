import { getUser } from "@/services/database";
import {
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserDetails from "./user-details";

export default async function Page() {
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

  return (
    <div className="px-6 mt-2">
      <UserDetails data={userData}/>
    </div>
  );
}
