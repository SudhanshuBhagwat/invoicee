"use client";

import { useSupabase } from "@/utils/supabase-provider";
import NavLink from "./ui/NavLink";

export default function Navbar() {
  const { supabase } = useSupabase();

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  return (
    <nav className="px-6 py-4 shadow flex items-center justify-between">
      <h1 className="text-3xl font-bold">Invoicee</h1>
      <ul className="flex space-x-6">
        <li>
          <NavLink href="/">Dashboard</NavLink>
        </li>
        <li>
          <button onClick={handleSignOut}>Sign Out</button>
        </li>
      </ul>
    </nav>
  );
}
