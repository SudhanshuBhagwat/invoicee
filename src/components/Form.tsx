"use client";

import store from "@/store/store";
import { ReactNode, useEffect } from "react";

import Spinner from "@/components/ui/Spinner";
import DetailsInput from "./DetailsInput";
import { Label } from "./ui/label";
import { format, parseISO } from "date-fns";
import { IQuotation, UserData } from "@/types/types";
import { Entity, createInvoice } from "@/services/database";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export const QUOTATION_DATABASE = "quotation";

interface FormProps {
  type: Entity;
  initial: IQuotation | string;
  children?: ReactNode;
  user: UserData;
}

const entity = [{ name: "Quotation" }, { name: "Invoice" }] as const;

export default function Form({ initial, user, children }: FormProps) {
  const { pending: isPending } = useFormStatus();

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

  return (
    <div className="p-4">
      <div id="details" className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex flex-col">Editor </h2>
          <Button
            size="sm"
            onClick={async () => {
              await createInvoice(quotation, user.id);
            }}
          >
            {isPending ? <Spinner /> : quotation.id ? "Update" : "Save"}
          </Button>
        </div>
        <div className="space-y-4 pb-6">
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
                className="rounded-md border-gray-200 h-9"
                type="date"
                onChange={(e) => {
                  updateDate(format(parseISO(e.target.value), "yyyy-MM-dd"));
                }}
                value={quotation.date}
              />
            </div>
          </div>
          <fieldset
            name="ownerDetails"
            className="grid gap-6 rounded-lg border p-4"
          >
            <legend className="-ml-1 px-1 text-sm font-medium">From</legend>
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
          <fieldset
            name="clientDetails"
            className="grid gap-6 rounded-lg border p-4"
          >
            <legend className="-ml-1 px-1 text-sm font-medium">
              Quotation To:
            </legend>
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
        </div>
      </div>
    </div>
  );
}
