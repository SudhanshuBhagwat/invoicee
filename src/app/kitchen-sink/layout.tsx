import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="mx-6 py-4 h-full">{children}</main>;
}
