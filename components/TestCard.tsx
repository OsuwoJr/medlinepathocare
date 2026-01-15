'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import BookingModal from './BookingModal';

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
}

export default function TestCard({ test }: TestCardProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col h-full">
        {/* Image */}
        <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700">
          {test.image ? (
            <Image
              src={test.image}
              alt={test.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary-100 dark:bg-primary-900/30">
              <div className="text-primary-600 dark:text-primary-400 text-4xl font-bold">
                {test.title.charAt(0)}
              </div>
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
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Calendar size={18} />
              Book Test
            </button>
          </div>
        </div>
      </div>

      <BookingModal
        test={test}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
