'use client';

import { Users, Mail, Phone, Calendar, Search } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';

type Client = {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  created_at: string;
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const fetchClients = useCallback(async (searchTerm?: string) => {
    const term = searchTerm !== undefined ? searchTerm : search;
    setLoading(true);
    setError(null);
    try {
      const q = term.trim()
        ? `?search=${encodeURIComponent(term.trim())}`
        : '';
      const res = await fetch(`/api/admin/clients${q}`);
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? 'Failed to load clients');
        setClients([]);
        return;
      }
      setClients(json.clients ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load clients');
      setClients([]);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const t = setTimeout(() => fetchClients(), search ? 400 : 0);
    return () => clearTimeout(t);
  }, [search, fetchClients]);

  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="max-w-5xl">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Clients
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Manage client accounts
        </p>

        {error && (
          <div className="mt-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">
            {error}
          </div>
        )}

        <div className="mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow rounded-xl overflow-hidden">
          <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-slate-200 dark:border-slate-800">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="search"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchClients()}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={() => fetchClients()}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-600 dark:text-slate-400">
              <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4" /> Client
                    </span>
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    <span className="flex items-center gap-2">
                      <Mail className="h-4 w-4" /> Email
                    </span>
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    <span className="flex items-center gap-2">
                      <Phone className="h-4 w-4" /> Phone
                    </span>
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> Created
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-12 text-center text-slate-500 dark:text-slate-400">
                      Loading clients...
                    </td>
                  </tr>
                ) : clients.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                          <Users className="h-7 w-7" />
                        </div>
                        <p className="font-medium text-slate-700 dark:text-slate-300">
                          No clients found
                        </p>
                        <p className="text-sm max-w-sm">
                          {search.trim()
                            ? 'Try a different search.'
                            : 'Clients will appear here once added.'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  clients.map((client) => (
                    <tr
                      key={client.id}
                      className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                        <Link
                          href={`/admin/clients/${client.id}`}
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {client.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3">{client.email}</td>
                      <td className="px-4 py-3">{client.phone ?? '—'}</td>
                      <td className="px-4 py-3">{formatDate(client.created_at)}</td>
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
