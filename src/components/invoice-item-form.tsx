"use client";

import store from "@/store/store";
import { IItem, Value } from "./Form";
import { useRef, useState } from "react";
import ComboBox, { OptionWithValue } from "./ui/ComboBox";
import Pill from "./ui/Pill";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { PencilIcon } from "lucide-react";
import { v4 } from "uuid";

interface Props {
  categories: Value[];
}

export default function InvoiceItemForm({ categories }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const items = store((store) => store.quotation.items);
  const addItem = store((state) => state.addItem);
  const removeItem = store((state) => state.removeItem);
  const updateItem = store((state) => state.updateItem);
  const [selectedCategories, setSelectedCategories] = useState<
    OptionWithValue<Value>[]
  >([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  function removeOption(category: Value) {
    const newOptions = Array.from(selectedCategories).filter(
      (option) => option.value !== category.value
    );
    setSelectedCategories(newOptions);
  }

  function addCategory(category: Value) {
    const found = selectedCategories.find(
      (s: Value) => s.value === category.value
    );
    if (!found) {
      setSelectedCategories((categories) => [...categories, category]);
    }
  }

  async function addInvoiceItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { title, description, amount } = event?.currentTarget;

    let item: IItem = {
      id: v4(),
      // @ts-ignore
      name: title.value,
      description: description.value,
      amount: amount.value,
      categories: selectedCategories,
    };

    if (editingId) {
      updateItem(item, editingId);
      setEditingId(null);
    } else {
      addItem(item);
    }
    setSelectedCategories([]);
    formRef.current?.reset();
  }

  function editItem(item: IItem) {
    if (formRef.current) {
      const elements = formRef.current.elements as HTMLFormControlsCollection;
      const title = elements.namedItem("title") as HTMLInputElement;
      const description = elements.namedItem("description") as HTMLInputElement;
      const price = elements.namedItem("amount") as HTMLInputElement;

      title.value = item.name;
      description.value = item.description;
      if (typeof item.amount === "object") {
        price.value = String(item.amount.value);
      } else {
        price.value = String(item.amount);
      }
      setSelectedCategories(item.categories);
      setEditingId(item.id);
      removeItem(item);
    }
  }

  return (
    <div className="">
      <form ref={formRef} onSubmit={addInvoiceItem} className="space-y-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">Items:</h2>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-md flex items-center justify-center text-center"
          >
            {editingId ? "Update Item" : "Add Item"}
          </button>
        </div>
        <label className="flex flex-col gap-2 text-lg">
          Title
          <input
            required
            id="title"
            name="title"
            placeholder="Enter a title"
            className="text-sm w-full border rounded-md px-4 py-2"
          />
        </label>
        <label className="flex flex-col gap-2">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Enter a description"
            className="border rounded-md px-4 py-2"
          />
        </label>
        <div>
          <h2 className="">Categories:</h2>
          <ComboBox
            options={categories}
            addOption={addCategory}
            placeholder="Select a category"
          >
            <div className="flex gap-2 flex-wrap mt-6">
              {Array.from(selectedCategories).map((option) => (
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
          <label className="flex flex-col gap-2">
            Price
            <input
              required
              id="amount"
              name="amount"
              placeholder="Amount"
              type="number"
              className="border rounded-md px-4 py-2"
            />
          </label>
        </div>
      </form>
      <div>
        {items.length > 0 && (
          <div className="flex flex-col mt-8">
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
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td className="py-4 pl-4 pr-3 text-md font-medium text-gray-900 whitespace-nowrap flex flex-col sm:pl-6">
                            {item.name}
                            <span className="text-sm mt-2 text-gray-600">
                              {item.description}
                            </span>
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-800 whitespace-nowrap">
                            <ul className="list-disc">
                              {item.categories.map((category) => (
                                <li key={category.value}>{category.value}</li>
                              ))}
                            </ul>
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {typeof item.amount === "object"
                              ? item.amount.value
                              : `${item.amount}₹`}
                          </td>
                          <td className="text-center space-x-4 py-4 pl-3 pr-4 text-sm font-medium whitespace-nowrap sm:pr-6">
                            <button onClick={() => editItem(item)}>
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button onClick={() => removeItem(item)}>
                              <XMarkIcon className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
