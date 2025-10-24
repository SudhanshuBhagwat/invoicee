import {
  Card,
  CardContent,
  CardHeader,
  CardSkeleton,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import getInvoiceOverview from "@/services/invoice/get-invoice-overview";
import { Metadata } from "next";
import { Suspense } from "react";
import CustomerCount from "./components/customer-count";
import InvoiceCount from "./components/invoice-count";
import { Overview, OverviewSkeleton } from "./components/overview";
import { RecentSales, RecentSalesSkeleton } from "./components/recent-sales";
import RevenueCard from "./components/revenue-card";
import UnpaidInvoiceAmount from "./components/unpaid-invoice-count";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default async function DashboardPage() {
  return (
    <>
      <div className="flex-col">
        <div className="space-y-4">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2"></div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              {/* <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger> */}
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Suspense fallback={<CardSkeleton />}>
                  <RevenueCard />
                </Suspense>
                <Suspense fallback={<CardSkeleton />}>
                  <InvoiceCount />
                </Suspense>
                <Suspense fallback={<CardSkeleton />}>
                  <CustomerCount />
                </Suspense>
                {/* <Suspense fallback={<CardSkeleton />}>
                  <UnpaidInvoiceAmount />
                </Suspense> */}
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Suspense fallback={<OverviewSkeleton />}>
                      <Overview overviewData={await getInvoiceOverview()} />
                    </Suspense>
                  </CardContent>
                </Card>
                <Suspense fallback={<RecentSalesSkeleton />}>
                  <RecentSales />
                </Suspense>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
