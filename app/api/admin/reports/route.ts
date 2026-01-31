import { requireAdmin } from "@/lib/admin";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await requireAdmin();
  if (result.error) return result.error;
  const { supabase } = result;

  const { data, error } = await supabase
    .from("test_results")
    .select(`
      id, test_name, test_id, file_name, file_path, uploaded_at, uploaded_by, notes,
      clients ( id, name, email )
    `)
    .order("uploaded_at", { ascending: false });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ reports: data ?? [] });
}
