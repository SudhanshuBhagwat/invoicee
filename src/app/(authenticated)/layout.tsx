import { auth } from "@/auth";
import Navbar from "@/components/navbar";
import UserContextProvider from "@/lib/provider";
import React from "react";
import { Toaster } from "react-hot-toast";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <>
      <UserContextProvider
        //@ts-ignore
        user={{
          ...session.user,
          avatar_url: session.user.image!,
        }}
      >
        <Navbar />
        <main className="mx-6 py-2">{children}</main>
        <Toaster />
      </UserContextProvider>
    </>
  );
}
