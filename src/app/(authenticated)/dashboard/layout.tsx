import Navbar from "@/components/Navbar";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Toaster />
    </div>
  );
}
