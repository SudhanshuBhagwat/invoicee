import { Metadata } from "next";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import NextAuthProvider from "@/components/NextAuthProvider";
import { Providers } from "./providers";

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
        <NextAuthProvider>
          <Providers>
            <Navbar />
            <main>{children}</main>
            <Toaster />
          </Providers>
        </NextAuthProvider>
      </body>
    </html>
  );
}
