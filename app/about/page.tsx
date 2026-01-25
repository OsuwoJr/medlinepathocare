import type { Metadata } from "next";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://medlinepathocare.vercel.app';

export const metadata: Metadata = {
  title: "About Us - Medline Pathocare Diagnostic Laboratory",
  description: "Learn about Medline Pathocare, founded in 2025 by Sir. Granton Trevar. KMLTTB-accredited referral laboratory in Roysambu, Nairobi, specializing in endocrinology, molecular diagnostics, and advanced pathology services. Serving 20+ clinical partners.",
  keywords: "about medline pathocare, pathology lab history, diagnostic laboratory Nairobi, KMLTTB accredited lab, medical lab founder, Roysambu laboratory",
  openGraph: {
    title: "About Medline Pathocare - Leading Diagnostic Laboratory",
    description: "Founded in 2025, Medline Pathocare is a KMLTTB-accredited referral laboratory providing ultra-accurate diagnostic services in Nairobi, Kenya.",
    url: `${siteUrl}/about`,
    images: ['/og.png'],
  },
  alternates: {
    canonical: `${siteUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', url: siteUrl },
            { name: 'About Us', url: `${siteUrl}/about` },
          ],
        }}
      />
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-primary-700 dark:text-primary-400 mb-8">
            About Us
          </h1>

          <div className="space-y-10 text-gray-800 dark:text-gray-200">
            <section className="space-y-4">
              <p className="text-lg leading-relaxed">
                Medline Pathocare is a diagnostic referral laboratory based in Roysambu, Nairobi. We
                help clinicians and patients make confident decisions through accurate, timely, and
                clearly reported results.
              </p>
              <p className="leading-relaxed">
                Founded in 2025 by Sir. Granton Trevar, our lab is KMLTTB-accredited and supports
                hospitals, clinics, and health providers with advanced testing and consultative
                expertise—especially in endocrinology, molecular diagnostics, and pathology-related
                services.
              </p>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 bg-white/70 dark:bg-gray-900/40">
                <h2 className="text-2xl font-semibold text-primary-700 dark:text-primary-400 mb-3">
                  What we do
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Routine and specialized laboratory testing (referral support)</li>
                  <li>Endocrinology testing for hormonal and metabolic assessment</li>
                  <li>Molecular diagnostics workflows for targeted detection and monitoring</li>
                  <li>Consultative services to help interpret complex results and next steps</li>
                  <li>Provider support: test selection guidance and specimen handling direction</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 bg-white/70 dark:bg-gray-900/40">
                <h2 className="text-2xl font-semibold text-primary-700 dark:text-primary-400 mb-3">
                  Our quality promise
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Quality-focused processes designed to reduce pre-analytical errors</li>
                  <li>Clear reporting that supports clinical action—not just raw numbers</li>
                  <li>Confidential handling of patient information and results</li>
                  <li>Continuous improvement mindset across staff training and workflows</li>
                </ul>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 bg-white/70 dark:bg-gray-900/40 space-y-4">
              <h2 className="text-2xl font-semibold text-primary-700 dark:text-primary-400">
                For patients and providers
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Patients</h3>
                  <p className="leading-relaxed">
                    If you were referred for testing, we aim to make your experience smooth—from
                    specimen collection guidance to clear results. If you have questions, contact
                    us and we’ll direct you to the right support.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Clinicians & facilities</h3>
                  <p className="leading-relaxed">
                    We support facilities with test selection guidance, specimen requirements, and
                    reliable turnaround expectations. Use the catalog to review available tests or
                    reach out for consultative help on complex cases.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/services/test-catalog"
                  className="inline-flex items-center justify-center rounded-xl bg-primary-600 hover:bg-primary-700 text-white px-5 py-3 font-medium transition-colors"
                >
                  Browse Test Catalog
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-primary-600 text-primary-700 dark:text-primary-300 px-5 py-3 font-medium hover:bg-primary-50 dark:hover:bg-gray-900 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-primary-700 dark:text-primary-400">
                Location
              </h2>
              <p className="leading-relaxed">
                We are located in Roysambu, Nairobi, and serve 20+ clinical partners through
                referral testing and provider support.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Note: Test availability and turnaround times can vary by specimen type and referral
                logistics. For time-sensitive tests, please confirm requirements before collection.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
