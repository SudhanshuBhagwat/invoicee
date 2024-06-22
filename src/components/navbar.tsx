"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown";
import Image from "next/image";
import { createBrowserClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import AppIcon from "./icons/app";
import NavLink from "./nav-link";
import { useUser } from "@/lib/provider";

export default function Navbar() {
  const user = useUser();
  const navigation = useRouter();

  async function handleSignOut() {
    const supabase = createBrowserClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigation.replace("/signin");
    }
  }

  return (
    <header className="w-full sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <h1 className="flex items-center gap-2 text-lg font-semibold md:text-base select-none">
          <AppIcon />
          Invoicee
        </h1>
        {user && (
          <>
            <NavLink href={"/dashboard"} name="Dashboard" />
            <NavLink href={"/invoices"} name="Invoices" />
            <NavLink href={"/customers"} name="Customers" />
          </>
        )}
      </nav>
      <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Image
                  src={user.avatar_url}
                  className="rounded-full select-none"
                  width={34}
                  height={34}
                  alt="User Image"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigation.push("/settings/account")}
              >
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href="/signin"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Signin
          </Link>
        )}
      </div>
    </header>
  );
}
