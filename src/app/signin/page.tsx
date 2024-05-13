"use client";

import supabase from "@/lib/supabase";

export default function Page() {
  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: `${origin}/auth/callback`,
      },
    });
  }

  return (
    <div className={`flex items-center`}>
      <button
        className="px-4 py-2 bg-green-600 rounded-md text-white font-bold"
        onClick={signInWithGoogle}
      >
        Login with Google
      </button>
    </div>
  );
}
