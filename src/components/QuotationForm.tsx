"use client";

import React, { useRef, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { format } from "date-fns"
import { database } from "@/utils/firebase";
import { ChevronDownIcon, PencilIcon } from "@heroicons/react/20/solid"
import { v4 } from "uuid"
import Spinner from "@/components/Spinner";

const QUOTATION_DATABASE = "quotation"

type IItem = {
  id: string,
  title: string,
  description: string,
  quantity: number,
  price: number
}

export default function QuotationForm() {
  const [isSaving, setIsSaving] = useState(false);
  const [items, setItems] = useState<Array<IItem>>([]);
  const formRef = useRef<HTMLFormElement>(null);

  async function createQuotation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.currentTarget;
    setIsSaving(true);

    try {
      await Promise.allSettled([
        await addDoc(collection(database, QUOTATION_DATABASE), {
          owner: {
            name: target.ownerName.value,
            address: target.ownerAddress.value,
            mobile: target.ownerMobile.value,
            email: target.ownerEmail.value
          },
          to: {
            name: target.clientName.value,
            address: target.clientAddress.value,
            mobile: target.clientMobile.value,
            email: target.clientEmail.value
          },
          date: format(new Date(), "dd-MM-yyyy"),
          items
        }),
        new Promise((resolve) => setTimeout(resolve, 800))
      ])
    } catch (e) {
      setIsSaving(false)
      console.error("Something went wrong");
    }
    setIsSaving(false);
    formRef.current?.reset();
  }

  return (
    <div className="space-y-4">
      <form id="details" onSubmit={createQuotation} ref={formRef} className="space-y-4">
        <div className="grid grid-cols-2 gap-6">
          <fieldset className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold mb-3">From:</h2>
            <div className="grid grid-cols-2 items-center">
              <label htmlFor="ownerName" className="">Company Name:</label>
              <input required id="ownerName" name="ownerName" className="ml-2 border rounded-md px-4 py-2" />
            </div>
            <div className="grid grid-cols-2 items-center">
              <label htmlFor="ownerAddress" className="">Address:</label>
              <input required id="ownerAddress" name="ownerAddress" className="ml-2 border rounded-md px-4 py-2" />
            </div>
            <div className="grid grid-cols-2 items-center">
              <label htmlFor="ownerMobile" className="">Mobile No:</label>
              <input required id="ownerMobile" name="ownerMobile" className="ml-2 border rounded-md px-4 py-2" />
            </div>
            <div className="grid grid-cols-2 items-center">
              <label htmlFor="ownerEmail" className="">Email Address:</label>
              <input required id="ownerEmail" name="ownerEmail" className="ml-2 border rounded-md px-4 py-2" />
            </div>
          </fieldset>
          <fieldset className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold mb-3">Quotation To:</h2>
            <div className="grid grid-cols-2 items-center">
              <label htmlFor="clientName" className="">Name:</label>
              <input required id="clientName" name="clientName" className="ml-2 border rounded-md px-4 py-2" />
            </div>
            <div className="grid grid-cols-2 items-center">
              <label htmlFor="clientAddress" className="">Address:</label>
              <input required id="clientAddress" name="clientAddress" className="ml-2 border rounded-md px-4 py-2" />
            </div>
            <div className="grid grid-cols-2 items-center">
              <label htmlFor="clientMobile" className="">Mobile No:</label>
              <input required id="clientMobile" name="clientMobile" className="ml-2 border rounded-md px-4 py-2" />
            </div>
            <div className="grid grid-cols-2 items-center">
              <label htmlFor="clientEmail" className="">Email Address:</label>
              <input required id="clientEmail" name="clientEmail" className="ml-2 border rounded-md px-4 py-2" />
            </div>
          </fieldset>
        </div>
      </form>
      <InvoiceItemForm items={items} setItems={setItems} />
      <button type="submit" form="details" className="px-4 py-2 mt-4 w-full bg-emerald-600 text-white font-bold rounded-md flex items-center justify-center text-center">{isSaving ? <Spinner /> : "Save Quotation"}</button>
    </div>
  )
}

interface Props {
  items: IItem[];
  setItems: (items: IItem[]) => void;
}

function InvoiceItemForm({ items, setItems }: Props) {
  async function addInvoiceItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { title, description, quantity, price } = event?.currentTarget;

    const item = {
      id: v4(),
      // @ts-ignore
      title: title.value,
      description: description.value,
      quantity: quantity.value,
      price: price.value
    }

    setItems(currItems => {
      return [
        ...currItems,
        item
      ]
    });
  }

  return (
    <div className="">
      <form onSubmit={addInvoiceItem} className="space-y-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">Items:</h2>
          <button type="submit" className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-md flex items-center justify-center text-center">Add Item</button>
        </div>
        <label className="flex flex-col gap-2 text-lg">Title<input required id="title" name="title" placeholder="Enter a title" className="text-sm w-full border rounded-md px-4 py-2" /></label>
        <div className="mt-4 flex space-x-4">
          <label className="flex flex-col gap-2">Quantity
            <input required id="quantity" name="quantity" type="number" placeholder="Quantity" className="border rounded-md px-4 py-2" />
          </label>
          <label className="flex flex-col gap-2">Price
            <input required id="price" name="price" placeholder="Price" type="number" className="border rounded-md px-4 py-2" />
          </label>
        </div>
        <label className="flex flex-col gap-2">Description
          <textarea id="description" name="description" placeholder="Enter a description" className="border rounded-md px-4 py-2" />
        </label>
      </form>
      <div>
        {items.length > 0 && <div className="flex flex-col mt-8">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        <a href="/" className="inline-flex group">
                          Item Description
                          <span className="flex-none invisible ml-2 text-gray-400 rounded group-hover:visible group-focus:visible">
                            <ChevronDownIcon
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </span>
                        </a>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        <a href="/" className="inline-flex group">
                          Quantity
                          <span className="flex-none ml-2 text-gray-900 bg-gray-200 rounded group-hover:bg-gray-300">
                            <ChevronDownIcon
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </span>
                        </a>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        <a href="/" className="inline-flex group">
                          Price
                          <span className="flex-none invisible ml-2 text-gray-400 rounded group-hover:visible group-focus:visible">
                            <ChevronDownIcon
                              className="flex-none invisible w-5 h-5 ml-2 text-gray-400 rounded group-hover:visible group-focus:visible"
                              aria-hidden="true"
                            />
                          </span>
                        </a>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        <a href="/" className="inline-flex group">
                          Amount
                          <span className="flex-none invisible ml-2 text-gray-400 rounded group-hover:visible group-focus:visible">
                            <ChevronDownIcon
                              className="flex-none invisible w-5 h-5 ml-2 text-gray-400 rounded group-hover:visible group-focus:visible"
                              aria-hidden="true"
                            />
                          </span>
                        </a>
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pr-2 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {
                      items.map(item => (
                        <tr key={item.id}>
                          <td className="py-4 pl-4 pr-3 text-md font-medium text-gray-900 whitespace-nowrap flex flex-col sm:pl-6">
                            {item.title}
                            <span className="text-sm mt-2 text-gray-600">{item.description}</span>
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {item.quantity}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {item.price}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {`${item.price * item.quantity}`}
                          </td>
                          <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
                            <PencilIcon className="w-5 h-5" />
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  )
}
