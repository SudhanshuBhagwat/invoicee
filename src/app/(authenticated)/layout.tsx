import { redirect } from "next/navigation";
import React from "react";
import { Toaster } from "react-hot-toast";
import { createClient } from "@/utils/supabase/server";
import Nav from "@/components/nav";

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
      <Nav user={data.user} />
      <main className="mx-6">{children}</main>
      <Toaster />
    </div>
  );
}
