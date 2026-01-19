import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import StructuredData from "@/components/StructuredData";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://medlinepathocare.vercel.app';
const siteName = 'Medline Pathocare';
const defaultTitle = 'Medline Pathocare - Your Trusted Partner in Diagnostics';
const defaultDescription = 'Leading referral laboratory providing ultra-accurate, timely, and actionable diagnostic insights. Specialized in endocrinology, molecular diagnostics, and advanced pathology services. Accredited by KMLTTB, serving Nairobi, Kenya.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    'pathology laboratory',
    'diagnostic services',
    'medical testing',
    'laboratory services',
    'Nairobi pathology lab',
    'Kenya diagnostics',
    'endocrinology testing',
    'molecular diagnostics',
    'pathology services',
    'clinical laboratory',
    'medical lab tests',
    'blood tests',
    'KMLTTB accredited',
    'Roysambu laboratory',
    'referral laboratory',
    'genetic testing',
    'infectious disease testing',
    'cancer screening',
    'hormone testing',
    'biochemistry tests',
    'hematology tests',
    'microbiology tests',
    'homecare services',
    'specimen collection',
    'test catalog',
    'diagnostic insights',
  ],
  authors: [{ name: 'Medline Pathocare', url: siteUrl }],
  creator: 'Medline Pathocare',
  publisher: 'Medline Pathocare',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: siteUrl,
    siteName: siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Medline Pathocare - Diagnostic Laboratory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: ['/logo.png'],
    creator: '@medlinepathocare',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'VsUzPHt8swBIepWVPXWennwT7Dgd67Na6dzYl3QuWFs',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'medical',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData type="Organization" />
        <StructuredData type="WebSite" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
