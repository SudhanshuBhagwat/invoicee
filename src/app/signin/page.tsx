"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
  const { status } = useSession();

  if (status === "authenticated") {
    redirect("/dashboard");
  }

  return (
    <div className={`flex items-center`}>
      <button
        className="px-4 py-2 bg-green-600 rounded-md text-white font-bold"
        onClick={() =>
          signIn("google", {
            callbackUrl: "/dashboard",
          })
        }
      >
        Login with Google
      </button>
    </div>
  );
}
