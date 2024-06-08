"use client";

import store from "@/store/store";
import { calculateTotalAmount } from "@/utils/utils";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Item, UserData } from "@/types/types";
import { Button } from "./ui/button";
import { PrinterIcon } from "lucide-react";

interface Props {
  isSaved?: boolean;
  user: UserData;
}

export default function Preview({ isSaved = false, user }: Props) {
  const componentRef = useRef<HTMLDivElement>(null);
  const quotation = store((state) => state.quotation);
  const settings = store((state) => state.settings);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const totalAmount: number = calculateTotalAmount(quotation);
  const contentState = convertFromRaw(quotation.notes);
  const editorState = EditorState.createWithContent(contentState);

  return (
    <div className="h-full w-full px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Preview</h2>
        {isSaved && (
          <Button size="sm" onClick={handlePrint}>
            <PrinterIcon className="w-4 h-4 mr-2" />
            Print
          </Button>
        )}
      </div>
      <div
        ref={componentRef}
        className="w-full bg-white overflow-auto px-10 pb-6 pt-10 rounded shadow-md"
      >
        <div className="text-right">
          <p className="font-bold">
            No: <span className="font-normal">{quotation.number}</span>
          </p>
          <p className="font-bold">
            Date: <span className="font-normal">{quotation.date}</span>
          </p>
        </div>
        <div className="flex justify-between mt-10">
          <div className="space-y-1">
            <h2 className="text-lg font-bold">Company:</h2>
            <p>{user.name}</p>
            <p>{user.company}</p>
            <p>{user.mobile}</p>
            <p>{user.email}</p>
          </div>
          <div className="space-y-1 text-right">
            <h2 className="text-lg font-bold">Customer:</h2>
            <p>
              {quotation.customer?.first_name} {quotation.customer?.last_name}
            </p>
            <p>{quotation.customer?.company}</p>
            <p>{quotation.customer?.mobile}</p>
            <p>{quotation.customer?.email}</p>
          </div>
        </div>
        <div className="overflow-x-auto mt-6 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Items
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-40"
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {quotation.items &&
                    quotation.items.map((item: Item, idx: number) => {
                      const totalSum = item.amount
                        .map((amt) => Number(amt.value))
                        .reduce((acc, amt) => acc + amt, 0);

                      return item.category.map((category, index) => (
                        <tr key={`${item.id}-${category.id}-${index}`}>
                          {index === 0 && (
                            <td
                              className="text-lg p-3 pl-4 pr-3 border-r border-gray-200 font-medium text-gray-900 whitespace-nowrap sm:pl-6"
                              rowSpan={item.category.length}
                            >
                              <div className="flex flex-col space-y-2">
                                <span>{item.name}</span>
                                {item.description && (
                                  <span className="text-sm text-gray-400">
                                    {item.description}
                                  </span>
                                )}
                              </div>
                            </td>
                          )}
                          <td className="p-2 text-sm text-gray-800 whitespace-nowrap border-r border-gray-200">
                            {category.value}
                          </td>
                          {settings.showSumForCategory ? (
                            index === 0 ? (
                              <td
                                rowSpan={item.amount.length}
                                className="p-2 text-sm text-gray-800 whitespace-nowrap"
                              >
                                {new Intl.NumberFormat("en-IN", {
                                  maximumFractionDigits: 2,
                                  style: "currency",
                                  currency: "INR",
                                }).format(totalSum)}
                              </td>
                            ) : null
                          ) : (
                            <td className="p-2 text-sm text-gray-800 whitespace-nowrap">
                              {new Intl.NumberFormat("en-IN", {
                                maximumFractionDigits: 2,
                                style: "currency",
                                currency: "INR",
                              }).format(
                                Number(
                                  quotation?.items![idx].amount[index].value
                                )
                              )}
                            </td>
                          )}
                        </tr>
                      ));
                    })}
                  {settings.showSum && (
                    <tr>
                      <td className="py-3 pl-4 pr-3 text-md font-medium text-gray-900 whitespace-nowrap flex flex-col sm:pl-6"></td>
                      <td className="p-3 text-md font-bold text-gray-800 whitespace-nowrap">
                        Total:
                      </td>
                      <td className="p-3 text-md font-bold text-gray-800 whitespace-nowrap">
                        {new Intl.NumberFormat("en-IN", {
                          maximumFractionDigits: 2,
                          style: "currency",
                          currency: "INR",
                        }).format(Number(totalAmount))}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <h2 className="font-bold">Note:</h2>
          <Editor
            editorKey="editor"
            editorState={editorState}
            readOnly={true}
            onChange={() => {}}
          />
          {/* <ul className="list-disc ml-4">
            <li className="">
              All of the above are going to be provided in the following 2
              resolutions:
              <ul className="list-square ml-4">
                <li>2560 x 1440 resolution.</li>
              </ul>
            </li>
            <li className="">
              The completion time for walkthrough is <strong>8 to 10</strong>{" "}
              working days.
            </li>
            <li className="">
              The completion time for 3D Rendering is <strong>2 to 3</strong>{" "}
              working days (Interior/Exterior).
            </li>
            <li className="">
              Please note that <strong>30% advance</strong> payment is required.
            </li>
            <li className="">
              Thank you for considering our services. If you have any questions
              or concerns, please feel free to contact us.
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  );
}
