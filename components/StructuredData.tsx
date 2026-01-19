const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://medlinepathocare.vercel.app';

interface StructuredDataProps {
  type: 'Organization' | 'MedicalBusiness' | 'BreadcrumbList' | 'WebSite';
  data?: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseOrganization = {
      '@context': 'https://schema.org',
      '@type': 'MedicalBusiness',
      name: 'Medline Pathocare',
      description: 'Leading referral laboratory providing ultra-accurate, timely, and actionable diagnostic insights. Specialized in endocrinology, molecular diagnostics, and advanced pathology services.',
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      image: `${siteUrl}/logo.png`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Roysambu',
        addressRegion: 'Nairobi',
        addressCountry: 'KE',
      },
      telephone: '+254796168900',
      email: 'medlinepathocarelab@gmail.com',
      priceRange: '$$',
      medicalSpecialty: [
        'Pathology',
        'Endocrinology',
        'Molecular Diagnostics',
        'Clinical Chemistry',
        'Hematology',
        'Microbiology',
        'Immunology',
      ],
      areaServed: {
        '@type': 'City',
        name: 'Nairobi',
      },
      foundingDate: '2025',
      founder: {
        '@type': 'Person',
        name: 'Sir. Granton Trevar',
        jobTitle: 'Medical Laboratory Officer',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '50',
      },
      sameAs: [
        // Add social media links when available
        // 'https://www.facebook.com/medlinepathocare',
        // 'https://www.twitter.com/medlinepathocare',
        // 'https://www.linkedin.com/company/medlinepathocare',
      ],
    };

    switch (type) {
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Medline Pathocare',
          url: siteUrl,
          logo: `${siteUrl}/logo.png`,
          description: 'Leading referral laboratory providing diagnostic services in Nairobi, Kenya.',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Roysambu',
            addressRegion: 'Nairobi',
            addressCountry: 'KE',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+254796168900',
            contactType: 'Customer Service',
            areaServed: 'KE',
            availableLanguage: 'English',
          },
        };

      case 'MedicalBusiness':
        return baseOrganization;

      case 'BreadcrumbList':
        if (!data?.items) return null;
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data.items.map((item: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        };

      case 'WebSite':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Medline Pathocare',
          url: siteUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${siteUrl}/services/test-catalog?search={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        };

      default:
        return baseOrganization;
    }
  };

  const structuredData = getStructuredData();
  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
