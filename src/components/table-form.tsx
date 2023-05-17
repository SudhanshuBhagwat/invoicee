"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import store, { Settings } from "@/store/store";
import React, { ChangeEvent, InputHTMLAttributes } from "react";
import { v4 } from "uuid";

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

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  handleChange: (value: string) => void;
}

function FormInput({ value, handleChange, ...rest }: FormInputProps) {
  return (
    <input
      {...rest}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        handleChange(e.target.value)
      }
    />
  );
}

export default function TableForm() {
  const {
    quotation,
    addItem,
    addCategory,
    updateItem,
    settings,
    updateSetting,
  } = store();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = Boolean(event.target.checked);

    updateSetting(event.target.id, value);
  }

  function renderNestedItems(items: Item, idx: number) {
    return items.category.map((category, index) => (
      <tr key={`${idx}-${items.id}-${index}`}>
        {index === 0 && (
          <td rowSpan={items.category.length + 1} className="border">
            <div className="flex flex-col">
              <FormInput
                placeholder="Exterior"
                value={items.name}
                size={1}
                className="p-2 w-full"
                handleChange={(value: string) =>
                  updateItem(items.id, "name", value)
                }
              />
              <FormInput
                placeholder="(Per Floor)"
                value={items.description}
                size={1}
                className="p-2 w-full text-sm"
                handleChange={(value: string) =>
                  updateItem(items.id, "description", value)
                }
              />
            </div>
          </td>
        )}
        <td className="border">
          <FormInput
            className="p-2 w-full"
            size={1}
            placeholder="Kitchen"
            value={category.value}
            handleChange={(value: string) =>
              updateItem(`${items.id}$${category.id}`, "category", value)
            }
          />
        </td>
        <td className="border">
          <FormInput
            type="number"
            className="p-2 w-full"
            placeholder="2500"
            value={items.amount[index].value}
            handleChange={(value: string) =>
              updateItem(
                `${items.id}$${items.amount[index].id}`,
                "amount",
                value
              )
            }
          />
        </td>
      </tr>
    ));
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-bold">Items</p>
        <div className="flex gap-4">
          <label className="flex gap-2">
            Show Total
            <input
              type="checkbox"
              id="showSum"
              name="Show Total"
              value={String(settings.showSum)}
              onChange={handleChange}
            />
          </label>
          <label className="flex gap-2">
            Show total for categories
            <input
              type="checkbox"
              id="showSumForCategory"
              name="Show total for categories"
              value={String(settings.showSumForCategory)}
              onChange={handleChange}
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
            </tr>
          </thead>
          <tbody>
            {quotation.items.map((d: Item, idx: number) => {
              return (
                <React.Fragment key={d.id}>
                  {renderNestedItems(d, idx)}
                  <tr key={`${idx}-ADD`}>
                    <td colSpan={2} className="border">
                      <button
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
              <td colSpan={3} className="border">
                <button
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
