import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { getAdminSupabase } from "@/lib/admin";
import { createOAuthToken } from "@/lib/oauth-token";

function isAdminEmail(email: string): boolean {
  const list = process.env.ADMIN_EMAILS;
  if (!list) return false;
  return list.split(",").map((e) => e.trim().toLowerCase()).includes(email.toLowerCase());
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/portal";
  const origin = request.headers.get("x-forwarded-host")
    ? `${request.headers.get("x-forwarded-proto") ?? "https"}://${request.headers.get("x-forwarded-host")}`
    : new URL(request.url).origin;

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/signin?error=oauth_missing_code`);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return NextResponse.redirect(`${origin}/auth/signin?error=oauth_config`);
  }

  const supabase = createClient(url, anonKey);
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    return NextResponse.redirect(`${origin}/auth/signin?error=oauth_exchange`);
  }

  const user = data.user;
  const email = user.email?.trim();
  if (!email) {
    return NextResponse.redirect(`${origin}/auth/signin?error=oauth_no_email`);
  }

  const role = isAdminEmail(email) ? ("admin" as const) : ("user" as const);

  if (role === "user") {
    const admin = getAdminSupabase();
    const { data: client } = await admin.from("clients").select("id").eq("email", email).single();
    if (!client) {
      const name = (user.user_metadata?.full_name as string) || user.user_metadata?.name || email.split("@")[0];
      await admin.from("clients").insert({
        id: user.id,
        email,
        name: name || email.split("@")[0],
        phone: (user.user_metadata?.phone as string) || null,
      });
    }
  }

  const token = createOAuthToken({ sub: user.id, email, role });
  const safeNext = next.startsWith("/") ? next : "/portal";
  return NextResponse.redirect(`${origin}/auth/signin?token=${encodeURIComponent(token)}&callbackUrl=${encodeURIComponent(safeNext)}`);
}
