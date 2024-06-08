"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Customer } from "@/types/types";
import store from "@/store/store";

export function ClientSelector({
  customers,
  customer,
}: {
  customers: Customer[];
  customer: string | null;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(customer || "");
  const updateCustomer = store((store) => store.updateCustomer);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {value ? value : "Select customer..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search customer..." />
          <CommandList>
            <CommandEmpty>No customer found.</CommandEmpty>
            <CommandGroup>
              {customers.map((customer) => (
                <CommandItem
                  key={customer.id}
                  value={`${customer.first_name} ${customer.last_name}`}
                  onSelect={(currentValue: React.SetStateAction<string>) => {
                    setValue(currentValue);
                    updateCustomer(customer.id!);
                    setOpen(false);
                  }}
                >
                  <p className="flex flex-col justify-start font-medium">
                    {customer.first_name} {customer.last_name}
                    <span className="text-xs font-normal">
                      {customer.company}
                    </span>
                  </p>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
