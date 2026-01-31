import { requireAdmin } from "@/lib/admin";
import { NextResponse } from "next/server";

function startOfMonthUTC(): string {
  const d = new Date();
  d.setUTCDate(1);
  d.setUTCHours(0, 0, 0, 0);
  return d.toISOString();
}

export async function GET() {
  const result = await requireAdmin();
  if (result.error) return result.error;
  const { supabase } = result;

  const [reportsRes, totalRes, monthRes, clientIdsRes] = await Promise.all([
    supabase
      .from("test_results")
      .select(`
        id, test_name, test_id, file_name, file_path, uploaded_at, uploaded_by, notes,
        clients ( id, name, email )
      `)
      .order("uploaded_at", { ascending: false }),
    supabase
      .from("test_results")
      .select("id", { count: "exact", head: true }),
    supabase
      .from("test_results")
      .select("id", { count: "exact", head: true })
      .gte("uploaded_at", startOfMonthUTC()),
    supabase.from("test_results").select("client_id"),
  ]);

  if (reportsRes.error)
    return NextResponse.json(
      { error: reportsRes.error.message },
      { status: 500 }
    );

  const clientsWithResults = new Set(
    (clientIdsRes.data ?? []).map((r) => r.client_id)
  ).size;

  const stats = {
    totalUploads: totalRes.count ?? 0,
    uploadsThisMonth: monthRes.count ?? 0,
    clientsWithResults,
  };

  return NextResponse.json({
    reports: reportsRes.data ?? [],
    stats,
  });
}
