"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateCustomerButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.push("?open=true");
      }}
      className="cursor-pointer gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
    >
      <span className="flex gap-2 items-center">
        <PlusCircle className="h-3.5 w-3.5" />
        Add Customer
      </span>
    </Button>
  );
}
