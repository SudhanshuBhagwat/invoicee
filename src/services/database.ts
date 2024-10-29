"use server";

import { SupabaseClient } from "@supabase/supabase-js";
import { format, parseISO } from "date-fns";
import { calculateTotalAmount } from "@/utils/utils";
import { IQuotation, Status, UserData } from "@/types/types";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { DEFAULT_DATE_FORMAT } from "@/lib/utils";
import { cache } from "react";
import { auth, signIn as signInWithAuth } from "@/auth";
import { db } from "@/db";
import { customersTable, invoicesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { v4 } from "uuid";

export type Entity = "quotation" | "invoice";

export async function getInvoiceByID(id: string) {
  const invoice = await db.query.invoicesTable.findMany({
    where: eq(invoicesTable.id, id),
    with: {
      customers: true,
    },
  });

  return {
    amount: Number(invoice[0].amount) || 0,
    date: invoice[0].date,
    id: invoice[0].id,
    number: String(invoice[0].quote_number),
    items: JSON.parse(String(invoice[0].items)),
    notes: JSON.parse(invoice[0].notes || ""),
    status: Number(invoice[0].status),
    customer_id: invoice[0].customer_id,
    customer: invoice[0].customers,
    taxPercent: Number(invoice[0].tax_percentage) || 0,
    discountPercent: Number(invoice[0].discount_percentage) || 0,
  };
}

export async function getInvoices() {
  const invoices: IQuotation[] = [];
  const session = await auth();

  const serverInvoices = await db.query.invoicesTable.findMany({
    where: eq(invoicesTable.created_by_id, session?.user?.id!),
    with: {
      customers: true,
    },
  });

  for (const invoice of serverInvoices) {
    invoices.push({
      amount: Number(invoice.amount) || 0,
      date: format(parseISO(invoice.date!), DEFAULT_DATE_FORMAT),
      id: invoice.id,
      number: String(invoice.quote_number),
      status: invoice.status!,
      customer_id: invoice.customer_id,
      customer: invoice.customers,
      discountPercent: Number(invoice.discount_percentage) || 0,
      taxPercent: Number(invoice.tax_percentage) || 0,
    });
  }

  return invoices;
}

export const getSupabaseUser = cache(async (client: SupabaseClient) => {
  return await client.auth.getUser();
});

export const getCurrentUser = cache(
  async (client: SupabaseClient): Promise<UserData | null> => {
    const user = await getSupabaseUser(client);
    const { data } = await client
      .from("User")
      .select("*")
      .eq("provider_id", user.data.user?.id!)
      .single()
      .throwOnError();

    return data;
  }
);

export async function createInvoice(quotation: IQuotation, userId: string) {
  const totalAmount = calculateTotalAmount(quotation);

  let finalQuote = {
    amount: String(totalAmount),
    created_at: quotation.date,
    date: quotation.date,
    items: JSON.stringify(quotation.items),
    notes: JSON.stringify(quotation.notes),
    quote_number: String(quotation.number),
    created_by_id: userId,
    status: quotation.status,
    customer_id: quotation.customer_id,
    tax_percentage: String(quotation.taxPercent),
    discount_percentage: String(quotation.discountPercent),
  };

  try {
    if (quotation.id) {
      await db
        .update(invoicesTable)
        .set(finalQuote)
        .where(eq(invoicesTable.id, quotation.id));
    } else {
      await db.insert(invoicesTable).values({
        id: v4(),
        ...finalQuote,
      });
    }
  } catch (error) {
    console.error({ error });
  } finally {
    revalidatePath("/invoices");
    redirect("/invoices");
  }
}

export async function deleteInvoice(invoiceId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("invoices")
    .delete()
    .eq("id", invoiceId);
  if (!error) {
    revalidatePath("/dashboard");
  }
}

export async function signIn() {
  await signInWithAuth("google", { redirectTo: "/dashboard" });
}
