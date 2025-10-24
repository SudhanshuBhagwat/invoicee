"use client";

import { CreateCustomer } from "@/app/(authenticated)/customers/components/create-customer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ArrowUpRight, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { Customer } from "@/types/types";

export default function CreateCustomerSheet({
  isOpen,
  initial,
}: {
  isOpen: boolean;
  initial?: Customer | null;
}) {
  const pathname = usePathname();

  return (
    <Sheet open={isOpen}>
      <SheetContent className="min-w-[40rem]" showCloseButton={false}>
        <SheetHeader className="flex flex-row items-center justify-between">
          <div>
            <SheetTitle className="text-2xl font-bold tracking-tight">
              Create Customer
            </SheetTitle>
            <SheetDescription>
              Quick and easy way to create a customer on the fly.
            </SheetDescription>
          </div>
          <Link
            href={"/new-customer"}
            className="text-xs gap-1 h-8 px-2 border border-input hover:bg-accent hover:text-accent-foreground flex items-center justify-center rounded-md"
          >
            <ArrowUpRight className="h-4 w-4" />
            Full Page View
          </Link>
        </SheetHeader>
        <CreateCustomer initialData={initial} />
        <SheetFooter className="mt-6">
          <Link
            href={pathname}
            className="h-9 py-2 px-4 border border-input hover:bg-accent hover:text-accent-foreground flex items-center justify-center rounded-md"
          >
            Cancel
          </Link>
          <Button
            type="submit"
            form="customer-form"
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            Save
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
