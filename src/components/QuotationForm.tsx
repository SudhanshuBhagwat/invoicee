"use client";

import { database } from "@/utils/firebase";
import { addDoc, collection } from "firebase/firestore";
import { format } from "date-fns"
import React from "react";

const QUOTATION_DATABASE = "quotation"

export default function QuotationForm() {
  async function createQuotation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.target;

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
      date: format(new Date(), "dd-MM-yyyy")
    });
  }

  return (
    <div className="space-y-4">
      <form onSubmit={createQuotation}>
        <fieldset className="flex flex-col gap-1">
          <label className="">Company Name:
            <input id="ownerName" name="ownerName" className="ml-2 border rounded-md px-4 py-2" />
          </label>
          <label className="">Address:
            <input id="ownerAddress" name="ownerAddress" className="ml-2 border rounded-md px-4 py-2" />
          </label>
          <label className="">Mobile No:
            <input id="ownerMobile" name="ownerMobile" className="ml-2 border rounded-md px-4 py-2" />
          </label>
          <label className="">Email Address:
            <input id="ownerEmail" name="ownerEmail" className="ml-2 border rounded-md px-4 py-2" />
          </label>
        </fieldset>
        <fieldset className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold mb-3">Quotation To:</h2>
          <label className="">Name:
            <input id="clientName" name="clientName" className="ml-2 border rounded-md px-4 py-2" />
          </label>
          <label className="">Address:
            <input id="clientAddress" name="clientAddress" className="ml-2 border rounded-md px-4 py-2" />
          </label>
          <label className="">Mobile No:
            <input id="clientMobile" name="clientMobile" className="ml-2 border rounded-md px-4 py-2" />
          </label>
          <label className="">Email Address:
            <input id="clientEmail" name="clientEmail" className="ml-2 border rounded-md px-4 py-2" />
          </label>
        </fieldset>
        <button type="submit" className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-md">Save Quotation</button>
      </form>
    </div>
  )
}
