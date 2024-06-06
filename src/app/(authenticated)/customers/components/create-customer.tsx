import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { createCustomer } from "@/services/customers";
import { ArrowUpRight, PlusCircle } from "lucide-react";
import Link from "next/link";

export function CreateCustomer() {
  return (
    <div className="mt-8">
      <form
        action={createCustomer}
        id="customer-form"
        className="w-full grid grid-cols-2 gap-4"
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="first-name">First Name</Label>
          <Input type="text" name="first-name" placeholder="John" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="last-name">Last Name</Label>
          <Input type="text" name="last-name" placeholder="Doe" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="number">Contact Number</Label>
          <Input type="number" name="number" placeholder="+91 1234567890" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" name="email" placeholder="Email" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="company">Company</Label>
          <Input type="text" name="company" placeholder="Acme Inc." />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="address">Billing Address</Label>
          <Input
            type="text"
            name="address"
            placeholder="36th Street, Near Avenue Mall, Pune"
          />
        </div>
      </form>
    </div>
  );
}
