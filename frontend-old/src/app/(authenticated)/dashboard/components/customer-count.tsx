import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getTotalCustomers from "@/services/customers/get-total-customers";
import { User } from "lucide-react";

export default async function CustomerCount() {
  const totalCustomers = await getTotalCustomers();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Customers</CardTitle>
        <User className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalCustomers}</div>
        {/* <p className="text-xs text-muted-foreground">+19% from last month</p> */}
      </CardContent>
    </Card>
  );
}
