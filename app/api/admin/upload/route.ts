/**
 * Admin upload API: upload test result file and link to client.
 * Requires authentication. Optional: set ADMIN_EMAILS (comma-separated) to restrict to admins.
 */
import { auth } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
];

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient(url, key);
}

function isAdmin(email: string | undefined): boolean {
  const list = process.env.ADMIN_EMAILS;
  if (!list) return true; // No list = any authenticated user can upload
  const emails = list.split(",").map((e) => e.trim().toLowerCase());
  return email ? emails.includes(email.toLowerCase()) : false;
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isAdmin(session.user.email ?? undefined)) {
    return NextResponse.json(
      { error: "You do not have permission to upload results." },
      { status: 403 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const email = (formData.get("email") as string)?.trim();
    const testName = (formData.get("testName") as string)?.trim();
    const testId = (formData.get("testId") as string)?.trim() || null;
    const notes = (formData.get("notes") as string)?.trim() || null;

    if (!email) {
      return NextResponse.json(
        { error: "Client email is required." },
        { status: 400 }
      );
    }
    if (!testName) {
      return NextResponse.json(
        { error: "Test name is required." },
        { status: 400 }
      );
    }
    if (!file || file.size === 0) {
      return NextResponse.json(
        { error: "Please select a file." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File must be 10MB or smaller." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "File must be a PDF or image (PNG, JPG, JPEG)." },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const { data: client, error: clientError } = await supabase
      .from("clients")
      .select("id")
      .eq("email", email)
      .single();

    if (clientError || !client) {
      return NextResponse.json(
        {
          error:
            "Client not found. The client must sign up first before you can upload results.",
        },
        { status: 404 }
      );
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const storagePath = `${client.id}/${Date.now()}-${safeName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("test-results")
      .upload(storagePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: uploadError.message || "Upload failed." },
        { status: 500 }
      );
    }

    const { error: insertError } = await supabase.from("test_results").insert({
      client_id: client.id,
      test_name: testName,
      test_id: testId,
      file_path: uploadData.path,
      file_name: file.name,
      notes,
      uploaded_by: session.user.email ?? "admin",
    });

    if (insertError) {
      await supabase.storage.from("test-results").remove([uploadData.path]);
      return NextResponse.json(
        { error: insertError.message || "Failed to save result record." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Test result uploaded successfully.",
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
