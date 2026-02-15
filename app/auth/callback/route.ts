import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getAdminSupabase } from "@/lib/admin";
import { createOAuthToken } from "@/lib/oauth-token";

function isAdminEmail(email: string): boolean {
  const list = process.env.ADMIN_EMAILS;
  if (!list) return false;
  return list.split(",").map((e) => e.trim().toLowerCase()).includes(email.toLowerCase());
}

/**
 * OAuth callback route (server). The code exchange happens here using cookies
 * (PKCE code_verifier is in cookies set by the browser client when the user clicked
 * "Continue with Google"). We use createServerClient from @supabase/ssr to read cookies.
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/portal";
  const origin = request.headers.get("x-forwarded-host")
    ? `${request.headers.get("x-forwarded-proto") ?? "https"}://${request.headers.get("x-forwarded-host")}`
    : requestUrl.origin;

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/signin?error=oauth_missing_code`);
  }

  // Create server Supabase client with access to cookies (including code_verifier)
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    console.error("OAuth exchange error:", error?.message || "no user");
    return NextResponse.redirect(`${origin}/auth/signin?error=oauth_exchange`);
  }

  const user = data.user;
  const email = user.email?.trim();
  if (!email) {
    return NextResponse.redirect(`${origin}/auth/signin?error=oauth_no_email`);
  }

  const role = isAdminEmail(email) ? ("admin" as const) : ("user" as const);

  // Ensure client record exists (non-admins only)
  if (role === "user") {
    const admin = getAdminSupabase();
    const { data: client } = await admin.from("clients").select("id").eq("email", email).single();
    if (!client) {
      const name =
        (user.user_metadata?.full_name as string) || user.user_metadata?.name || email.split("@")[0];
      await admin.from("clients").insert({
        id: user.id,
        email,
        name: name || email.split("@")[0],
        phone: (user.user_metadata?.phone as string) || null,
      });
    }
  }

  // Create one-time token for NextAuth sign-in
  const token = createOAuthToken({ sub: user.id, email, role });
  const safeNext = next.startsWith("/") ? next : "/portal";
  return NextResponse.redirect(
    `${origin}/auth/signin?token=${encodeURIComponent(token)}&callbackUrl=${encodeURIComponent(safeNext)}`
  );
}
