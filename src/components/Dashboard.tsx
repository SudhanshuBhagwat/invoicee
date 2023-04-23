"use client";

import { Quotation } from "@/app/page";
import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useRouter } from "next/navigation";
import { deleteDoc, doc } from "firebase/firestore";
import { database } from "@/utils/firebase";

interface Props {
  quotations: Quotation[],
  invoices: Quotation[]
}

export default function Dashboard({ quotations, invoices }: Props) {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  async function handleConfirmation() {
    const collection = id?.startsWith("Q") ? "quotation" : "invoice";
    await deleteDoc(doc(database, collection, id));
    router.replace("/")
  }

  return <div><div className="mt-6">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold">Quotations</h2>
      <Link href="/quotation/create" className="flex items-center bg-blue-600 rounded-md px-4 py-2 font-semibold text-white hover:bg-blue-500 space-x-2"><PlusIcon className="w-6 h-6" />Create Quotation</Link>
    </div>
    {
      quotations.length === 0 ? <div className="w-full mt-6 text-center text-slate-500">No quotations to display. Start by clicking the <span className="text-slate-900 font-semibold">Create Quotation</span> button</div> :
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
              {
                quotations.map(quotation => <tr key={quotation.number} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {quotation.number}
                  </th>
                  <td className="px-6 py-4">
                    {quotation.name}
                  </td>
                  <td className="px-6 py-4">
                    {quotation.date}
                  </td>
                  <td className="px-6 py-4">
                    {quotation.amount}₹
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <Link href={`/quotation/${quotation.number}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                    <button onClick={() => {
                      setId(quotation.number);
                      setShowModal(true);
                    }} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
                )
              }
            </tbody>
          </table>
        </div>
    }
  </div>

    <div className="mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Invoices</h2>
        <Link href="/invoice/create" className="flex items-center bg-blue-600 rounded-md px-4 py-2 font-semibold text-white hover:bg-blue-500 space-x-2"><PlusIcon className="w-6 h-6" />Create Invoice</Link>
      </div>
      {
        invoices.length === 0 ? <div className="w-full mt-6 text-center text-slate-500">No invoices to display. Start by clicking the <span className="text-slate-900 font-semibold">Create Invoice</span> button</div> :
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
                {
                  invoices.map(invoice => <tr key={invoice.number} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {invoice.number}
                    </th>
                    <td className="px-6 py-4">
                      {invoice.name}
                    </td>
                    <td className="px-6 py-4">
                      {invoice.date}
                    </td>
                    <td className="px-6 py-4">
                      {invoice.amount}₹
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <Link href={`/invoice/${invoice.number}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                      <button onClick={() => {
                        setId(invoice.number);
                        setShowModal(true);
                      }} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                    </td>
                  </tr>
                  )
                }
              </tbody>
            </table>
          </div>
      }
    </div>
    <Modal
      title="Delete"
      description="Do you really want to delete?"
      isOpen={showModal}
      setIsOpen={setShowModal}
      handleConfirmation={handleConfirmation}
    />
  </div>
}
