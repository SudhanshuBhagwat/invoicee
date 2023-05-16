"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import store from "@/store/store";
import { ChangeEvent, InputHTMLAttributes } from "react";
import { v4 } from "uuid";

export interface SubItem {
  id: string;
  value: string;
}

export interface Item {
  id: string;
  name: string;
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
  const { quotation, addItem, addCategory, updateItem } = store();

  function renderNestedItems(items: Item) {
    return items.category.map((category, index) => (
      <tr key={`${v4()}`}>
        {index === 0 && (
          <td rowSpan={items.category.length + 1} className="border">
            <FormInput
              placeholder="Exterior"
              value={items.name}
              size={1}
              className="p-2 w-full"
              handleChange={(value: string) =>
                updateItem(items.id, "name", value)
              }
            />
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
      <p className="text-xl font-bold mb-4">Items</p>
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
            {quotation.items.map((d: Item) => {
              return (
                <>
                  {renderNestedItems(d)}
                  <tr key={`${v4()}-ADD`}>
                    <td colSpan={2} className="border">
                      <button
                        onClick={() => addCategory(d.id)}
                        className="px-4 py-2 w-full text-center"
                      >
                        + Add Row
                      </button>
                    </td>
                  </tr>
                </>
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
