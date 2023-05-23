"use client";

import store from "@/store/store";
import { ReactNode, useEffect, useRef, useState } from "react";

import Spinner from "@/components/ui/Spinner";
import {
  Entity,
  createEntity,
  updateEntity,
  updateEntityCount,
} from "@/services/database";
import { useSupabase } from "@/utils/supabase-provider";
import DetailsInput from "./DetailsInput";
import { Item } from "./table-form";
import { useRouter } from "next/navigation";

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
  note: string;
  amount: number;
  number: string;
};

interface FormProps {
  type: Entity;
  initial: IQuotation | string;
  children?: ReactNode;
}

export default function Form({ type, initial, children }: FormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useRouter();
  const { supabase, user } = useSupabase();

  useEffect(() => {
    setState(initial);
  }, []);

  const setState = store((state) => state.setState);
  const quotation = store((state) => state.quotation);
  const details = store((state) => state.quotation.details);
  const updateField = store((state) => state.updateField);

  const totalAmount: number =
    quotation.items.length > 0
      ? quotation.items
          .map((item) => {
            return item.amount.reduce(
              (acc, subItem) => acc + Number(subItem.value),
              0
            );
          })
          .reduce((acc, item) => {
            return acc + item;
          }, 0)
      : 0;

  function handleFieldChange(value: string, id: string) {
    updateField(id, value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const quotationCount = Number(quotation.number.substring(2));
    try {
      const data = await Promise.allSettled([
        quotation.id.length > 0
          ? await updateEntity(supabase, type, {
              ...quotation,
              amount: totalAmount,
            })
          : await createEntity(
              supabase,
              type,
              {
                ...quotation,
                amount: totalAmount,
              },
              user!.id
            ),
        await updateEntityCount(supabase, type, quotationCount, user!.id),
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]);
      // @ts-ignore
      const id = data[0].value[0].id;

      if (quotation.id.length === 0) {
        navigate.replace(`/quotation/${id}`);
      }
    } catch (e) {
      setIsLoading(false);
      console.error("Something went wrong");
    }
    setIsLoading(false);
    formRef.current?.reset();
  }

  const entity = `${type.substring(0, 1).toUpperCase()}${type.substring(1)}`;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex flex-col">
          {entity} Editor{" "}
          <span className="text-sm font-normal text-gray-500">
            (Start typing to see the changes in effect)
          </span>
        </h2>
        <button
          type="submit"
          form="details"
          className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-md flex items-center justify-center text-center"
        >
          {isLoading ? (
            <Spinner />
          ) : quotation.id.length > 0 ? (
            "Update"
          ) : (
            "Save"
          )}
        </button>
      </div>
      <div className="space-y-4 pb-6">
        <div className="text-right mb-8">
          <p className="text-lg font-bold">
            {entity} No: <span className="font-medium">{quotation.number}</span>
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
              <h2 className="text-xl font-semibold mb-3">{entity} To:</h2>
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
