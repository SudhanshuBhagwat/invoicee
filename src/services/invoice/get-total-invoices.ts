"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { invoicesTable } from "@/db/schema";
import { count, eq } from "drizzle-orm";

export default async function getTotalInvoices() {
  const session = await auth();

  const invoiceCount = await db
    .select({ sum: count() })
    .from(invoicesTable)
    .where(eq(invoicesTable.created_by_id, session?.user?.id!));

  return invoiceCount[0].sum;
}
