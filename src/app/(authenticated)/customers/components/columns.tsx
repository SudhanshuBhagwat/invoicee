"use client";

import { DataTableRowActions } from "@/components/data-table-row-actions";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Customer, Status } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<Customer>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Name",
    cell: ({ row }) => {
      return (
        <div className="font-medium flex flex-col items-start">
          {row.original.first_name} {row.original.last_name}
          <span className="font-normal text-sm">{row.original.company}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Invoices",
    cell: ({ row }) => 123,
  },
  {
    accessorKey: "Status",
    cell: ({ row }) => {
      return <Badge variant="outline">{Status[1]}</Badge>;
    },
  },
  {
    accessorKey: "Total Amount",
    cell: ({ row }) =>
      new Intl.NumberFormat("en-In", {
        style: "currency",
        currency: "INR",
      }).format(10000),
  },
  {
    accessorKey: "Amount Due",
    cell: ({ row }) =>
      new Intl.NumberFormat("en-In", {
        style: "currency",
        currency: "INR",
      }).format(2000),
  },
  {
    accessorKey: "Due Date",
    cell: ({ row }) => {
      format(new Date(), "yyyy-MM-dd");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions id={row.original.id} />,
  },
];
