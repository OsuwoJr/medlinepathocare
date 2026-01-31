'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Upload, FileText, Users, ArrowRight } from 'lucide-react';

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  const name = session?.user?.name ?? session?.user?.email ?? 'Admin';

  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="max-w-4xl">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Welcome back, {name}
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Medline Pathocare admin dashboard
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link
            href="/admin/upload"
            className="group flex items-center gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:border-amber-500/50 hover:shadow-md transition-all"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Upload className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Upload test result
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Attach a result file for a client
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-amber-500 flex-shrink-0" />
          </Link>

          <Link
            href="/admin/reports"
            className="group flex items-center gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:border-amber-500/50 hover:shadow-md transition-all"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-amber-500/10 group-hover:text-amber-600 dark:group-hover:text-amber-400">
              <FileText className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                Reports
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  coming soon
                </span>
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                View upload history and stats
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-amber-500 flex-shrink-0" />
          </Link>

          <Link
            href="/admin/clients"
            className="group flex items-center gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:border-amber-500/50 hover:shadow-md transition-all"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-amber-500/10 group-hover:text-amber-600 dark:group-hover:text-amber-400">
              <Users className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                Clients
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  coming soon
                </span>
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Manage client accounts
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-amber-500 flex-shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
}
