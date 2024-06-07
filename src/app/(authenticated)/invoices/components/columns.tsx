"use client";

import { DataTableRowActions } from "@/components/data-table-row-actions";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { deleteInvoice } from "@/services/database";
import { IQuotation, Status } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IQuotation>[] = [
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
    accessorKey: "Number",
    cell: ({ row }) => {
      return <div className="w-[80px]">{row.original.number}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Status",
    cell: ({ row }) => {
      return <Badge variant="outline">{Status[row.original.status]}</Badge>;
    },
  },
  {
    accessorKey: "To",
    cell: ({ row }) => row.original.details.clientName,
  },
  {
    accessorKey: "Company",
    cell: ({ row }) => row.original.details.clientCompany,
  },
  {
    accessorKey: "Date",
    cell: ({ row }) => row.original.date,
  },
  {
    accessorKey: "Amount",
    cell: ({ row }) =>
      new Intl.NumberFormat("en-In", {
        style: "currency",
        currency: "INR",
      }).format(row.original.amount),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        deleteAction={() => deleteInvoice(row.original.id)}
        editAction={`/invoice/${row.original.id}`}
      />
    ),
  },
];