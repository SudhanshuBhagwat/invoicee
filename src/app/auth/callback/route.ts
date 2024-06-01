import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { randomUUID } from "crypto";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  let origin_url = origin;
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  if (process.env.NODE_ENV === "development") {
    origin_url = "http://127.0.0.1:3000";
  }

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const { data: selectData } = await supabase
        .from("User")
        .select("*")
        .eq("provider_id", data.user.id);

      if (selectData?.length === 0) {
        const { error: insertError } = await supabase.from("User").insert({
          id: randomUUID(),
          email: data.user.email,
          provider_id: data.user.id,
          name: data.user.user_metadata.full_name,
          image: data.user.user_metadata.image,
        });

        if (insertError) {
          return NextResponse.redirect(`${origin}/auth/auth-code-error`);
        }
      }

      return NextResponse.redirect(`${origin_url}/dashboard`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin_url}/auth/auth-code-error`);
}
