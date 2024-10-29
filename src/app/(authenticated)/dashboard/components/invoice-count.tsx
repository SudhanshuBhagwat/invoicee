import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getTotalInvoices from "@/services/invoice/get-total-invoices";
import { File } from "lucide-react";

export default async function InvoiceCount() {
  const totalInvoices = await getTotalInvoices();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
        <File className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalInvoices}</div>
        <p className="text-xs text-muted-foreground">+180.1% from last month</p>
      </CardContent>
    </Card>
  );
}
