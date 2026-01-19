import Link from 'next/link';
import { Microscope, Dna, Users, ArrowRight } from 'lucide-react';
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://medlinepathocare.vercel.app';

export const metadata: Metadata = {
  title: "Services - Comprehensive Diagnostic Testing & Pathology Services",
  description: "Comprehensive diagnostic services from routine testing to specialized molecular diagnostics. Browse our test catalog, specialized expertise in endocrinology, genetics, and consultative services for healthcare providers.",
  keywords: "diagnostic services, pathology services, test catalog, molecular diagnostics, endocrinology testing, genetic testing, consultative services, medical lab services",
  openGraph: {
    title: "Diagnostic Services - Medline Pathocare",
    description: "Comprehensive diagnostic services from routine testing to specialized molecular diagnostics. Browse our extensive test catalog.",
    url: `${siteUrl}/services`,
    images: ['/logo.png'],
  },
  alternates: {
    canonical: `${siteUrl}/services`,
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary-700 dark:text-primary-400 mb-4">
            Services & Testing Menu
          </h1>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive diagnostic services from routine testing to specialized molecular diagnostics
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Test Catalog Card */}
          <Link href="/services/test-catalog" className="group">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow h-full">
              <div className="bg-primary-100 dark:bg-primary-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Microscope className="text-primary-600 dark:text-primary-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
                Test Catalog
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Detailed, searchable list of all available tests, including test format, specimen collection requirements, handling procedures, and turnaround times (TAT).
              </p>
              <div className="flex items-center text-primary-600 dark:text-primary-400 font-semibold group-hover:translate-x-2 transition-transform">
                View Catalog <ArrowRight className="ml-2" size={20} />
              </div>
            </div>
          </Link>

          {/* Specialized Expertise Card */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg h-full">
            <div className="bg-primary-100 dark:bg-primary-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Dna className="text-primary-600 dark:text-primary-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Specialized Expertise
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Highlighting specific areas of specialization including genetic testing, toxicology, molecular diagnostics, and how these services stand out.
            </p>
          </div>

          {/* Consultative Services Card */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg h-full">
            <div className="bg-primary-100 dark:bg-primary-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Users className="text-primary-600 dark:text-primary-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Consultative Services
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Supporting providers with test selection and result interpretation to ensure optimal patient care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
