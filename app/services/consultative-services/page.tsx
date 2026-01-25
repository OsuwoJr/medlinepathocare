import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import ConsultativeServicesClient from './ConsultativeServicesClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://medlinepathocare.vercel.app';

export const metadata: Metadata = {
  title: 'Consultative Services - Medline Pathocare',
  description: 'Consultative diagnostic support for healthcare providers: test selection guidance, result interpretation, and clinical consultation. Fast, expert help from Medline Pathocare in Nairobi, Kenya.',
  alternates: {
    canonical: `${siteUrl}/services/consultative-services`,
  },
  openGraph: {
    title: 'Consultative Services - Medline Pathocare',
    description: 'Expert support for test selection, result interpretation, and optimal patient care.',
    url: `${siteUrl}/services/consultative-services`,
    images: ['/og.png'],
  },
};

export default function ConsultativeServicesPage() {
  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', url: siteUrl },
            { name: 'Services', url: `${siteUrl}/services` },
            { name: 'Consultative Services', url: `${siteUrl}/services/consultative-services` },
          ],
        }}
      />
      <ConsultativeServicesClient />
    </>
  );
}
