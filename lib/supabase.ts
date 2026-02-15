import { createClient } from "@supabase/supabase-js";

/**
 * Browser-safe Supabase client (uses anon key).
 * Use for client-side auth and RLS-scoped queries.
 */
/**
 * Browser Supabase client. Uses PKCE flow for OAuth so the redirect
 * contains ?code=... (handled by server callback) instead of #access_token=...
 */
export function createBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }
  return createClient(url, anonKey, { auth: { flowType: "pkce" } });
}
