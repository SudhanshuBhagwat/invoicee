import React from "react";
import ElementsContextProvider from "./elements-context";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ElementsContextProvider>
      <main className="mx-6 py-4 h-full">{children}</main>
    </ElementsContextProvider>
  );
}
