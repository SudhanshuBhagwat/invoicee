import { DataTable } from "@/components/data-table";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getCustomers } from "@/services/customers";
import { ArrowUpRight, PlusCircle, Search } from "lucide-react";
import { columns } from "./components/columns";
import { CreateCustomer } from "./components/create-customer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const customers = await getCustomers();
  const isSheetOpen = searchParams["open"];

  return (
    <Sheet open={!!isSheetOpen}>
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
            href={"/customers?open=true"}
            className="cursor-pointer gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
          >
            <span className="flex gap-2 items-center">
              <PlusCircle className="h-3.5 w-3.5" />
              Add Customer
            </span>
          </Link>
        </div>
      </div>
      <div className="rounded-md border mt-6">
        <DataTable data={customers} columns={columns} />
      </div>
      <SheetContent className="min-w-[40rem]" showCloseButton={false}>
        <SheetHeader className="flex flex-row items-center justify-between">
          <div>
            <SheetTitle className="text-2xl font-bold tracking-tight">
              Create Customer
            </SheetTitle>
            <SheetDescription>
              Quick and easy way to create a customer on the fly.
            </SheetDescription>
          </div>
          <Link
            href={"/new-customer"}
            className="text-xs gap-1 h-8 px-2 border border-input hover:bg-accent hover:text-accent-foreground flex items-center justify-center rounded-md"
          >
            <ArrowUpRight className="h-4 w-4" />
            Full Page View
          </Link>
        </SheetHeader>
        <CreateCustomer />
        <SheetFooter className="mt-6">
          <Link
            href={"/customers"}
            className="h-9 py-2 px-4 border border-input hover:bg-accent hover:text-accent-foreground flex items-center justify-center rounded-md"
          >
            Cancel
          </Link>
          <Button
            type="submit"
            form="customer-form"
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            Save
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
