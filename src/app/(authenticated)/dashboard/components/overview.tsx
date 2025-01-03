"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { getAmount } from "@/lib/utils";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function Overview({
  overviewData,
}: {
  overviewData: { month: string; total_amount: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={overviewData}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <YAxis
          stroke="#888888"
          fontSize={10}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => getAmount(value)}
        />
        <Bar
          dataKey="total_amount"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function OverviewSkeleton() {
  return (
    <div className="w-full h-[350px] px-4">
      <div className="flex space-x-4 h-full">
        {Array(12)
          .fill(null)
          .map(() => (
            <Skeleton className="h-full w-20" />
          ))}
      </div>
    </div>
  );
}
