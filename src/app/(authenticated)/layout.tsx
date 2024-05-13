import { redirect } from "next/navigation";
import React from "react";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { createClient } from "@/utils/supabase/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    redirect("/signin");
  }

  return (
    <div>
      <Navbar user={data.user} />
      <main className="mx-4">{children}</main>
      <Toaster />
    </div>
  );
}
