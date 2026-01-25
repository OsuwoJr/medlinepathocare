import type { Metadata } from "next";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://medlinepathocare.vercel.app';

export const metadata: Metadata = {
  title: "Blog & News - Medical Laboratory Updates & Health Information",
  description: "Stay updated with the latest news, health information, and updates from Medline Pathocare. Learn about new diagnostic tests, health tips, and laboratory innovations.",
  keywords: "medical lab blog, pathology news, diagnostic updates, health information, laboratory news, medical testing updates",
  openGraph: {
    title: "Blog & News - Medline Pathocare",
    description: "Latest news, health information, and updates from Medline Pathocare diagnostic laboratory.",
    url: `${siteUrl}/blog`,
    images: ['/og.png'],
  },
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
};

export default function BlogPage() {
  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', url: siteUrl },
            { name: 'Blog & News', url: `${siteUrl}/blog` },
          ],
        }}
      />
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-primary-700 dark:text-primary-400 mb-8">
            Blog & News
          </h1>

          <div className="space-y-10 text-gray-800 dark:text-gray-200">
            <section className="space-y-4">
              <p className="text-lg leading-relaxed">
                This page is our health information and laboratory updates hub. We publish practical
                guides to help patients and clinicians understand common tests, specimen
                requirements, and how to interpret results in context.
              </p>
              <p className="leading-relaxed">
                As we roll out individual blog articles, you can still use the sections below for
                quick, reliable orientation on frequent questions we see in routine and specialized
                testing.
              </p>
            </section>

            <section className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 bg-white/70 dark:bg-gray-900/40">
                <h2 className="text-xl font-semibold text-primary-700 dark:text-primary-400 mb-2">
                  Patient guides
                </h2>
                <p className="text-sm leading-relaxed">
                  What to expect, how to prepare, and why certain tests are ordered.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 bg-white/70 dark:bg-gray-900/40">
                <h2 className="text-xl font-semibold text-primary-700 dark:text-primary-400 mb-2">
                  Provider updates
                </h2>
                <p className="text-sm leading-relaxed">
                  Specimen requirements, handling notes, and workflow improvements.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 bg-white/70 dark:bg-gray-900/40">
                <h2 className="text-xl font-semibold text-primary-700 dark:text-primary-400 mb-2">
                  Lab news
                </h2>
                <p className="text-sm leading-relaxed">
                  New test availability, service changes, and quality initiatives.
                </p>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 bg-white/70 dark:bg-gray-900/40 space-y-6">
              <h2 className="text-2xl font-semibold text-primary-700 dark:text-primary-400">
                Quick guides (start here)
              </h2>

              <article className="space-y-2">
                <h3 className="text-lg font-semibold">
                  Understanding turnaround time (TAT)
                </h3>
                <p className="leading-relaxed">
                  Turnaround time is influenced by specimen type, transport conditions, batching,
                  and the complexity of the method used. If a test is urgent, confirm specimen
                  requirements and cutoff times before collection to avoid delays.
                </p>
              </article>

              <article className="space-y-2">
                <h3 className="text-lg font-semibold">
                  Why specimen handling matters
                </h3>
                <p className="leading-relaxed">
                  Many “unexpected” results come from pre-analytical issues such as incorrect tubes,
                  inadequate volume, delayed transport, or temperature exposure. Following the right
                  collection and handling guide helps preserve analyte stability and improves
                  accuracy.
                </p>
              </article>

              <article className="space-y-2">
                <h3 className="text-lg font-semibold">
                  How to choose the right test
                </h3>
                <p className="leading-relaxed">
                  Where multiple tests can answer a clinical question, selection should consider
                  sensitivity/specificity, disease phase, and prior therapy. If you’re unsure, our
                  team can advise on the most appropriate panel or confirmatory pathway.
                </p>
              </article>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/services/test-catalog"
                  className="inline-flex items-center justify-center rounded-xl bg-primary-600 hover:bg-primary-700 text-white px-5 py-3 font-medium transition-colors"
                >
                  Explore Tests
                </Link>
                <Link
                  href="/services/consultative-services"
                  className="inline-flex items-center justify-center rounded-xl border border-primary-600 text-primary-700 dark:text-primary-300 px-5 py-3 font-medium hover:bg-primary-50 dark:hover:bg-gray-900 transition-colors"
                >
                  Consultative Services
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 dark:border-gray-700 px-5 py-3 font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-primary-700 dark:text-primary-400">
                Medical disclaimer
              </h2>
              <p className="leading-relaxed">
                Information on this page is for general education and does not replace medical
                advice. Always consult a qualified clinician for diagnosis and treatment decisions.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
