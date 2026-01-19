import StructuredData from "@/components/StructuredData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://medlinepathocare.vercel.app';

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', url: siteUrl },
            { name: 'Services', url: `${siteUrl}/services` },
          ],
        }}
      />
      {children}
    </>
  );
}
