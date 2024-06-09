"use client";

import store from "@/store/store";
import { ReactNode, useEffect } from "react";

import Spinner from "@/components/ui/Spinner";
import DetailsInput from "./DetailsInput";
import { Label } from "./ui/label";
import { format, parseISO } from "date-fns";
import { Customer, IQuotation, UserData } from "@/types/types";
import { Entity, createInvoice } from "@/services/database";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { PlusCircle, SaveIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ClientSelector } from "./client-selector";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const QUOTATION_DATABASE = "quotation";

interface FormProps {
  type: Entity;
  initial: IQuotation;
  children?: ReactNode;
  user: UserData;
  customers: Customer[];
}

const entity = [{ name: "Quotation" }, { name: "Invoice" }] as const;

export default function Form({
  initial,
  user,
  children,
  customers,
}: FormProps) {
  const { pending: isPending } = useFormStatus();

  useEffect(() => {
    setState(initial);
  }, []);

  const setState = store((state) => state.setState);
  const quotation = store((state) => state.quotation);
  const updateField = store((state) => state.updateField);
  const updateNumber = store((state) => state.updateNumber);
  const updateDate = store((state) => state.updateDate);
  const pathname = usePathname();

  function handleFieldChange(value: string, id: string) {
    updateField(id, value);
  }
  return (
    <div>
      <div id="details" className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex flex-col">Editor </h2>
          <Button
            size="sm"
            onClick={async () => {
              await createInvoice(quotation, user.id);
            }}
          >
            {isPending ? (
              <Spinner />
            ) : (
              <span className="flex items-center">
                <SaveIcon className="h-4 w-4 mr-2" />
                {quotation.id ? "Update" : "Save"}
              </span>
            )}
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
              <Label htmlFor="date">Due Date</Label>
              <input
                id="date"
                name="date"
                className="rounded-md border shadow-sm border-input h-9 px-3 py-1 text-sm"
                type="date"
                onChange={(e) => {
                  updateDate(format(parseISO(e.target.value), "yyyy-MM-dd"));
                }}
                value={format(quotation.date || new Date(), "yyyy-MM-dd")}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="status">Status</Label>
              <Select
                name="status"
                defaultValue="0"
                value={String(quotation.status)}
                onValueChange={(value) => handleFieldChange(value, "status")}
              >
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="0">Draft</SelectItem>
                    <SelectItem value="1">Due</SelectItem>
                    <SelectItem value="2">Paid</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
            <div className="grid grid-cols-5 gap-4">
              <div className="grid col-span-3">
                <ClientSelector
                  customers={customers}
                  customer={
                    initial.customer
                      ? `${initial.customer?.first_name} ${initial.customer?.last_name}`
                      : ""
                  }
                />
              </div>
              <Link
                href={pathname + "?addCustomer=true"}
                className="cursor-pointer gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-3 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background col-span-2"
              >
                <span className="flex gap-2 items-center">
                  <PlusCircle className="h-3.5 w-3.5" />
                  Quick Add Customer
                </span>
              </Link>
            </div>
          </fieldset>
          {children}
        </div>
      </div>
    </div>
  );
}
