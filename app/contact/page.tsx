import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://medlinepathocare.vercel.app';
const phoneNumber = '+254796168900';
const email = 'medlinepathocarelab@gmail.com';

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
      <div className="min-h-screen py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Contact & Support
            </h1>
            <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Get in touch with us for diagnostic services, test inquiries, specimen collection, and provider support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {/* Phone */}
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Phone className="text-primary-600 dark:text-primary-400 mx-auto mb-4" size={32} />
              <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-400 mb-2">
                Phone
              </h3>
              <Link 
                href={`tel:${phoneNumber}`}
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium block mb-2"
              >
                {phoneNumber}
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Call us for immediate assistance
              </p>
            </div>

            {/* Email */}
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Mail className="text-primary-600 dark:text-primary-400 mx-auto mb-4" size={32} />
              <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-400 mb-2">
                Email
              </h3>
              <Link 
                href={`mailto:${email}`}
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium block mb-2 break-all"
              >
                {email}
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Send us an email with your inquiries
              </p>
            </div>

            {/* Location */}
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <MapPin className="text-primary-600 dark:text-primary-400 mx-auto mb-4" size={32} />
              <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-400 mb-2">
                Location
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                Roysambu, Nairobi, Kenya
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                KMLTTB Accredited Laboratory
              </p>
            </div>
          </div>

          {/* WhatsApp Section */}
          <div className="max-w-2xl mx-auto text-center p-8 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
            <MessageCircle className="text-primary-600 dark:text-primary-400 mx-auto mb-4" size={40} />
            <h3 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              WhatsApp Us
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Chat with us on WhatsApp for quick responses and support
            </p>
            <Link
              href={`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
