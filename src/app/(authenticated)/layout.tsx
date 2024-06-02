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
  const { data } = await supabase.auth.getUser();

  return (
    <div>
      <Nav user={data.user!} />
      <main>{children}</main>
      <Toaster />
    </div>
  );
}
