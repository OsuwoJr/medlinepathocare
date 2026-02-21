/**
 * Single review: update (PATCH) or delete (DELETE). Only the review owner can update/delete.
 */
import { auth } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient(url, key);
}

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Review ID required" }, { status: 400 });
  }

  let body: { rating?: number; comment?: string };
  try {
    body = await _request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const supabase = getSupabase();
  const { data: existing, error: fetchError } = await supabase
    .from("reviews")
    .select("user_id")
    .eq("id", id)
    .single();

  if (fetchError || !existing) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }
  if (existing.user_id !== session.user.id) {
    return NextResponse.json({ error: "You can only edit your own review" }, { status: 403 });
  }

  const updates: { rating?: number; comment?: string; updated_at: string } = {
    updated_at: new Date().toISOString(),
  };
  if (typeof body.rating === "number") {
    updates.rating = Math.min(5, Math.max(1, Math.round(body.rating)));
  }
  if (typeof body.comment === "string") {
    const trimmed = body.comment.trim();
    if (trimmed) updates.comment = trimmed;
  }

  const hasChange = "rating" in updates || "comment" in updates;
  if (!hasChange) {
    return NextResponse.json({ error: "Provide rating or comment to update" }, { status: 400 });
  }

  const { data: row, error: updateError } = await supabase
    .from("reviews")
    .update(updates)
    .eq("id", id)
    .select("id, user_id, user_name, rating, comment, created_at, updated_at")
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({
    review: {
      id: row.id,
      user_id: row.user_id,
      user_name: row.user_name ?? "Anonymous",
      rating: Number(row.rating),
      comment: row.comment ?? "",
      created_at: row.created_at,
      updated_at: row.updated_at ?? row.created_at,
    },
  });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Review ID required" }, { status: 400 });
  }

  const supabase = getSupabase();
  const { data: existing, error: fetchError } = await supabase
    .from("reviews")
    .select("user_id")
    .eq("id", id)
    .single();

  if (fetchError || !existing) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }
  if (existing.user_id !== session.user.id) {
    return NextResponse.json({ error: "You can only delete your own review" }, { status: 403 });
  }

  const { error: deleteError } = await supabase.from("reviews").delete().eq("id", id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
