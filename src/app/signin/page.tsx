"use client";

import { signIn } from "next-auth/react";

export default async function Page() {
  return (
    <div className={`flex items-center`}>
      <button
        className="px-4 py-2 bg-green-600 rounded-md text-white font-bold"
        onClick={() =>
          signIn("google", {
            callbackUrl: "/",
          })
        }
      >
        Login with Google
      </button>
    </div>
  );
}
