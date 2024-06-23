import CreateCustomerSheet from "@/components/create-customer-sheet";
import { DataTable } from "@/components/data-table";
import { getCustomers } from "@/services/customers";
import { columns } from "./components/columns";
import CreateCustomerButton from "./components/create-customer-button";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const customers = await getCustomers();
  const isSheetOpen = searchParams["open"];

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div>
          <div className="text-3xl font-bold tracking-tight">Customers</div>
          <div className="text-sm text-muted-foreground">
            Manage your customers and view more insights about them.
          </div>
        </div>
        <div className="flex gap-2">
          <CreateCustomerButton />
        </div>
      </div>
      <div className="rounded-md border mt-6">
        <DataTable data={customers} columns={columns} />
      </div>
      <CreateCustomerSheet isOpen={!!isSheetOpen} />
    </>
  );
}
