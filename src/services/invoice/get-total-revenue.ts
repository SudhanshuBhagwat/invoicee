"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { invoicesTable, users } from "@/db/schema";
import { eq, sum } from "drizzle-orm";

export default async function getTotalRevenue() {
  const session = await auth();

  const amount = await db
    .select({ sum: sum(invoicesTable.amount) })
    .from(invoicesTable)
    .where(eq(invoicesTable.created_by_id, session?.user?.id!));

  return amount[0].sum;
}
