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
import { IQuotation } from "@/types/types";
import { PlusCircle } from "lucide-react";
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
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Invoices</h2>
          <Link
            href="/new-invoice"
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            Create Invoice
          </Link>
        </div>
        <div className="rounded-md border mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-64">Number</TableHead>
                <TableHead className="w-80">To</TableHead>
                <TableHead className="w-36">Date</TableHead>
                <TableHead className="w-36">Amount</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.length > 0 ? (
                invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell scope="row">{invoice.number}</TableCell>
                    <TableCell className="text-md">
                      {invoice.details.clientName} •
                      <span className="text-sm font-semibold ml-1">
                        {invoice.details.clientCompany}
                      </span>
                    </TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.amount}₹</TableCell>
                    <TableCell>
                      <div className="space-x-4">
                        <Link
                          href={`/invoice/${invoice.id}`}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => {
                            setId(invoice.id);
                            setShowModal(true);
                          }}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
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
