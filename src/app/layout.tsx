import Navbar from "@/components/Navbar";
import SupabaseProvider from "@/utils/supabase-provider";
import "../styles/globals.css";
import { Metadata } from "next";
import { createServerClient } from "@/utils/supabase-server";
import Sidebar from "@/components/sidebar";

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
          <div className={`flex h-screen bg-gray-50 dark:bg-gray-900`}>
            {session && <Sidebar />}

            <div className="flex flex-col flex-1 w-full">
              {session && <Navbar />}
              <main className="h-full overflow-y-auto">
                <div className="">{children}</div>
              </main>
            </div>
          </div>
        </SupabaseProvider>
      </body>
    </html>
  );
}
