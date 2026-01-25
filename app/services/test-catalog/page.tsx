'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import TestCard from '@/components/TestCard';
import BookingModal from '@/components/BookingModal';
import { testCatalog } from '@/data/tests';

export default function TestCatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTestIds, setSelectedTestIds] = useState<string[]>([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const filteredTests = testCatalog.filter(test =>
    test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    test.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedTests = useMemo(() => {
    const idSet = new Set(selectedTestIds);
    return testCatalog.filter((t) => idSet.has(t.id));
  }, [selectedTestIds]);

  const selectedTotal = useMemo(() => {
    return selectedTests.reduce((sum, t) => sum + (Number.isFinite(t.price) ? t.price : 0), 0);
  }, [selectedTests]);

  const toggleSelect = (test: { id: string }) => {
    setSelectedTestIds((prev) => {
      if (prev.includes(test.id)) return prev.filter((id) => id !== test.id);
      return [...prev, test.id];
    });
  };

  const clearSelection = () => setSelectedTestIds([]);

  const selectAllShown = () => {
    setSelectedTestIds((prev) => {
      const current = new Set(prev);
      for (const t of filteredTests) current.add(t.id);
      return Array.from(current);
    });
  };

  const openBookingFor = (tests: { id: string }[]) => {
    if (!tests.length) return;
    setSelectedTestIds(Array.from(new Set(tests.map((t) => t.id))));
    setIsBookingModalOpen(true);
  };

  return (
    <main className="min-h-screen py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-primary-700 dark:text-primary-400 mb-4">
            Test Catalog
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Detailed, searchable list of all available tests, including test format, specimen collection requirements, handling procedures, and turnaround times (TAT).
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search tests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </header>

        {/* Test Count */}
        <div className="mb-6 text-gray-600 dark:text-gray-400" aria-live="polite" aria-atomic="true">
          Showing {filteredTests.length} of {testCatalog.length} tests
        </div>

        {/* Selection controls */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={selectAllShown}
            className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Select all shown
          </button>
          <button
            type="button"
            onClick={clearSelection}
            disabled={selectedTestIds.length === 0}
            className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear selection
          </button>
          {selectedTestIds.length > 0 && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Selected: <span className="font-semibold text-gray-800 dark:text-gray-200">{selectedTestIds.length}</span>
            </div>
          )}
        </div>

        {/* Test Grid */}
        <section aria-label="Available diagnostic tests" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <TestCard
              key={test.id}
              test={test}
              isSelected={selectedTestIds.includes(test.id)}
              onToggleSelect={toggleSelect}
              onBook={(t) => openBookingFor([t])}
            />
          ))}
        </section>

        {filteredTests.length === 0 && (
          <div className="text-center py-12" role="status" aria-live="polite">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No tests found matching &quot;{searchQuery}&quot;
            </p>
          </div>
        )}
      </div>

      {/* Sticky "Book selected" bar */}
      {selectedTests.length > 0 && (
        <div className="fixed bottom-4 left-0 right-0 z-40 px-4">
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Selected <span className="font-semibold text-gray-900 dark:text-gray-100">{selectedTests.length}</span> test(s)
              </p>
              <p className="text-base font-semibold text-primary-700 dark:text-primary-400">
                Total: KES {selectedTotal.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={clearSelection}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-primary-600 dark:bg-primary-500 text-white hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors font-medium"
              >
                Book selected
              </button>
            </div>
          </div>
        </div>
      )}

      <BookingModal
        tests={selectedTests}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </main>
  );
}
