"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { invoicesTable } from "@/db/schema";
import { format } from "date-fns";
import { eq } from "drizzle-orm";

export default async function getInvoiceOverview() {
  const user = await auth();
  const invoices = await db.query.invoicesTable.findMany({
    where: eq(invoicesTable.created_by_id, user?.user?.id!),
  });
  let overviewData = {};

  for (const invoice of invoices) {
    const invoiceMonth = format(new Date(invoice.date!), "MMM");
    overviewData = {
      ...overviewData,
      [invoiceMonth]:
        (Number(overviewData[invoiceMonth as keyof typeof overviewData]) || 0) +
        Number(invoice.amount),
    };
  }

  return Object.keys(overviewData).map((data) => ({
    month: data,
    total_amount: overviewData[data as keyof typeof overviewData],
  }));
}
