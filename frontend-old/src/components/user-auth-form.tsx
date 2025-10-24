"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import GoogleIcon from "./icons/Google";
import { signIn } from "@/services/database";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form action={signIn}>
        <Button variant="outline" type="submit" className="w-full">
          <GoogleIcon /> Google
        </Button>
      </form>
    </div>
  );
}
