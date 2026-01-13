import Image from 'next/image';
import { Plus } from 'lucide-react';

interface Test {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: string;
}

interface TestCardProps {
  test: Test;
}

export default function TestCard({ test }: TestCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-200 dark:border-gray-700">
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
      <div className="p-4">
        <h3 className="text-lg font-bold text-primary-700 dark:text-primary-400 mb-2 line-clamp-2">
          {test.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {test.description}
        </p>
        
        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-primary-600 dark:text-primary-400">
            KES {test.price.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
          </div>
          <button
            className="w-10 h-10 rounded-lg border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-primary-600 dark:hover:bg-primary-400 hover:text-white dark:hover:text-white transition-colors flex items-center justify-center"
            aria-label={`Add ${test.title} to selection`}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
