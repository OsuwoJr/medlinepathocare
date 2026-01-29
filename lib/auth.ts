import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";

// Use service role so we can look up/create client records (RLS blocks anon after sign-in)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Sign in with Supabase Auth (use anon client for auth only)
        const supabaseAuth = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { data, error } = await supabaseAuth.auth.signInWithPassword({
          email: credentials.email as string,
          password: credentials.password as string,
        });

        if (error || !data.user) {
          return null;
        }

        // Get or create client record (service role bypasses RLS)
        const { data: client } = await supabaseAdmin
          .from("clients")
          .select("*")
          .eq("email", credentials.email)
          .single();

        if (!client) {
          const meta = data.user.user_metadata;
          await supabaseAdmin.from("clients").insert({
            id: data.user.id,
            email: credentials.email,
            name: (meta?.full_name as string) || (data.user.email?.split("@")[0] ?? "Client"),
            phone: (meta?.phone as string) || null,
          });
        }

        return {
          id: data.user.id,
          email: data.user.email ?? undefined,
          name: client?.name ?? data.user.email?.split("@")[0] ?? "Client",
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
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
