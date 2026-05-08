import { HOSPITAL } from "@/lib/hospital";
import { absoluteUrl, SITE } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Hospital + LocalBusiness schema for the brand. Render once per page,
 *  ideally in the root locale layout so every page carries it. */
export function HospitalJsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": ["Hospital", "MedicalOrganization", "LocalBusiness"],
    "@id": `${SITE.url}/#hospital`,
    name: HOSPITAL.name,
    url: SITE.url,
    logo: absoluteUrl("/logo.png"),
    image: [
      absoluteUrl("/images/doctor-portrait.jpg"),
      absoluteUrl("/images/nurse-portrait.jpg"),
      absoluteUrl("/images/about-staff-team.jpg"),
    ],
    foundingDate: HOSPITAL.founded,
    founder: {
      "@type": "Person",
      name: HOSPITAL.founder,
      honorificSuffix: HOSPITAL.founderCredentials,
    },
    slogan:
      locale === "fr" ? "Service du Cœur" : "Service of the Heart",
    medicalSpecialty: [
      "Obstetrics",
      "Gynecology",
      "Surgery",
      "Pediatrics",
      "Emergency",
      "Dentistry",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Cibec Entrance (Near Tradex), behind Mother Julia Primary School",
      addressLocality: "Bonaberi-Douala",
      addressRegion: "Littoral",
      addressCountry: "CM",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 4.082,
      longitude: 9.692,
    },
    telephone: HOSPITAL.phones[0],
    email: HOSPITAL.email,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs: [HOSPITAL.social.facebook, HOSPITAL.social.whatsapp],
    availableLanguage: ["en", "fr"],
  };
  return <Script data={data} />;
}

/** WebSite schema (helps Google understand site structure). */
export function WebSiteJsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: HOSPITAL.name,
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
    publisher: { "@id": `${SITE.url}/#hospital` },
  };
  return <Script data={data} />;
}

export type Crumb = { name: string; path: string };

/** BreadcrumbList — pass an ordered list. Last crumb is the current page. */
export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
  return <Script data={data} />;
}

/** Article schema for blog posts. */
export function ArticleJsonLd({
  url,
  headline,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
}: {
  url: string;
  headline: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(url) },
    headline,
    description,
    image: image ? [absoluteUrl(image)] : undefined,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: authorName
      ? { "@type": "Person", name: authorName }
      : { "@type": "Organization", "@id": `${SITE.url}/#hospital` },
    publisher: { "@id": `${SITE.url}/#hospital` },
  };
  return <Script data={data} />;
}

/** MedicalProcedure / Service schema for individual service pages. */
export function MedicalServiceJsonLd({
  name,
  description,
  url,
  image,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name,
    description,
    url: absoluteUrl(url),
    image: image ? absoluteUrl(image) : undefined,
    provider: { "@id": `${SITE.url}/#hospital` },
  };
  return <Script data={data} />;
}
