import { createBrowserClient as createSSRBrowserClient } from "@supabase/ssr";

/**
 * Browser Supabase client. Uses @supabase/ssr so PKCE code_verifier is stored
 * in cookies and available on the OAuth callback (fixes "code verifier missing").
 * Also sets flowType: "pkce" and detectSessionInUrl by default.
 */
export function createBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }
  return createSSRBrowserClient(url, anonKey);
}
