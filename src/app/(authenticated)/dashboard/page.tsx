import Dashboard from "./dashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db, getInvoicesByID } from "@/lib/db";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const invoices = await getInvoicesByID(session?.user.id!);

  return (
    <div>
      <h2 className="text-2xl font-bold mt-4 mb-2">Dashboard</h2>
      <Dashboard invoices={invoices} userId={session?.user.id!} />
    </div>
  );
}
