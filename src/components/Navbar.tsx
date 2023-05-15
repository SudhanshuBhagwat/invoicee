"use client";

import { useSupabase } from "@/utils/supabase-provider";
import NavLink from "./ui/NavLink";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { supabase, user } = useSupabase();

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  return (
    <nav className="px-6 py-4 shadow flex items-center justify-between">
      <h1 className="text-3xl font-bold">Invoicee</h1>
      <ul className="flex items-center space-x-6">
        <li>
          <NavLink href="/">Dashboard</NavLink>
        </li>
        <li>
          <button onClick={handleSignOut}>Sign Out</button>
        </li>
        <li>
          <Link href="/user">
            <Image
              src={user?.user_metadata["avatar_url"]}
              className="rounded-full"
              width={34}
              height={34}
              alt="User Image"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
