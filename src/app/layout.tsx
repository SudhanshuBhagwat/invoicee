import Navbar from "@/components/Navbar";
import SupabaseProvider from "@/utils/supabase-provider";
import "../styles/globals.css";
import { Metadata } from "next";
import { createServerClient } from "@/utils/supabase-server";

export const metadata: Metadata = {
  title: "Invoicee",
  description: "A simple Invoicing application for all businesses.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className="h-screen">
        <SupabaseProvider>
          {session && <Navbar />}
          <main className="">{children}</main>
        </SupabaseProvider>
      </body>
    </html>
  );
}
