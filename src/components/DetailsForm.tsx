"use client";

import { createEntity } from "@/services/database";
import store from "@/store/store";
import { useContext, useRef, useState } from "react";
import DetailsInput from "./DetailsInput";
import { useSupabase } from "@/utils/supabase-provider";

interface Props {
  type: "Quotation" | "Invoice";
}

export default function DetailsForm({ type }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const details = store((state) => state.quotation.details);
  const quotation = store((state) => state.quotation);
  const updateField = store((state) => state.updateField);
  const [isLoading, setIsLoading] = useState(false);

  const { supabase, user } = useSupabase();

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
    try {
      await Promise.allSettled([
        await createEntity(
          supabase,
          {
            ...quotation,
            amount: totalAmount,
          },
          user!.id
        ),
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]);
    } catch (e) {
      setIsLoading(false);
      console.error("Something went wrong");
    }
    setIsLoading(false);
    formRef.current?.reset();
  }

  return (
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
  );
}
