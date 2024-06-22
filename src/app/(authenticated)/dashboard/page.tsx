import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardSkeleton,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
import { Overview } from "./components/overview";
import { RecentSales } from "./components/recent-sales";
import RevenueCard from "./components/revenue-card";
import { Suspense } from "react";
import InvoiceCount from "./components/invoice-count";
import CustomerCount from "./components/customer-count";
import UnpaidInvoiceAmount from "./components/unpaid-invoice-count";
import getInvoicesForMonth from "@/services/invoice/get-invoices-for-month";
import getInvoiceOverview from "@/services/invoice/get-invoice-overview";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default async function DashboardPage() {
  // const invoicesForMonth = await getInvoicesForMonth();
  // const invoiceOverview = await getInvoiceOverview();

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="space-y-4">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2"></div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardSkeleton />}>
                  <RevenueCard />
                </Suspense>
                <Suspense fallback={<CardSkeleton />}>
                  <InvoiceCount />
                </Suspense>
                <Suspense fallback={<CardSkeleton />}>
                  <CustomerCount />
                </Suspense>
                <Suspense fallback={<CardSkeleton />}>
                  <UnpaidInvoiceAmount />
                </Suspense>
              </div>
              {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview overviewData={invoiceOverview} />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>
                      You made {invoicesForMonth?.length} sales this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales invoicesForMonth={invoicesForMonth!} />
                  </CardContent>
                </Card>
              </div> */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
