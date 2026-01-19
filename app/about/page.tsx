import type { Metadata } from "next";
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
    images: ['/logo.png'],
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
          {/* Content will be added here */}
        </div>
      </div>
    </>
  );
}
