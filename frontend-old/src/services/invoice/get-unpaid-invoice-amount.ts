"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { invoicesTable } from "@/db/schema";
import { count, sql } from "drizzle-orm";

export default async function getUnpaidInvoiceAmount() {
  const session = await auth();

  const unpaidInvoiceAmount = await db
    .select({ sum: count() })
    .from(invoicesTable)
    .where(
      sql`${invoicesTable.status} != 2 AND ${invoicesTable.created_by_id} = ${session?.user?.id}`
    );
  console.log({ unpaidInvoiceAmount });

  return unpaidInvoiceAmount[0].sum;
}
