import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://medlinepathocare.vercel.app';

export const metadata: Metadata = {
  title: "Test Catalog - Complete List of Diagnostic Tests & Medical Lab Services",
  description: "Browse our comprehensive test catalog with 55+ diagnostic tests including blood tests, hormone testing, molecular diagnostics, infectious disease screening, and specialized pathology services. View pricing, TAT, and specimen requirements.",
  keywords: "test catalog, diagnostic tests, medical lab tests, blood tests, pathology tests, hormone testing, molecular diagnostics, test prices, lab test catalog, diagnostic services catalog",
  openGraph: {
    title: "Test Catalog - Medline Pathocare Diagnostic Tests",
    description: "Comprehensive catalog of 55+ diagnostic tests including pricing, turnaround times, and specimen requirements.",
    url: `${siteUrl}/services/test-catalog`,
    images: ['/logo.png'],
  },
  alternates: {
    canonical: `${siteUrl}/services/test-catalog`,
  },
};

export default function TestCatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
