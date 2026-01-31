'use client';

import { Users, Mail, Phone, Calendar, Search } from 'lucide-react';

export default function AdminClientsPage() {
  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="max-w-5xl">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Clients
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Manage client accounts
        </p>

        <div className="mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow rounded-xl overflow-hidden">
          {/* Toolbar placeholder */}
          <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-slate-200 dark:border-slate-800">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="search"
                placeholder="Search by name or email..."
                disabled
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed"
              />
            </div>
            <span className="inline-flex items-center text-xs text-slate-500 dark:text-slate-400 sm:self-center">
              Coming soon
            </span>
          </div>

          {/* Table placeholder */}
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
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                        <Users className="h-7 w-7" />
                      </div>
                      <p className="font-medium text-slate-700 dark:text-slate-300">
                        Client list coming soon
                      </p>
                      <p className="text-sm max-w-sm">
                        Once implemented, you will see all clients here. Use the
                        implementation guide to connect Supabase and enable
                        listing, search, and management.
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
