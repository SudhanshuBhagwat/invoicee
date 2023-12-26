import { IQuotation } from "@/components/Form";
import { PrismaClient } from "@prisma/client";
import { format } from "date-fns";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export async function getInvoicesByID(id: string) {
  const invoices: IQuotation[] = [];
  const dbInvoices = await db.invoices.findMany({
    where: {
      created_by_id: id,
    },
    include: {
      created_by: true,
    },
  });

  for (const invoice of dbInvoices) {
    invoices.push({
      amount: invoice.amount || 0,
      date: format(invoice.date, "dd-MM-yyyy"),
      id: invoice.id,
      number: invoice.quote_number,
      items: invoice.items,
      note: invoice.notes,
      details: {
        clientCompany: invoice.client_company,
        clientEmail: invoice.client_email,
        clientMobile: invoice.client_mobile,
        clientName: invoice.client_name,
        ownerCompany: invoice.created_by.company,
        ownerEmail: invoice.created_by.email,
        ownerMobile: invoice.created_by.mobile,
        ownerName: invoice.created_by.name,
      },
    });
  }

  return invoices;
}
