import { Metadata } from "next";
import "../styles/globals.css";
import SupabaseProvider from "@/utils/supabase-provider";

export const metadata: Metadata = {
  title: "Invoicee",
  description: "A simple Invoicing application for all businesses.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen">
        <SupabaseProvider>
          <main className="h-full overflow-y-auto">{children}</main>
        </SupabaseProvider>
      </body>
    </html>
  );
}
