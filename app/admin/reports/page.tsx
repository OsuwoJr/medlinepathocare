'use client';

import { FileText, TrendingUp, Calendar, User, BarChart3, ExternalLink } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';

type ClientRef = { id: string; name: string; email: string } | null;

type Report = {
  id: string;
  test_name: string;
  test_id: string | null;
  file_name: string;
  file_path: string;
  uploaded_at: string;
  uploaded_by: string | null;
  notes: string | null;
  clients: ClientRef;
};

type Stats = {
  totalUploads: number;
  uploadsThisMonth: number;
  clientsWithResults: number;
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function clientLabel(clients: ClientRef): string {
  if (!clients) return '—';
  return clients.name ? `${clients.name} (${clients.email})` : clients.email;
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/reports');
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? 'Failed to load reports');
        setReports([]);
        setStats(null);
        return;
      }
      setReports(json.reports ?? []);
      setStats(json.stats ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load reports');
      setReports([]);
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="max-w-5xl">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Reports
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          View upload history and stats
        </p>

        {error && (
          <div className="mt-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Stats cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats !== null ? stats.totalUploads : '—'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total uploads
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats !== null ? stats.clientsWithResults : '—'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Clients with results
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats !== null ? stats.uploadsThisMonth : '—'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  This month
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats !== null ? stats.uploadsThisMonth : '—'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Recent activity
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Upload history table */}
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
                  <th scope="col" className="px-4 py-3 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-slate-500 dark:text-slate-400">
                      Loading reports...
                    </td>
                  </tr>
                ) : reports.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                          <FileText className="h-7 w-7" />
                        </div>
                        <p className="font-medium text-slate-700 dark:text-slate-300">
                          No uploads yet
                        </p>
                        <p className="text-sm max-w-sm">
                          Test result uploads will appear here with date, client,
                          test name, and file.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  reports.map((report) => (
                    <tr
                      key={report.id}
                      className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        {formatDate(report.uploaded_at)}
                      </td>
                      <td className="px-4 py-3">
                        {clientLabel(report.clients)}
                      </td>
                      <td className="px-4 py-3">{report.test_name}</td>
                      <td className="px-4 py-3">{report.file_name}</td>
                      <td className="px-4 py-3">
                        {report.uploaded_by ?? '—'}
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={`/api/admin/reports/${report.id}/download`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
