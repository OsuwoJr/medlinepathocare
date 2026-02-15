import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { verifyOAuthToken } from "@/lib/oauth-token";

// Lazy Supabase clients — only created at runtime so build doesn't require env vars
function getSupabaseAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient(url, key);
}

function isAdminEmail(email: string): boolean {
  const list = process.env.ADMIN_EMAILS;
  if (!list) return false;
  const emails = list.split(",").map((e) => e.trim().toLowerCase());
  return emails.includes(email.toLowerCase());
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        token: { label: "OAuth token", type: "text" },
      },
      async authorize(credentials) {
        // OAuth one-time token (from Google / Facebook / X callback)
        const token = credentials?.token as string | undefined;
        if (token) {
          const payload = verifyOAuthToken(token);
          if (!payload) return null;
          let name = payload.email.split("@")[0];
          if (payload.role !== "admin") {
            const supabaseAdmin = getSupabaseAdmin();
            const { data: client } = await supabaseAdmin
              .from("clients")
              .select("name")
              .eq("id", payload.sub)
              .single();
            if (client?.name) name = client.name;
          }
          return {
            id: payload.sub,
            email: payload.email,
            name,
            role: payload.role,
          };
        }

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (!url || !anonKey) {
          return null;
        }

        // Sign in with Supabase Auth (use anon client for auth only)
        const supabaseAuth = createClient(url, anonKey);

        const { data, error } = await supabaseAuth.auth.signInWithPassword({
          email: credentials.email as string,
          password: credentials.password as string,
        });

        if (error || !data.user) {
          return null;
        }

        const email = (credentials.email as string).trim();
        const role = isAdminEmail(email) ? ("admin" as const) : ("user" as const);

        // Get or create client record only for non-admins (service role bypasses RLS)
        let name = data.user.email?.split("@")[0] ?? "Client";
        if (role !== "admin") {
          const supabaseAdmin = getSupabaseAdmin();
          const { data: client } = await supabaseAdmin
            .from("clients")
            .select("*")
            .eq("email", email)
            .single();

          if (!client) {
            const meta = data.user.user_metadata;
            name = (meta?.full_name as string) || name;
            await supabaseAdmin.from("clients").insert({
              id: data.user.id,
              email,
              name,
              phone: (meta?.phone as string) || null,
            });
          } else {
            name = client.name;
          }
        }

        return {
          id: data.user.id,
          email: data.user.email ?? undefined,
          name,
          role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.role = (token.role as "admin" | "user") ?? "user";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = (user as { role?: "admin" | "user" }).role ?? "user";
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
