'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function ClientPortalBanner() {
  const { data: session, status } = useSession();

  // Hide banner when signed in; show only when unauthenticated (skip during loading to avoid flash)
  if (status === 'loading' || session) {
    return null;
  }

  return (
    <section aria-label="Client Portal" className="py-6 px-4 bg-primary-100 dark:bg-primary-900/30 border-y border-primary-200 dark:border-primary-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        <p className="text-lg font-medium text-gray-800 dark:text-gray-200 text-center sm:text-left">
          View your test results – Sign in to the Client Portal
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/auth/signin"
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
          >
            New? Create account
          </Link>
        </div>
      </div>
    </section>
  );
}
