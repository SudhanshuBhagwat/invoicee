"use client";

import store from "@/store/store";
import { calculateTotalAmount } from "@/utils/utils";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Item } from "@/types/types";
import { Button } from "./ui/button";
import { PrinterIcon } from "lucide-react";
import { useUser } from "@/lib/provider";
import { getAmount } from "@/lib/utils";

interface Props {
  isSaved?: boolean;
}

export default function Preview({ isSaved = false }: Props) {
  const componentRef = useRef<HTMLDivElement>(null);
  const user = useUser();
  const quotation = store((state) => state.quotation);
  const settings = store((state) => state.settings);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const subTotalAmount: number = calculateTotalAmount(quotation);
  const contentState = convertFromRaw(quotation.notes);
  const editorState = EditorState.createWithContent(contentState);
  const taxableAmount =
    (subTotalAmount * Number(quotation.taxPercent || 0)) / 100;
  const discountAmount =
    (subTotalAmount * Number(quotation.discountPercent || 0)) / 100;

  const totalAmount = subTotalAmount + taxableAmount - discountAmount;

  return (
    <div className="h-full w-full lg:px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Preview</h2>
        {isSaved && (
          <Button size="sm" onClick={handlePrint}>
            <PrinterIcon className="w-4 h-4 mr-2" />
            Print
          </Button>
        )}
      </div>
      <div className="">
        <div
          ref={componentRef}
          className="bg-white overflow-auto p-8 pb-6 rounded shadow-md print:w-[210mm] print:h-[297mm] mx-auto print:shadow-none"
        >
          <p className="text-2xl font-bold tracking-wide mb-6">INVOICE</p>
          <div className="text-right">
            <p className="font-bold">
              No:{" "}
              <span className="font-normal">
                {String(quotation.number).padStart(5, "0")}
              </span>
            </p>
            <p className="font-bold">
              Due Date: <span className="font-normal">{quotation.date}</span>
            </p>
          </div>
          <div className="flex justify-between mt-10">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-400">Company:</h2>
              <p className="font-bold">{user?.company}</p>
              <p>{user?.name}</p>
              <p>{user?.email}</p>
              {user?.mobile && <p>Phone: {user?.mobile}</p>}
            </div>
            <div className="space-y-1 text-right">
              <h2 className="text-lg font-semibold text-gray-400">Customer:</h2>
              <p className="font-bold">{quotation.customer?.company}</p>
              <p>
                {quotation.customer?.first_name} {quotation.customer?.last_name}
              </p>
              <p>{quotation.customer?.email}</p>
              {quotation?.customer?.mobile && (
                <p>Phone: {quotation.customer?.mobile}</p>
              )}
            </div>
          </div>
          <div className="overflow-x-auto mt-6 w-full">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="overflow-hidden ring-1 ring-black ring-opacity-5">
                <table className="min-w-full divide-y divide-primary border border-primary">
                  <thead className="bg-primary">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary-foreground sm:pl-6"
                      >
                        Items
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-primary-foreground"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-primary-foreground w-40"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-primary">
                    {quotation.items &&
                      quotation.items.map((item: Item, idx: number) => {
                        const totalSum = item.amount
                          .map((amt) => Number(amt.value))
                          .reduce((acc, amt) => acc + amt, 0);
                        return item.category.map((category, index) => (
                          <tr key={`${item.id}-${category.id}-${index}`}>
                            {index === 0 && (
                              <td
                                className="text-lg p-1 pl-4 pr-3 border-r border-primary font-medium text-gray-900 whitespace-nowrap sm:pl-6"
                                rowSpan={item.category.length}
                              >
                                <div className="flex flex-col space-y-1">
                                  <span>{item.name}</span>
                                  {item.description && (
                                    <span className="text-sm text-gray-400">
                                      {item.description}
                                    </span>
                                  )}
                                </div>
                              </td>
                            )}
                            <td className="p-2 text-sm text-gray-800 whitespace-nowrap border-r border-primary">
                              {category.value}
                            </td>
                            {settings.showSumForCategory ? (
                              index === 0 ? (
                                <td
                                  rowSpan={item.amount.length}
                                  className="p-2 text-sm text-gray-800 whitespace-nowrap"
                                >
                                  {getAmount(totalSum)}
                                </td>
                              ) : null
                            ) : (
                              <td className="p-2 text-sm text-gray-800 whitespace-nowrap">
                                {getAmount(
                                  Number(
                                    quotation?.items![idx].amount[index].value
                                  )
                                )}
                              </td>
                            )}
                          </tr>
                        ));
                      })}
                    <tr>
                      <td className="py-3 pl-4 pr-3 text-md font-medium text-gray-900 whitespace-nowrap flex flex-col sm:pl-6"></td>
                      <td className="p-3 text-md font-bold text-gray-800 whitespace-nowrap">
                        Sub total:
                      </td>
                      <td className="p-3 text-md font-bold text-gray-800 whitespace-nowrap">
                        {getAmount(Number(subTotalAmount))}
                      </td>
                    </tr>
                    {quotation.taxPercent ? (
                      <tr>
                        <td className="py-3 pl-4 pr-3 text-md font-medium text-gray-900 whitespace-nowrap flex flex-col sm:pl-6"></td>
                        <td className="p-3 text-md font-bold text-gray-800 whitespace-nowrap">
                          Tax {quotation.taxPercent}%:
                        </td>
                        <td className="p-3 text-md font-bold text-gray-800 whitespace-nowrap">
                          {getAmount(Number(taxableAmount))}
                        </td>
                      </tr>
                    ) : (
                      <></>
                    )}
                    {quotation.discountPercent ? (
                      <tr>
                        <td className="py-3 pl-4 pr-3 text-md font-medium text-gray-900 whitespace-nowrap flex flex-col sm:pl-6"></td>
                        <td className="p-3 text-md font-bold text-gray-800 whitespace-nowrap">
                          Discount {quotation.discountPercent}%:
                        </td>
                        <td className="p-3 text-md font-bold text-gray-800 whitespace-nowrap">
                          {getAmount(Number(discountAmount))}
                        </td>
                      </tr>
                    ) : (
                      <></>
                    )}
                    {settings.showSum && (
                      <tr>
                        <td className="py-3 pl-4 pr-3 text-md font-medium text-gray-900 whitespace-nowrap flex flex-col sm:pl-6"></td>
                        <td className="p-3 text-md font-bold text-gray-800 whitespace-nowrap">
                          Total:
                        </td>
                        <td className="p-3 text-md font-bold text-gray-800 whitespace-nowrap">
                          {getAmount(Number(totalAmount))}
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
          </div>
        </div>
      </div>
    </div>
  );
}
