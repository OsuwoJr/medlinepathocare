import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://medlinepathocare.vercel.app';
const siteName = 'Medline Pathocare';

export function generateMetadata({
  title,
  description,
  keywords,
  path,
  image,
}: {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
}): Metadata {
  const url = path ? `${siteUrl}${path}` : siteUrl;
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords || [],
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      images: image ? [image] : ['/logo.png'],
      locale: 'en_KE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: image ? [image] : ['/logo.png'],
    },
    alternates: {
      canonical: url,
    },
  };
}
