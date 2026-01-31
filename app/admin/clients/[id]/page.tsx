'use client';

import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  FileText,
  ExternalLink,
  Pencil,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

type Client = {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  created_at: string;
  updated_at: string;
};

type TestResult = {
  id: string;
  test_name: string;
  test_id: string | null;
  file_name: string;
  uploaded_at: string;
  uploaded_by: string | null;
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

export default function AdminClientDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [client, setClient] = useState<Client | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const fetchClient = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/clients/${id}`);
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? 'Failed to load client');
        setClient(null);
        setTestResults([]);
        return;
      }
      setClient(json.client);
      setTestResults(json.testResults ?? []);
      setEditName(json.client?.name ?? '');
      setEditPhone(json.client?.phone ?? '');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load client');
      setClient(null);
      setTestResults([]);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchClient();
  }, [fetchClient]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || saveLoading) return;
    setSaveLoading(true);
    setSaveError(null);
    try {
      const res = await fetch(`/api/admin/clients/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName.trim(), phone: editPhone.trim() || null }),
      });
      const json = await res.json();
      if (!res.ok) {
        setSaveError(json.error ?? 'Failed to update');
        return;
      }
      setClient(json.client);
      setEditing(false);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'Failed to update');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCancel = () => {
    setEditName(client?.name ?? '');
    setEditPhone(client?.phone ?? '');
    setSaveError(null);
    setEditing(false);
  };

  if (!id) {
    return (
      <div className="p-6 sm:p-8 lg:p-10">
        <p className="text-slate-600 dark:text-slate-400">Invalid client.</p>
        <Link
          href="/admin/clients"
          className="mt-4 inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to clients
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 sm:p-8 lg:p-10">
        <p className="text-slate-600 dark:text-slate-400">Loading client...</p>
        <Link
          href="/admin/clients"
          className="mt-4 inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to clients
        </Link>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="p-6 sm:p-8 lg:p-10">
        <p className="text-red-600 dark:text-red-400">{error ?? 'Client not found'}</p>
        <Link
          href="/admin/clients"
          className="mt-4 inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to clients
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="max-w-3xl">
        <Link
          href="/admin/clients"
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to clients
        </Link>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Client detail
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          View and edit client information
        </p>

        {/* Client info card */}
        <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {editing ? (
                <form onSubmit={handleSave} className="space-y-4">
                  {saveError && (
                    <p className="text-sm text-red-600 dark:text-red-400">{saveError}</p>
                  )}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="Optional"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={saveLoading}
                      className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
                    >
                      {saveLoading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={saveLoading}
                      className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                    <User className="h-5 w-5 text-slate-500" />
                    <span className="font-semibold text-lg">{client.name}</span>
                  </div>
                  <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-2">
                      <Mail className="h-4 w-4 shrink-0" /> {client.email}
                    </span>
                    <span className="flex items-center gap-2">
                      <Phone className="h-4 w-4 shrink-0" />{' '}
                      {client.phone ?? '—'}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 shrink-0" /> Created{' '}
                      {formatDate(client.created_at)}
                    </span>
                  </div>
                </>
              )}
            </div>
            {!editing && (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <Pencil className="h-4 w-4" /> Edit
              </button>
            )}
          </div>
        </div>

        {/* Test results */}
        <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="flex items-center gap-2 p-4 border-b border-slate-200 dark:border-slate-800">
            <FileText className="h-5 w-5 text-slate-500" />
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Test results ({testResults.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            {testResults.length === 0 ? (
              <div className="px-4 py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                No test results yet for this client.
              </div>
            ) : (
              <table className="w-full text-sm text-left text-slate-600 dark:text-slate-400">
                <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Date
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
                  {testResults.map((result) => (
                    <tr
                      key={result.id}
                      className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        {formatDate(result.uploaded_at)}
                      </td>
                      <td className="px-4 py-3">{result.test_name}</td>
                      <td className="px-4 py-3">{result.file_name}</td>
                      <td className="px-4 py-3">
                        {result.uploaded_by ?? '—'}
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={`/api/admin/reports/${result.id}/download`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                        >
                          <ExternalLink className="h-4 w-4" /> View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
