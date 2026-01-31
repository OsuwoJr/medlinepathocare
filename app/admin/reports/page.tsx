'use client';

import { FileText, TrendingUp, Calendar, User, BarChart3 } from 'lucide-react';

export default function AdminReportsPage() {
  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="max-w-5xl">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Reports
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          View upload history and stats
        </p>

        {/* Stats cards placeholder */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm opacity-75">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  —
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total uploads
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm opacity-75">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  —
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Clients with results
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm opacity-75">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  —
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  This month
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm opacity-75">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  —
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Recent activity
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Upload history table placeholder */}
        <div className="mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 p-4 border-b border-slate-200 dark:border-slate-800">
            <BarChart3 className="h-5 w-5 text-slate-500" />
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Upload history
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-600 dark:text-slate-400">
              <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Client
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Test name
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    File
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Uploaded by
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                        <FileText className="h-7 w-7" />
                      </div>
                      <p className="font-medium text-slate-700 dark:text-slate-300">
                        Upload history coming soon
                      </p>
                      <p className="text-sm max-w-sm">
                        Once implemented, you will see all test result uploads
                        here with date, client, test name, and file. Follow the
                        implementation guide to connect Supabase and load data.
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
