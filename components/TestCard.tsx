'use client';

import Image from 'next/image';
import { Calendar } from 'lucide-react';

interface Test {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  additionalInfo?: string;
  tat?: string;
  requirements?: string;
}

interface TestCardProps {
  test: Test;
  isSelected?: boolean;
  onToggleSelect?: (test: Test) => void;
  onBook?: (test: Test) => void;
}

export default function TestCard({ test, isSelected = false, onToggleSelect, onBook }: TestCardProps) {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col h-full relative">
        {/* Image */}
        <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700">
          {test.image ? (
            <Image
              src={test.image}
              alt={`${test.title} - Diagnostic test image at Medline Pathocare`}
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary-100 dark:bg-primary-900/30">
              <div className="text-primary-600 dark:text-primary-400 text-4xl font-bold">
                {test.title.charAt(0)}
              </div>
            </div>
          )}

          {/* Multi-select checkbox */}
          {onToggleSelect && (
            <div className="absolute top-3 right-3">
              <label className="inline-flex items-center gap-2 rounded-full bg-white/90 dark:bg-gray-900/80 px-3 py-1.5 shadow-sm ring-1 ring-black/5 dark:ring-white/10 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggleSelect(test)}
                  aria-label={`Select ${test.title}`}
                  className="h-4 w-4"
                />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Select</span>
              </label>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-primary-700 dark:text-primary-400 mb-2 line-clamp-2">
            {test.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3 flex-grow">
            {test.description}
          </p>

          {/* Additional Info */}
          {(test.tat || test.requirements || test.additionalInfo) && (
            <div className="mb-3 space-y-1">
              {test.tat && (
                <p className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                  TAT: {test.tat}
                </p>
              )}
              {test.requirements && (
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  ⚠️ {test.requirements}
                </p>
              )}
              {test.additionalInfo && (
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                  {test.additionalInfo}
                </p>
              )}
            </div>
          )}
          
          {/* Price and Action */}
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xl font-bold text-primary-600 dark:text-primary-400">
                KES {test.price.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <button
              onClick={() => onBook?.(test)}
              className="w-full px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Calendar size={18} />
              Book Test
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
