import { getInvoices } from "@/services/database";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";

export default async function Page() {
  const invoices = await getInvoices();

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <div>
          <div className="text-3xl font-bold tracking-tight">Invoices</div>
          <div className="text-sm text-muted-foreground">
            Manage your products and view their sales performance.
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href="/new-invoice"
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            Create Invoice
          </Link>
        </div>
      </div>
      <div className="mt-6">
        <DataTable columns={columns} data={invoices} />
      </div>
    </div>
  );
}
