"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { endOfMonth, format, startOfMonth } from "date-fns";

export default async function getInvoicesForMonth() {
  const session = await auth();
  const start = format(startOfMonth(new Date()), "yyyy-MM-dd");
  const end = format(endOfMonth(new Date()), "yyyy-MM-dd");

  const invoices = await db.query.invoicesTable.findMany({
    where: (invoices, { between, and, eq }) =>
      and(
        between(invoices.date, start, end),
        eq(invoices.created_by_id, session?.user?.id!)
      ),
    with: {
      customers: true,
    },
    orderBy: (invoices, { desc }) => [desc(invoices.amount)],
  });

  return invoices;
}
