"use client";

import { Quotation } from "@/app/page";
import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { deleteEntity, updateEntityCount } from "@/services/database";
import { useSupabase } from "@/utils/supabase-provider";
import { useRouter } from "next/navigation";

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
        {quotations.length === 0 ? (
          <div className="w-full mt-6 text-center text-slate-500">
            No quotations to display. Start by clicking the{" "}
            <span className="text-slate-900 font-semibold">
              Create Quotation
            </span>{" "}
            button
          </div>
        ) : (
          <div className="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 w-64">
                    Quotation Number
                  </th>
                  <th scope="col" className="px-6 py-3 w-80">
                    To
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {quotations.map((quotation) => (
                  <tr
                    key={quotation.quote_number}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {quotation.quote_number}
                    </th>
                    <td className="px-6 py-4">{quotation.client_name}</td>
                    <td className="px-6 py-4">{quotation.date}</td>
                    <td className="px-6 py-4">{quotation.amount}₹</td>
                    <td className="px-6 py-4 space-x-2">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
        {invoices.length === 0 ? (
          <div className="w-full mt-6 text-center text-slate-500">
            No invoices to display. Start by clicking the{" "}
            <span className="text-slate-900 font-semibold">Create Invoice</span>{" "}
            button
          </div>
        ) : (
          <div className="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 w-64">
                    Invoice Number
                  </th>
                  <th scope="col" className="px-6 py-3 w-80">
                    To
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr
                    key={invoice.quote_number}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {invoice.quote_number}
                    </th>
                    <td className="px-6 py-4">{invoice.client_name}</td>
                    <td className="px-6 py-4">{invoice.date}</td>
                    <td className="px-6 py-4">{invoice.amount}₹</td>
                    <td className="px-6 py-4 space-x-2">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
