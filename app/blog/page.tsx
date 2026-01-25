import type { Metadata } from "next";
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
          {/* Content will be added here */}
        </div>
      </div>
    </>
  );
}
