// Keep in sync with the address/hours/phone shown in components/Contact.tsx.
export default function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: "Sweet Crumbs Bakery",
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    telephone: "+1-555-123-4567",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "42 Crumble Lane",
      addressLocality: "Maplewood",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "07:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "08:00",
        closes: "15:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
