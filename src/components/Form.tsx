"use client";

import store from "@/store/store";
import { ReactNode, useEffect, useRef, useState } from "react";

import Spinner from "@/components/ui/Spinner";
import DetailsInput from "./DetailsInput";
import TableForm, { Item } from "./table-form";
import { Label } from "./ui/label";
import { handleSubmit } from "@/lib/actions";
import { format, formatISO, parseISO } from "date-fns";
import { UserData } from "@/types/types";
import { Entity, createInvoice } from "@/services/database";
import { createBrowserClient } from "@/utils/supabase/client";
import { Json } from "@/types/supabase";
import { calculateTotalAmount } from "@/utils/utils";
import { useFormState } from "react-dom";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const QUOTATION_DATABASE = "quotation";

export type IAmount = {
  value: number;
  description: string;
};

export type IDetails = {
  ownerName: string;
  ownerCompany: string;
  ownerMobile: string;
  ownerEmail: string;
  clientName: string;
  clientCompany: string;
  clientMobile: string;
  clientEmail: string;
};

export type Value = {
  id: number;
  value: string;
  description?: string;
};

export type IQuotation = {
  id: string;
  details: IDetails;
  items: Item[];
  date: string;
  notes: any;
  amount: number;
  number: string;
};

interface FormProps {
  type: Entity;
  initial: IQuotation | string;
  children?: ReactNode;
  user: UserData;
}

const entity = [{ name: "Quotation" }, { name: "Invoice" }] as const;

export default function Form({ initial, user, children }: FormProps) {
  const [_, action, isPending] = useFormState(createInvoice, null);

  useEffect(() => {
    setState(initial);
  }, []);

  const setState = store((state) => state.setState);
  const quotation = store((state) => state.quotation);
  const details = store((state) => state.quotation.details);
  const updateField = store((state) => state.updateField);
  const updateNumber = store((state) => state.updateNumber);
  const updateDate = store((state) => state.updateDate);

  function handleFieldChange(value: string, id: string) {
    updateField(id, value);
  }

  async function createInvoice() {
    console.log("Svaing", quotation);
    const supabase = await createBrowserClient();
    const totalAmount = calculateTotalAmount(quotation);

    let finalQuote = {
      amount: Number(totalAmount),
      created_at: quotation.date,
      client_company: quotation.details.clientCompany,
      client_email: quotation.details.clientEmail,
      client_mobile: quotation.details.clientMobile,
      client_name: quotation.details.clientName,
      date: quotation.date,
      items: JSON.stringify(quotation.items),
      notes: JSON.stringify(quotation.notes),
      quote_number: Number(quotation.number),
      created_by_id: user?.id,
    };

    let result;

    if (quotation.id) {
      result = await supabase
        .from("invoices")
        .update(finalQuote)
        .eq("id", quotation.id);
    } else {
      result = await supabase.from("invoices").insert(finalQuote);
    }

    if (!result.error) {
      redirect("/dashboard");
    }
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex flex-col">Editor </h2>
        <button
          type="submit"
          form="details"
          className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-md flex items-center justify-center text-center"
        >
          {isPending ? (
            <Spinner />
          ) : quotation.id.length > 0 ? (
            "Update"
          ) : (
            "Save"
          )}
        </button>
      </div>
      <div className="space-y-4 pb-6">
        <form id="details" action={action} className="space-y-4">
          <input name="id" className="hidden" defaultValue={user?.id} />
          <div className="mb-6 flex gap-2">
            <DetailsInput
              label="Number"
              id="number"
              onInputChange={(value: string, id: string) => updateNumber(value)}
              value={quotation.number}
            />
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="date">Date</Label>
              <input
                id="date"
                name="date"
                className="rounded-md border-gray-200"
                type="date"
                onChange={(e) => {
                  updateDate(format(parseISO(e.target.value), "yyyy-MM-dd"));
                }}
                value={quotation.date}
              />
            </div>
          </div>
          <fieldset name="ownerDetails" className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold mb-3">From:</h2>
            <div className="grid grid-cols-2 gap-2">
              <DetailsInput
                label="Name"
                id="ownerName"
                disabled
                onInputChange={handleFieldChange}
                defaultValue={user?.name!}
              />
              <DetailsInput
                label="Company Name"
                id="ownerCompany"
                disabled
                onInputChange={handleFieldChange}
                defaultValue={user?.company!}
              />
              <DetailsInput
                label="Mobile No"
                id="ownerMobile"
                disabled
                onInputChange={handleFieldChange}
                defaultValue={user?.mobile!}
              />
              <DetailsInput
                label="Email Address"
                id="ownerEmail"
                disabled
                onInputChange={handleFieldChange}
                defaultValue={user?.email!}
              />
            </div>
          </fieldset>
          <fieldset name="clientDetails" className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold mb-3">Quotation To:</h2>
            <div className="grid grid-cols-2 gap-2">
              <DetailsInput
                label="Name"
                id="clientName"
                onInputChange={handleFieldChange}
                value={details.clientName}
              />
              <DetailsInput
                label="Company Name"
                id="clientCompany"
                onInputChange={handleFieldChange}
                value={details.clientCompany}
              />
              <DetailsInput
                label="Mobile No"
                id="clientMobile"
                onInputChange={handleFieldChange}
                value={details.clientMobile}
              />
              <DetailsInput
                label="Email Address"
                id="clientEmail"
                onInputChange={handleFieldChange}
                value={details.clientEmail}
              />
            </div>
          </fieldset>
          {children}
        </form>
      </div>
    </div>
  );
}
