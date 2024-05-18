"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import store from "@/store/store";
import React, { ChangeEvent, InputHTMLAttributes } from "react";
import { Input } from "./ui/input";

export interface SubItem {
  id: string;
  value: string;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  category: SubItem[];
  amount: SubItem[];
}

export default function TableForm() {
  const {
    quotation,
    addItem,
    addCategory,
    removeCategory,
    updateItem,
    settings,
    updateSetting,
  } = store();

  function handleSettingChange(event: ChangeEvent<HTMLInputElement>) {
    const value = Boolean(event.target.checked);

    updateSetting(event.target.id, value);
  }

  function handleInputChange(id: string, key: keyof Item, value: string) {
    updateItem(id, key, value);
  }

  function renderNestedItems(items: Item, idx: number) {
    return items.category.map((category, index) => {
      return (
        <tr key={`${idx}-${items.id}-${index}`}>
          {index === 0 && (
            <td rowSpan={items.category.length + 1} className="border">
              <div className="flex flex-col">
                <Input
                  placeholder="Exterior"
                  defaultValue={items.name}
                  size={1}
                  name={`item[${idx}][name]`}
                  className="p-2 w-full"
                  onChange={(e) =>
                    handleInputChange(items.id, "name", e.target.value)
                  }
                />
                <div className="h-[0.5px] bg-gray-200" />
                <Input
                  placeholder="(Per Floor)"
                  defaultValue={items.description}
                  size={1}
                  name={`item[${idx}][description]`}
                  className="p-2 w-full text-sm"
                  onChange={(e) =>
                    handleInputChange(items.id, "description", e.target.value)
                  }
                />
              </div>
            </td>
          )}
          <td className="border">
            <Input
              className="p-2 w-full"
              size={1}
              name={`item[${idx}]category[${index}][value]`}
              placeholder="Kitchen"
              defaultValue={category.value}
              onChange={(e) =>
                handleInputChange(
                  `${items.id}$${index}`,
                  "category",
                  e.target.value
                )
              }
            />
          </td>
          <td className="border">
            <Input
              type="number"
              name={`item[${idx}]amount[${index}][value]`}
              className="p-2 w-full"
              placeholder="2500"
              defaultValue={items.amount[index].value}
              onChange={(e) =>
                handleInputChange(
                  `${items.id}$${index}`,
                  "amount",
                  e.target.value
                )
              }
            />
          </td>
          <td className="border">
            <div className="flex justify-center">
              <button
                onClick={() => removeCategory(items.id, index)}
                className="text-red-400 text-sm"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-bold">Items</p>
        <div className="flex gap-4">
          <label className="flex gap-2 items-center">
            Show Total
            <input
              type="checkbox"
              id="showSum"
              className="rounded"
              checked={settings.showSum}
              onChange={handleSettingChange}
            />
          </label>
          <label className="flex gap-2 items-center">
            Show total for categories
            <input
              type="checkbox"
              id="showSumForCategory"
              name="Show total for categories"
              className="rounded"
              checked={settings.showSumForCategory}
              onChange={handleSettingChange}
            />
          </label>
        </div>
      </div>
      <div className="">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border w-40">Item Name</th>
              <th className="px-4 py-2 border w-40">Categories</th>
              <th className="px-4 py-2 border w-32">Amount</th>
              <th className="px-4 py-2 border w-16"></th>
            </tr>
          </thead>
          <tbody>
            {quotation.items.map((d: Item, idx: number) => {
              return (
                <React.Fragment key={d.id}>
                  {renderNestedItems(d, idx)}
                  <tr key={`${idx}-ADD`}>
                    <td colSpan={3} className="border">
                      <button
                        type="button"
                        onClick={() => addCategory(d.id)}
                        className="px-4 py-2 w-full text-center"
                      >
                        + Add Row
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
            <tr>
              <td colSpan={4} className="border">
                <button
                  type="button"
                  onClick={addItem}
                  className="px-4 py-2 w-full text-center"
                >
                  <span className="flex items-center justify-center">
                    <PlusIcon className="w-5 h-5 mr-1" /> Add Row
                  </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
