"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import store from "@/store/store";
import React, { ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Item } from "@/types/types";
import { Checkbox } from "./ui/checkbox";

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
    updateSetting(event.target.id, Boolean(event.target.checked));
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
                  className="p-2 w-full border-none focus-visible:ring-0 shadow-none"
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
                  className="p-2 w-full text-sm border-none focus-visible:ring-0 shadow-none"
                  onChange={(e) =>
                    handleInputChange(items.id, "description", e.target.value)
                  }
                />
              </div>
            </td>
          )}
          <td className="border">
            <Input
              className="p-2 w-full border-none focus-visible:ring-0 shadow-none"
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
              className="p-2 w-full border-none focus-visible:ring-0 shadow-none"
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
      <fieldset
        name="ownerDetails"
        className="grid gap-6 rounded-lg border p-4"
      >
        <legend className="-ml-1 px-1 text-sm font-medium">Items</legend>
        <div className="flex gap-4">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
            Show Total
            <Checkbox
              id="showSum"
              checked={settings.showSum}
              onCheckedChange={(value) => {
                return updateSetting("showSum", Boolean(value));
              }}
            />
          </label>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
            Show total for categories
            <Checkbox
              id="showSumForCategory"
              checked={settings.showSumForCategory}
              onCheckedChange={(value) => {
                return updateSetting("showSumForCategory", Boolean(value));
              }}
            />
          </label>
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
              {quotation.items &&
                quotation.items.map((d: Item, idx: number) => {
                  return (
                    <React.Fragment key={d.id}>
                      {renderNestedItems(d, idx)}
                      <tr key={`${idx}-ADD`}>
                        <td colSpan={3} className="border">
                          <button
                            type="button"
                            onClick={() => addCategory(d.id)}
                            className="px-4 py-[6px] w-full text-center"
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
      </fieldset>
    </div>
  );
}
