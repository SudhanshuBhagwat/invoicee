import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import getInvoicesForMonth from "@/services/invoice/get-invoices-for-month";

export async function RecentSales() {
  const invoicesForMonth = await getInvoicesForMonth();

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>
          You made {invoicesForMonth?.length} sales this month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {invoicesForMonth &&
            invoicesForMonth.map((invoice) => (
              <div className="flex items-center" key={invoice.customers?.id}>
                <Avatar className="h-9 w-9">
                  <AvatarFallback>
                    {invoice.customers?.first_name
                      ?.substring(0, 1)
                      .toUpperCase()}
                    {invoice.customers?.last_name
                      ?.substring(0, 1)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {invoice.customers?.first_name}{" "}
                    {invoice.customers?.last_name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {invoice.customers?.email}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  +
                  {new Intl.NumberFormat("en-In", {
                    style: "currency",
                    currency: "INR",
                  }).format(Number(invoice.amount))}
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
