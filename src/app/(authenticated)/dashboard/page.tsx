import { getDashboardForEntity } from "@/services/database";
import Dashboard from "./dashboard";
import supabase from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return <div>Dashboard</div>;
}
