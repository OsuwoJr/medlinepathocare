'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/#about', label: 'About Us' },
    { href: '/#services', label: 'Services' },
    { href: '/#providers', label: 'For Providers' },
    { href: '/#quality', label: 'Quality & Compliance' },
    { href: '/#contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-nowrap justify-between items-center min-h-20 h-20 gap-4">
          {/* Logo - never shrink, single row */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 min-w-0">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Medline Pathocare - Diagnostic Laboratory Logo"
                width={64}
                height={64}
                className="object-contain"
                priority
                sizes="64px"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-base sm:text-lg lg:text-xl font-bold text-primary-600 dark:text-primary-400 whitespace-nowrap leading-tight">
                MEDLINE PATHOCARE
              </span>
              <span className="text-xs sm:text-sm text-accent-500 dark:text-accent-400 whitespace-nowrap">
                Your trusted partner in diagnostics
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - single row, no wrap */}
          <div className="hidden md:flex items-center flex-shrink-0 gap-5 lg:gap-6 xl:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors whitespace-nowrap text-sm lg:text-base"
              >
                {item.label}
              </Link>
            ))}
            {/* Client Portal / Auth */}
            {status === 'loading' ? (
              <span className="text-sm text-gray-500 whitespace-nowrap">...</span>
            ) : session ? (
              <>
                <Link
                  href="/portal"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors whitespace-nowrap text-sm lg:text-base"
                >
                  My Results
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors whitespace-nowrap text-sm lg:text-base"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors whitespace-nowrap text-sm lg:text-base"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors whitespace-nowrap flex-shrink-0"
                >
                  Client Portal
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              {/* Client Portal / Auth (mobile) */}
              {status !== 'loading' && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                  {session ? (
                    <>
                      <Link
                        href="/portal"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 rounded-md transition-colors"
                      >
                        My Results
                      </Link>
                      <button
                        onClick={() => { setIsOpen(false); signOut({ callbackUrl: '/' }); }}
                        className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 rounded-md transition-colors"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth/signin"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 rounded-md transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/auth/signup"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors font-medium"
                      >
                        Client Portal
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
