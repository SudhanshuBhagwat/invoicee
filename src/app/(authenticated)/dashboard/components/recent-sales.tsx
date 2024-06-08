import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentSales({
  invoicesForMonth,
}: {
  invoicesForMonth: {
    amount: number;
    customers: {
      id: string;
      first_name: string | null;
      last_name: string;
      email: string | null;
    } | null;
  }[];
}) {
  return (
    <div className="space-y-8">
      {invoicesForMonth &&
        invoicesForMonth.map((invoice) => (
          <div className="flex items-center" key={invoice.customers?.id}>
            <Avatar className="h-9 w-9">
              <AvatarFallback>
                {invoice.customers?.first_name?.substring(0, 1).toUpperCase()}
                {invoice.customers?.last_name?.substring(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {invoice.customers?.first_name} {invoice.customers?.last_name}
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
  );
}
