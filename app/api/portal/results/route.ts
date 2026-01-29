/**
 * Portal results API: returns test results for the authenticated user only.
 * Security: client_id is derived ONLY from the session (session.user.id). We never
 * accept or trust client_id from query params or body—clients cannot see others' results.
 */
import { auth } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Always use session user id—never read client_id from request
  const clientId = session.user.id;

  try {
    const { data: client, error: clientError } = await supabase
      .from("clients")
      .select("id")
      .eq("id", clientId)
      .single();

    if (clientError || !client) {
      return NextResponse.json({ results: [] });
    }

    const { data: testResults, error: resultsError } = await supabase
      .from("test_results")
      .select("*")
      .eq("client_id", client.id)
      .order("uploaded_at", { ascending: false });

    if (resultsError) {
      return NextResponse.json(
        { error: resultsError.message },
        { status: 500 }
      );
    }

    const resultsWithUrls = await Promise.all(
      (testResults || []).map(async (result) => {
        const { data: urlData } = await supabase.storage
          .from("test-results")
          .createSignedUrl(result.file_path, 3600);

        return {
          ...result,
          file_url: urlData?.signedUrl ?? null,
        };
      })
    );

    return NextResponse.json({ results: resultsWithUrls });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load results";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
