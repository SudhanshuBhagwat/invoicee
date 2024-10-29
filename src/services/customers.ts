"use server";

import { Customer } from "@/types/types";
import { revalidatePath } from "next/cache";
import getUnpaidInvoiceForCustomer from "./customers/get_unpaid-invoice-for-customer";
import { auth } from "@/auth";
import { db } from "@/db";
import { customersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { v4 } from "uuid";
import { redirect } from "next/navigation";

export async function getCustomers() {
  const customers: Customer[] = [];
  const session = await auth();

  const serverCustomers = await db.query.customersTable.findMany({
    where: eq(customersTable.user_id, session?.user?.id!),
    with: {
      invoicesTable: true,
    },
  });

  for (const customer of serverCustomers) {
    // const unpaidInvoiceForCustomer = await getUnpaidInvoiceForCustomer(
    //   customer.id
    // );
    const totalRevenue = customer.invoicesTable.reduce(
      (acc, currentValue) => acc + Number(currentValue.amount),
      0
    );
    const amountDue = customer.invoicesTable.reduce((acc, currentValue) => {
      if (currentValue.status !== 2) {
        return acc + Number(currentValue.amount);
      }

      return acc;
    }, 0);
    const totalInvoices = customer.invoicesTable.length;
    customers.push({
      ...customer,
      invoices: {
        totalInvoices,
        totalRevenue,
        amountDue,
      },
      // invoices: {
      //   // @ts-ignore
      //   ...customer.invoices["0"],
      //   ...unpaidInvoiceForCustomer,
      // },
    });
  }

  return customers;
}

export async function createCustomer(
  customerId: string | null | undefined,
  pathname: string,
  formData: FormData
) {
  const session = await auth();

  const rawFormData = {
    first_name: formData.get("first-name")?.toString(),
    last_name: formData.get("last-name")?.toString(),
    mobile: formData.get("number")?.toString(),
    email: formData.get("email")?.toString(),
    company: formData.get("company")?.toString(),
    billing_address: formData.get("address")?.toString(),
    gst_number: formData.get("gst")?.toString(),
    user_id: session?.user?.id!,
  };

  try {
    if (customerId) {
      await db
        .update(customersTable)
        .set(rawFormData)
        .where(eq(customersTable.id, customerId));
    } else {
      await db.insert(customersTable).values({
        id: v4(),
        ...rawFormData,
      });
    }
  } catch (error) {
    console.error({ error });
  } finally {
    revalidatePath("/customers");
    redirect("/customers");
  }
}

export async function deleteCustomer(customerId: string) {
  try {
    await db.delete(customersTable).where(eq(customersTable.id, customerId));
  } catch (error) {
    console.error({ error });
  } finally {
    revalidatePath("/customers");
    redirect("/customers");
  }
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  const customer = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.id, id));

  return customer[0];
}
