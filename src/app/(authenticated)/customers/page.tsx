import { DataTable } from "@/components/data-table";
import { Input } from "@/components/ui/input";
import { getCustomers } from "@/services/customers";
import { PlusCircle, Search } from "lucide-react";
import Link from "next/link";
import { columns } from "./components/columns";

export default async function Page() {
  const customers = await getCustomers();

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <div>
          <div className="text-3xl font-bold tracking-tight">Customers</div>
          <div className="text-sm text-muted-foreground">
            Manage your customers and view more insights about them.
          </div>
        </div>
        <div className="flex gap-2">
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
          <Link
            href="/new-customer"
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            Add Customer
          </Link>
        </div>
      </div>
      <div className="rounded-md border mt-6">
        <DataTable data={customers} columns={columns} />
      </div>
    </div>
  );
}
