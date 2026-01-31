import { requireAdmin } from "@/lib/admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const result = await requireAdmin();
  if (result.error) return result.error;
  const { supabase } = result;

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Client ID required" }, { status: 400 });
  }

  const { data: client, error: clientError } = await supabase
    .from("clients")
    .select("id, email, name, phone, created_at, updated_at")
    .eq("id", id)
    .single();

  if (clientError || !client) {
    return NextResponse.json(
      { error: "Client not found" },
      { status: 404 }
    );
  }

  const { data: testResults, error: resultsError } = await supabase
    .from("test_results")
    .select("id, test_name, test_id, file_name, uploaded_at, uploaded_by")
    .eq("client_id", id)
    .order("uploaded_at", { ascending: false });

  if (resultsError) {
    return NextResponse.json(
      { error: resultsError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    client,
    testResults: testResults ?? [],
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const result = await requireAdmin();
  if (result.error) return result.error;
  const { supabase } = result;

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Client ID required" }, { status: 400 });
  }

  let body: { name?: string; phone?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const updates: { name?: string; phone?: string | null; updated_at?: string } = {};
  if (typeof body.name === "string") updates.name = body.name.trim() || undefined;
  if (body.phone !== undefined)
    updates.phone = body.phone === null || body.phone === "" ? null : String(body.phone).trim();

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { error: "Provide name and/or phone to update" },
      { status: 400 }
    );
  }

  if (updates.name !== undefined && updates.name.length === 0) {
    return NextResponse.json(
      { error: "Name cannot be empty" },
      { status: 400 }
    );
  }

  updates.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("clients")
    .update(updates)
    .eq("id", id)
    .select("id, email, name, phone, created_at, updated_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ client: data });
}
