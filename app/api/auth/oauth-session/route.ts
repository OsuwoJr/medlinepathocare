import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { getAdminSupabase } from "@/lib/admin";
import { createOAuthToken } from "@/lib/oauth-token";

function isAdminEmail(email: string): boolean {
  const list = process.env.ADMIN_EMAILS;
  if (!list) return false;
  return list.split(",").map((e) => e.trim().toLowerCase()).includes(email.toLowerCase());
}

/**
 * Fallback for OAuth when tokens land in the URL hash (implicit flow).
 * Client sends access_token + refresh_token; we validate, ensure client row, return one-time token.
 */
export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return NextResponse.json({ error: "oauth_config" }, { status: 503 });
  }

  let body: { access_token?: string; refresh_token?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const access_token = body.access_token?.trim();
  const refresh_token = body.refresh_token?.trim();
  if (!access_token || !refresh_token) {
    return NextResponse.json({ error: "missing_tokens" }, { status: 400 });
  }

  const supabase = createClient(url, anonKey);
  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });

  if (error || !data.user) {
    return NextResponse.json({ error: "oauth_exchange" }, { status: 401 });
  }

  const user = data.user;
  const email = user.email?.trim();
  if (!email) {
    return NextResponse.json({ error: "oauth_no_email" }, { status: 400 });
  }

  const role = isAdminEmail(email) ? ("admin" as const) : ("user" as const);

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

  const token = createOAuthToken({ sub: user.id, email, role });
  return NextResponse.json({ token });
}
