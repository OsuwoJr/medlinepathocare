import { requireAdmin } from "@/lib/admin";
import { NextRequest, NextResponse } from "next/server";

const BUCKET = "test-results";
const SIGNED_URL_EXPIRY_SEC = 3600; // 1 hour

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const result = await requireAdmin();
  if (result.error) return result.error;
  const { supabase } = result;

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Report ID required" }, { status: 400 });
  }

  const { data: report, error: fetchError } = await supabase
    .from("test_results")
    .select("file_path")
    .eq("id", id)
    .single();

  if (fetchError || !report?.file_path) {
    return NextResponse.json(
      { error: "Report not found or has no file" },
      { status: 404 }
    );
  }

  const { data: urlData, error: urlError } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(report.file_path, SIGNED_URL_EXPIRY_SEC);

  if (urlError || !urlData?.signedUrl) {
    return NextResponse.json(
      { error: urlError?.message ?? "Failed to create download link" },
      { status: 500 }
    );
  }

  return NextResponse.redirect(urlData.signedUrl);
}
