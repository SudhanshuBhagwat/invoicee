"use client";

import store from "@/store/store";
import { ReactNode, useEffect, useRef, useState } from "react";

import Spinner from "@/components/ui/Spinner";
import { createQuotation } from "@/services/database";
import { useSupabase } from "@/utils/supabase-provider";
import DetailsInput from "./DetailsInput";
import { Item } from "./table-form";

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
  note: Array<string>;
  amount: number;
};

interface FormProps {
  type: "Quotation" | "Invoice";
  initial: IQuotation | string;
  children?: ReactNode;
}

export default function Form({ type, initial, children }: FormProps) {
  const setState = store((state) => state.setState);
  const quotation = store((state) => state.quotation);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const details = store((state) => state.quotation.details);
  const items = store((state) => state.quotation.items);
  const updateField = store((state) => state.updateField);

  const { supabase, user } = useSupabase();

  useEffect(() => {
    setState(initial);
  }, []);

  const totalAmount: number = items
    .map((item) => {
      return item.amount.reduce(
        (acc, subItem) => acc + Number(subItem.value),
        0
      );
    })
    .reduce((acc, item) => {
      return acc + item;
    }, 0);

  function handleFieldChange(value: string, id: string) {
    updateField(id, value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Promise.allSettled([
        await createQuotation(
          supabase,
          {
            ...quotation,
            amount: totalAmount,
          },
          user!.id
        ),
        new Promise((resolve) => setTimeout(resolve, 5000)),
      ]);
    } catch (e) {
      setIsLoading(false);
      console.error("Something went wrong");
    }
    setIsLoading(false);
    formRef.current?.reset();
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {type} Editor{" "}
          <span className="text-base font-normal text-gray-500">
            (Start typing to see the changes in effect)
          </span>
        </h2>
        <button
          type="submit"
          form="details"
          className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-md flex items-center justify-center text-center"
        >
          {isLoading ? <Spinner /> : "Save"}
        </button>
      </div>
      <div className="space-y-4 pb-6">
        <div className="text-right mb-8">
          <p className="text-lg font-bold">
            {type} No: <span className="font-medium">{quotation.id}</span>
          </p>
          <p className="text-lg font-bold">
            Date: <span className="font-medium">{quotation.date}</span>
          </p>
        </div>
        <form
          id="details"
          onSubmit={handleSubmit}
          ref={formRef}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-6">
            <fieldset className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold mb-3">From:</h2>
              <DetailsInput
                label="Name"
                id="ownerName"
                onInputChange={handleFieldChange}
                value={details.ownerName}
              />
              <DetailsInput
                label="Company Name"
                id="ownerCompany"
                onInputChange={handleFieldChange}
                value={details.ownerCompany}
              />
              <DetailsInput
                label="Mobile No"
                id="ownerMobile"
                onInputChange={handleFieldChange}
                value={details.ownerMobile}
              />
              <DetailsInput
                label="Email Address"
                id="ownerEmail"
                onInputChange={handleFieldChange}
                value={details.ownerEmail}
              />
            </fieldset>
            <fieldset className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold mb-3">{type} To:</h2>
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
            </fieldset>
          </div>
        </form>
        {children}
      </div>
    </div>
  );
}
