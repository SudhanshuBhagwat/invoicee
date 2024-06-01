"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IQuotation, Status } from "@/types/types";
import { MoreHorizontal, PlusCircle, Search } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert";
import { AlertDialogContent } from "@radix-ui/react-alert-dialog";
import { deleteInvoice } from "@/services/database";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import Image from "next/image";
import { Input } from "@/components/ui/input";

interface Props {
  quotations?: IQuotation[];
  invoices: IQuotation[];
  userId: string;
}

export default function Dashboard({ invoices, userId }: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  //   async function handleConfirmation() {
  //     const split = id.split("  ");
  //     const entity: Entity = split[0] === "quotation" ? "quotation" : "invoice";
  //     const entityCount =
  //       entity === "quotation"
  //         ? quotations[0].quote_number
  //         : invoices[0].quote_number;

  //     await toast.promise(deleteEntity(entity, split[1], Number(entityCount), userId), {
  //       error: e => e.message,
  //       success: `${split[0]} deleted!!`,
  //       loading: `Deleting ${split[0]}...`,
  //     })
  //     .finally(() => setShowModal(false));
  //   }

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <div>
        <div className="flex flex-row justify-between">
          <div>
            <div className="text-3xl font-bold tracking-tight">Invoices</div>
            <div className="text-sm text-muted-foreground">
              Manage your products and view their sales performance.
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
              />
            </div>
            <Link
              href="/new-invoice"
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              Create Invoice
            </Link>
          </div>
        </div>
        <div className="rounded-md border mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.length > 0 ? (
                invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      {invoice.number}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{Status[invoice.status]}</Badge>
                    </TableCell>
                    <TableCell>{invoice.details.clientName}</TableCell>
                    <TableCell>{invoice.details.clientCompany}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {invoice.date}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {invoice.amount}₹
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Link
                              className="w-full"
                              href={`/invoice/${invoice.id}`}
                            >
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <button
                              className="w-full text-left"
                              onClick={() => {
                                setId(invoice.id);
                                setShowModal(true);
                              }}
                            >
                              Delete
                            </button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-12 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription>Do you really want to delete?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={async () => {
              await deleteInvoice(id);
              setShowModal(false);
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
      {/* <AlertDialog open={showModal} onOpenChange={setShowModal}> */}
      {/* <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent> */}
      {/* </AlertDialog> */}
    </Dialog>
  );
}
