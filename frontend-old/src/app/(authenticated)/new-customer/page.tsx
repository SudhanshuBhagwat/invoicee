import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CreateCustomer } from "../customers/components/create-customer";

export default function Page() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="text-3xl font-bold tracking-tight">
            Create Customer
          </div>
          <Button
            type="submit"
            form="customer-form"
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            Save
          </Button>
        </div>
        <CreateCustomer />
      </div>
    </div>
  );
}
