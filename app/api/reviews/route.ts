/**
 * Reviews API: list (public) and create (authenticated only).
 * User identity is taken only from the session.
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

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data: rows, error } = await supabase
      .from("reviews")
      .select("id, user_id, user_name, rating, comment, created_at, updated_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: error.message, reviews: [] },
        { status: 500 }
      );
    }

    const reviews = (rows ?? []).map((r) => ({
      id: r.id,
      user_id: r.user_id,
      user_name: r.user_name ?? "Anonymous",
      rating: Number(r.rating),
      comment: r.comment ?? "",
      created_at: r.created_at,
      updated_at: r.updated_at ?? r.created_at,
    }));

    return NextResponse.json({ reviews });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load reviews";
    return NextResponse.json({ error: message, reviews: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "You must be signed in to leave a review" }, { status: 401 });
  }

  let body: { rating?: number; comment?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const rating = typeof body.rating === "number" ? Math.min(5, Math.max(1, Math.round(body.rating))) : 5;
  const comment = typeof body.comment === "string" ? body.comment.trim() : "";
  if (!comment) {
    return NextResponse.json({ error: "Comment is required" }, { status: 400 });
  }

  const userId = session.user.id;
  let userName = session.user.name ?? session.user.email ?? "Anonymous";
  try {
    const supabase = getSupabase();
    const { data: client } = await supabase
      .from("clients")
      .select("name")
      .eq("id", userId)
      .single();
    if (client?.name) userName = client.name;
  } catch {
    // keep session name
  }

  try {
    const supabase = getSupabase();
    const { data: row, error } = await supabase
      .from("reviews")
      .insert({
        user_id: userId,
        user_name: userName,
        rating,
        comment,
      })
      .select("id, user_id, user_name, rating, comment, created_at, updated_at")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
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
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create review";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
