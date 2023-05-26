"use client";

import { Quotation } from "@/app/(app)/page";
import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { deleteEntity, updateEntityCount } from "@/services/database";
import { useSupabase } from "@/utils/supabase-provider";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

interface Props {
  quotations: Quotation[];
  invoices: Quotation[];
  userId: string;
}

export default function Dashboard({ quotations, invoices, userId }: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const { supabase } = useSupabase();
  const router = useRouter();

  async function handleConfirmation() {
    const split = id.split("  ");
    const entityCount =
      split[0] === "quotation"
        ? quotations[0].quote_number
        : invoices[0].quote_number;

    try {
      await Promise.allSettled([
        await deleteEntity(supabase, split[0], split[1]),
        await updateEntityCount(
          supabase,
          split[0] === "quotation" ? "quotation" : "invoice",
          Number(entityCount) - 1,
          userId
        ),
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]);
    } catch (error) {
      console.error("Something went wrong");
    }

    router.push("/");
  }

  return (
    <div>
      <div className="mt-6">
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
                    <TableCell>{quotation.quote_number}</TableCell>
                    <TableCell>{quotation.client_name}</TableCell>
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
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Invoices</h2>
          <Link
            href="/invoice"
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
                <TableHead className="w-64">Invoice Number</TableHead>
                <TableHead className="w-80">To</TableHead>
                <TableHead className="w-36">Date</TableHead>
                <TableHead className="w-36">Amount</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.length > 0 ? (
                invoices.map((invoice) => (
                  <TableRow key={invoice.quote_number}>
                    <TableCell scope="row">{invoice.quote_number}</TableCell>
                    <TableCell>{invoice.client_name}</TableCell>
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
      <Modal
        title="Delete"
        description="Do you really want to delete?"
        isOpen={showModal}
        setIsOpen={setShowModal}
        handleConfirmation={handleConfirmation}
      />
    </div>
  );
}
