"use client";

import store from '@/store/store';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export default function Preview() {
  const componentRef = useRef<HTMLDivElement>(null);
  const quotation = store(state => state.quotation);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const totalAmount: number = quotation.items
    .map(item => {
      if (typeof item.amount === "object") {
        return Number(item.amount.value)
      }
      return Number(item.amount);
    })
    .reduce((acc, item) => {
      return acc + item;
    }, 0);

  return <div className="h-full bg-slate-100 p-4">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">
        Preview
      </h2>
      <button onClick={handlePrint} className="px-6 py-2 font-bold bg-emerald-600 text-white rounded-md">Print</button>
    </div>
    <div ref={componentRef} className="w-full bg-white overflow-auto px-10 pb-6 pt-10">
      <div className="text-right">
        <p className="font-bold">Quote No: <span className="font-normal">{quotation.id}</span></p>
        <p className="font-bold">Date: <span className="font-normal">{quotation.date}</span></p>
      </div>
      <div className="flex justify-between mt-10">
        <div className="space-y-1">
          <h2 className="text-lg font-bold">Company:</h2>
          <p>{quotation.details.ownerName}</p>
          <p>{quotation.details.ownerCompany}</p>
          <p>{quotation.details.ownerMobile}</p>
          <p>{quotation.details.ownerEmail}</p>
        </div>
        <div className="space-y-1 text-right">
          <h2 className="text-lg font-bold">Customer:</h2>
          <p>{quotation.details.clientName}</p>
          <p>{quotation.details.clientCompany}</p>
          <p>{quotation.details.clientMobile}</p>
          <p>{quotation.details.clientEmail}</p>
        </div>
      </div>
      <div className="mt-6 flex gap-10">
        <div>
          <h2 className="text-lg font-bold">Services:</h2>
          <ul className="ml-4 list-disc">
            {
              quotation.services.map(service => (
                <li key={service.value}>{service.value}</li>
              ))
            }
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold">Categories:</h2>
          <ul className="ml-4 list-disc">
            {
              quotation.categories.map(category => (
                <li>{category.value} <span className="text-slate-600">{category.description}</span></li>
              ))
            }
          </ul>
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
                    Item Description
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
                {
                  quotation.items.map((item, idx) => (
                    <tr key={idx}>
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
                    </tr>
                  ))
                }
                <tr>
                  <td className="py-4 pl-4 pr-3 text-md font-medium text-gray-900 whitespace-nowrap flex flex-col sm:pl-6">
                  </td>
                  <td className="px-3 py-4 text-md font-bold text-gray-800 whitespace-nowrap">
                    Total:
                  </td>
                  <td className="px-3 py-4 text-md font-bold text-gray-800 whitespace-nowrap">
                    {totalAmount}₹
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-2">
        <h2 className="font-bold">Note:</h2>
        <ul className="list-disc ml-4">
          <li className="">
            All of the above are going to be provided in the following 2 resolutions:
            <ul className="list-square ml-4">
              <li>
                2560 x 1440 resolution.
              </li>
            </ul>
          </li>
          <li className="">
            The completion time for walkthrough is <strong>8 to 10</strong> working days.
          </li>
          <li className="">
            The completion time for 3D Rendering is <strong>2 to 3</strong> working days (Interior/Exterior).
          </li>
          <li className="">
            Please note that <strong>30% advance</strong> payment is required.
          </li>
          <li className="">
            Thank you for considering our services. If you have any questions or concerns, please feel free to contact us.
          </li>
        </ul>
      </div>
    </div>
  </div>
}
