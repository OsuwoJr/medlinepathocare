import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://medlinepathocare.vercel.app';

export const metadata: Metadata = {
  title: "Contact Us - Medline Pathocare Diagnostic Laboratory",
  description: "Contact Medline Pathocare in Roysambu, Nairobi, Kenya. Get in touch for diagnostic services, test inquiries, specimen collection, and provider support. KMLTTB-accredited laboratory.",
  keywords: "contact medline pathocare, pathology lab contact, diagnostic lab Nairobi, Roysambu laboratory, medical lab phone, lab email contact",
  openGraph: {
    title: "Contact Medline Pathocare - Diagnostic Laboratory",
    description: "Contact us for diagnostic services, test inquiries, and provider support. Located in Roysambu, Nairobi, Kenya.",
    url: `${siteUrl}/contact`,
    images: ['/logo.png'],
  },
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', url: siteUrl },
            { name: 'Contact', url: `${siteUrl}/contact` },
          ],
        }}
      />
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-primary-700 dark:text-primary-400 mb-8">
            Contact Us
          </h1>
          {/* Content will be added here */}
        </div>
      </div>
    </>
  );
}
