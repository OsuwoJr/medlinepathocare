'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { LayoutDashboard, Upload, FileText, Users, LogOut, Shield, Home } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';

function AdminNav({ children, pathname }: { children: ReactNode; pathname: string }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      <aside className="w-56 flex-shrink-0 bg-slate-900 dark:bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="font-semibold text-white text-sm block">Admin</span>
              <span className="text-xs text-slate-500">Medline Pathocare</span>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          <Link
            href="/admin"
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/admin'
                ? 'bg-slate-800 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link
            href="/admin/upload"
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/admin/upload'
                ? 'bg-slate-800 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            Upload result
          </Link>
          <Link
            href="/admin/reports"
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/admin/reports'
                ? 'bg-slate-800 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            Reports
          </Link>
          <Link
            href="/admin/clients"
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/admin/clients'
                ? 'bg-slate-800 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            Clients
          </Link>
        </nav>
        <div className="p-3 border-t border-slate-800 space-y-0.5">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            Main site
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: '/admin/signin' })}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const isSignInPage = pathname === '/admin/signin';

  useEffect(() => {
    if (isSignInPage) return;
    if (status === 'loading') return;
    if (!session) {
      const url = new URL('/admin/signin', window.location.origin);
      url.searchParams.set('callbackUrl', pathname ?? '/admin');
      router.replace(url.pathname + url.search);
      return;
    }
    if ((session.user as { role?: string })?.role !== 'admin') {
      router.replace('/');
      return;
    }
  }, [isSignInPage, session, status, router, pathname]);

  if (isSignInPage) {
    return <>{children}</>;
  }

  if (status === 'loading' || !session || (session.user as { role?: string })?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-amber-500 border-t-transparent mx-auto" />
          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return <AdminNav pathname={pathname ?? ''}>{children}</AdminNav>;
}
