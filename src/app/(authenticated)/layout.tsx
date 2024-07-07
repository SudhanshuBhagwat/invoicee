import React from "react";
import { Toaster } from "react-hot-toast";
import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/navbar";
import UserContextProvider from "@/lib/provider";
import { getCurrentUser, getSupabaseUser } from "@/services/database";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data } = await getSupabaseUser(supabase);
  const user = await getCurrentUser(supabase);

  if (!user) return null;

  return (
    <UserContextProvider
      user={{
        ...user,
        avatar_url: data.user?.user_metadata.avatar_url,
      }}
    >
      <Navbar />
      <main className="mx-6 py-2">{children}</main>
      <Toaster />
    </UserContextProvider>
  );
}
