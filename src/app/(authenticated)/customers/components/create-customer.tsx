import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCustomer } from "@/services/customers";
import { Customer } from "@/types/types";

export function CreateCustomer({
  initialData,
}: {
  initialData?: Customer | null;
}) {
  const createOrUpdateCustomer = createCustomer.bind(null, initialData?.id);

  return (
    <div className="mt-8">
      <form
        action={createOrUpdateCustomer}
        id="customer-form"
        className="w-full grid grid-cols-2 gap-4"
      >
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="first-name">First Name</Label>
          <Input
            type="text"
            name="first-name"
            placeholder="John"
            defaultValue={initialData?.first_name || ""}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="last-name">Last Name</Label>
          <Input
            type="text"
            name="last-name"
            placeholder="Doe"
            defaultValue={initialData?.last_name || ""}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="number">Contact Number</Label>
          <Input
            type="number"
            name="number"
            placeholder="+91 1234567890"
            defaultValue={initialData?.mobile || ""}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={initialData?.email || ""}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="company">Company</Label>
          <Input
            type="text"
            name="company"
            placeholder="Acme Inc."
            defaultValue={initialData?.company || ""}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="address">Billing Address</Label>
          <Input
            type="text"
            name="address"
            defaultValue={initialData?.billing_address || ""}
            placeholder="36th Street, Near Avenue Mall, Pune"
          />
        </div>
        <div className="grid col-span-2 w-full gap-1.5">
          <Label htmlFor="gst">GST Number</Label>
          <Input
            type="text"
            name="gst"
            defaultValue={initialData?.gst_number || ""}
            placeholder="22AAAAA0000A1Z5"
          />
        </div>
      </form>
    </div>
  );
}
