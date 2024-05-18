"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
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
      {/* <div className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Quotations</h2>
          <Link
            href="/quotation"
            className="flex items-center bg-blue-600 rounded-md px-4 py-2 font-semibold text-white hover:bg-blue-500 space-x-2"
          >
            <PlusIcon className="w-6 h-6" />
            Create Quotation
          </Link>
        </div>
        <div className="rounded-md border mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-64">Quotation Number</TableHead>
                <TableHead className="w-80">To</TableHead>
                <TableHead className="w-36">Date</TableHead>
                <TableHead className="w-36">Amount</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotations.length > 0 ? (
                quotations.map((quotation) => (
                  <TableRow key={quotation.id}>
                    <TableCell>{quotation.number}</TableCell>
                    <TableCell>{quotation.details.clientName}</TableCell>
                    <TableCell>{quotation.date}</TableCell>
                    <TableCell>{quotation.amount}₹</TableCell>
                    <TableCell>
                      <div className="space-x-4">
                        <Link
                          href={`/quotation/${quotation.id}`}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => {
                            setId("quotation  " + quotation.id);
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
      </div> */}

      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Invoices</h2>
          <Link
            href="/new-invoice"
            className="flex items-center bg-blue-600 rounded-md px-4 py-2 font-semibold text-white hover:bg-blue-500 space-x-2"
          >
            <PlusIcon className="w-6 h-6" />
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
                    <TableCell>{invoice.details.clientName}</TableCell>
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
                            setId("invoice  " + invoice.id);
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
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
