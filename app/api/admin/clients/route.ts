import { requireAdmin } from "@/lib/admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const result = await requireAdmin();
  if (result.error) return result.error;
  const { supabase } = result;

  const search = request.nextUrl.searchParams.get("search")?.trim();
  let q = supabase
    .from("clients")
    .select("id, email, name, phone, created_at")
    .order("created_at", { ascending: false });

  if (search) {
    q = q.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
  }

  const { data, error } = await q;
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ clients: data ?? [] });
}
