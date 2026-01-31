import { auth } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const ADMIN_EMAILS = process.env.ADMIN_EMAILS;
function isAdmin(email: string | undefined): boolean {
  if (!ADMIN_EMAILS) return false;
  const list = ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase());
  return email ? list.includes(email.toLowerCase()) : false;
}

export function getAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase env for admin");
  return createClient(url, key);
}

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id)
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  if (!isAdmin(session.user.email ?? undefined))
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  return { session, supabase: getAdminSupabase() };
}
