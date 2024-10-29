"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { customersTable } from "@/db/schema";
import { count, eq } from "drizzle-orm";

export default async function getTotalCustomers() {
  const session = await auth();

  const customerCount = await db
    .select({ sum: count() })
    .from(customersTable)
    .where(eq(customersTable.user_id, session?.user?.id!));

  return customerCount[0].sum;
}
