"use client";

import React, { useRef, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { format } from "date-fns"
import { database } from "@/utils/firebase";
import { PencilIcon, XMarkIcon } from "@heroicons/react/20/solid"
import { v4 } from "uuid"
import store from "@/store/store";

import ComboBox, { OptionWithValue } from "./ComboBox";
import Pill from "./Pill";
import DetailsInput from "./DetailsInput";
import Spinner from "./Spinner";

export const QUOTATION_DATABASE = "quotation"

export type IAmount = {
  value: number;
  description: string;
}

export type IItem = {
  id: string,
  name: string,
  description: string,
  categories: OptionWithValue<Value>[],
  amount: number | IAmount
}

export type IDetails = {
  ownerName: string,
  ownerCompany: string,
  ownerMobile: string,
  ownerEmail: string,
  clientName: string,
  clientCompany: string,
  clientMobile: string,
  clientEmail: string
}

export type IQuotation = {
  id: string,
  details: IDetails,
  items: IItem[],
  date: string,
  services: OptionWithValue<Value>[],
  categories: OptionWithValue<Value>[],
  note: Array<string>
}

export default function QuotationForm() {
  const [isSaving, setIsSaving] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const quotation = store(state => state.quotation);
  const details = store(state => state.quotation.details);
  const items = store(state => state.quotation.items);
  const updateDetails = store(state => state.updateDetails);

  async function createQuotation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    try {
      await Promise.allSettled([
        await setDoc(doc(database, QUOTATION_DATABASE, quotation.id), {
          ...quotation
        }),
        new Promise((resolve) => setTimeout(resolve, 800))
      ])
      console.log(quotation);
    } catch (e) {
      setIsSaving(false)
      console.error("Something went wrong");
    }
    setIsSaving(false);
    formRef.current?.reset();
  }

  function handleChange(value: string, id: string) {
    updateDetails(id, value);
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Editor <span className="text-base font-normal text-gray-500">(Start typing to see the changes in effect)</span>
        </h2>
      </div>
      <div className="space-y-4 pb-6">
        <div className="text-right mb-8">
          <p className="text-lg font-bold">Quote No: <span className="font-medium">{quotation.id}</span></p>
          <p className="text-lg font-bold">Date: <span className="font-medium">{format(new Date(), "yyyy-MM-dd")}</span></p>
        </div>
        <form id="details" onSubmit={createQuotation} ref={formRef} className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <fieldset className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold mb-3">From:</h2>
              <DetailsInput label="Name" id="ownerName" onInputChange={handleChange} value={details.ownerName} />
              <DetailsInput label="Company Name" id="ownerCompany" onInputChange={handleChange} value={details.ownerCompany} />
              <DetailsInput label="Mobile No" id="ownerMobile" onInputChange={handleChange} value={details.ownerMobile} />
              <DetailsInput label="Email Address" id="ownerEmail" onInputChange={handleChange} value={details.ownerEmail} />
            </fieldset>
            <fieldset className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold mb-3">Quotation To:</h2>
              <DetailsInput label="Name" id="clientName" onInputChange={handleChange} value={details.clientName} />
              <DetailsInput label="Company Name" id="clientCompany" onInputChange={handleChange} value={details.clientCompany} />
              <DetailsInput label="Mobile No" id="clientMobile" onInputChange={handleChange} value={details.clientMobile} />
              <DetailsInput label="Email Address" id="clientEmail" onInputChange={handleChange} value={details.clientEmail} />
            </fieldset>
          </div>
        </form>
        <ServicesForm />
        <InvoiceItemForm items={items} />
        <button type="submit" form="details" className="px-4 py-2 mt-4 w-full bg-emerald-600 text-white font-bold rounded-md flex items-center justify-center text-center">{isSaving ? <Spinner /> : "Save Quotation"}</button>
      </div>
    </div>
  )
}

export type Value = {
  id: number;
  value: string;
  description?: string;
};

const CATEGORIES: Value[] = [
  {
    id: 1,
    value: "Interior",
    description: "(1 Rk, 1BHK, 2BHK, etc.)"
  },
  {
    id: 2,
    value: "Exterior",
    description: "(Ground floor, Ground + 1, Ground + 2, etc.)"
  },
  {
    id: 3,
    value: "Walkthrough",
  },
]

const SERVICES: Value[] = [
  { id: 1, value: '3D Elevation Modeling' },
  { id: 2, value: '3D Designing/Lighting/Rendering' },
  { id: 3, value: 'Post Processing' },
  { id: 4, value: '360° Panaromic View' },
];

function ServicesForm() {
  const services = store(state => state.quotation.services);
  const categories = store(state => state.quotation.categories);
  const addCategory = store(state => state.addCategory);
  const addService = store(state => state.addService);
  const removeCategory = store(state => state.removeCategory);
  const removeService = store(state => state.removeService);

  return <div className="grid grid-cols-2">
    <div>
      <h1 className="font-bold mb-4">Services:</h1>
      <ComboBox options={SERVICES} addOption={addService} placeholder="Select a service">
        <div className="flex gap-2 flex-wrap mt-6">
          {Array.from(services).map((service) => (
            <Pill
              key={service.value}
              item={service}
              onRemove={removeService}
            />
          ))}
        </div>
      </ComboBox>
    </div>
    <div>
      <h1 className="font-bold mb-4">Categories:</h1>
      <ComboBox options={CATEGORIES} addOption={addCategory} placeholder="Select a service">
        <div className="flex gap-2 flex-wrap mt-6">
          {Array.from(categories).map((category) => (
            <Pill
              key={category.value}
              item={category}
              onRemove={removeCategory}
            />
          ))}
        </div>
      </ComboBox>
    </div>
  </div>
}

interface Props {
  items: IItem[]
}

function InvoiceItemForm({ items }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const addItem = store(state => state.addItem);
  const [categories, setCategories] = useState<OptionWithValue<Value>[]>([]);

  function removeOption(category: Value) {
    const newOptions = Array.from(categories).filter(
      (option) => option.value !== category.value
    );
    setCategories(newOptions);
  }

  function addCategory(category: Value) {
    const found = categories.find((s: Value) => s.value === category.value);
    if (!found) {
      setCategories(categories => [...categories, category])
    }
  }

  async function addInvoiceItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { title, description, amount } = event?.currentTarget;

    const item: IItem = {
      id: v4(),
      // @ts-ignore
      name: title.value,
      description: description.value,
      amount: amount.value,
      categories
    }

    addItem(item);
    setCategories([]);
    formRef.current?.reset();
  }

  return (
    <div className="">
      <form ref={formRef} onSubmit={addInvoiceItem} className="space-y-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">Items:</h2>
          <button type="submit" className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-md flex items-center justify-center text-center">Add Item</button>
        </div>
        <label className="flex flex-col gap-2 text-lg">Title<input required id="title" name="title" placeholder="Enter a title" className="text-sm w-full border rounded-md px-4 py-2" /></label>
        <label className="flex flex-col gap-2">Description
          <textarea id="description" name="description" placeholder="Enter a description" className="border rounded-md px-4 py-2" />
        </label>
        <div>
          <h2 className="">Categories:</h2>
          <ComboBox options={CATEGORIES} addOption={addCategory} placeholder="Select a category">
            <div className="flex gap-2 flex-wrap mt-6">
              {Array.from(categories).map((option) => (
                <Pill
                  key={option.value}
                  item={option}
                  onRemove={removeOption}
                />
              ))}
            </div>
          </ComboBox>
        </div>
        <div className="flex space-x-4">
          <label className="flex flex-col gap-2">Price
            <input required id="amount" name="amount" placeholder="Amount" type="number" className="border rounded-md px-4 py-2" />
          </label>
        </div>
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
                        Item Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Categories
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pr-2 sm:pr-6 w-40"
                      >
                        <span className="">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {
                      items.map(item => (
                        <tr key={item.id}>
                          <td className="py-4 pl-4 pr-3 text-md font-medium text-gray-900 whitespace-nowrap flex flex-col sm:pl-6">
                            {item.name}
                            <span className="text-sm mt-2 text-gray-600">{item.description}</span>
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-800 whitespace-nowrap">
                            <ul className="list-disc">
                              {
                                item.categories.map(category => (
                                  <li key={category.value}>
                                    {category.value}
                                  </li>
                                ))
                              }
                            </ul>
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {typeof item.amount === "object" ? item.amount.value : `${item.amount}₹`}
                          </td>
                          <td className="text-center space-x-4 py-4 pl-3 pr-4 text-sm font-medium whitespace-nowrap sm:pr-6">
                            <button>
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button>
                              <XMarkIcon className="w-5 h-5" />
                            </button>
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
