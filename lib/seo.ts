import {
  allSeoKeywords,
  getServiceSchemaProfiles,
  seoFaqs,
  seoServiceProfiles,
} from "@/lib/seo-services";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";

export { allSeoKeywords };

export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: getAbsoluteUrl(siteConfig.logo),
    image: getAbsoluteUrl(siteConfig.logo),
    email: siteConfig.contactEmail,
    telephone: siteConfig.contactPhoneTel,
    description: siteConfig.description,
    knowsAbout: seoServiceProfiles.map((profile) => profile.serviceType),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Providencia 1650",
      addressLocality: siteConfig.contactLocality,
      addressRegion: siteConfig.contactRegion,
      addressCountry: siteConfig.contactCountry,
    },
    areaServed: siteConfig.areaServed.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
    sameAs: [siteConfig.instagram, siteConfig.linkedin],
  };
}

export function buildServiceSchemas() {
  return getServiceSchemaProfiles()
    .filter((entry) => entry.profile)
    .map(({ service, profile }) => ({
      "@type": "Service",
      "@id": `${siteConfig.url}#service-${service.id}`,
      name: profile!.name,
      serviceType: profile!.serviceType,
      description: profile!.intro,
      url: `${siteConfig.url}#${profile!.anchor}`,
      provider: { "@id": `${siteConfig.url}#organization` },
      areaServed: [
        { "@type": "Country", name: "Chile" },
        { "@type": "AdministrativeArea", name: "Internacional" },
      ],
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        areaServed: { "@type": "Country", name: "Chile" },
      },
    }));
}

export function buildLocalBusinessSchema() {
  return {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${siteConfig.url}#localbusiness`,
    name: siteConfig.name,
    url: siteConfig.url,
    image: getAbsoluteUrl(siteConfig.logo),
    telephone: siteConfig.contactPhoneTel,
    email: siteConfig.contactEmail,
    description: siteConfig.description,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Providencia 1650",
      addressLocality: siteConfig.contactLocality,
      addressRegion: siteConfig.contactRegion,
      addressCountry: siteConfig.contactCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: siteConfig.areaServed.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
    parentOrganization: { "@id": `${siteConfig.url}#organization` },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios Tauren Pro Eventos",
      itemListElement: seoServiceProfiles.map((profile, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@id": `${siteConfig.url}#service-${profile.id}` },
      })),
    },
  };
}

export function buildWebsiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${siteConfig.url}#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.locale,
    publisher: { "@id": `${siteConfig.url}#organization` },
  };
}

export function buildWebPageSchema() {
  return {
    "@type": "WebPage",
    "@id": `${siteConfig.url}#webpage`,
    name: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    isPartOf: { "@id": `${siteConfig.url}#website` },
    about: { "@id": `${siteConfig.url}#localbusiness` },
    inLanguage: siteConfig.locale,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: seoServiceProfiles.map((profile, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: profile.name,
        url: `${siteConfig.url}#${profile.anchor}`,
      })),
    },
  };
}

export function buildFaqSchema() {
  return {
    "@type": "FAQPage",
    "@id": `${siteConfig.url}#faq`,
    mainEntity: seoFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      buildLocalBusinessSchema(),
      buildWebsiteSchema(),
      buildWebPageSchema(),
      buildFaqSchema(),
      ...buildServiceSchemas(),
    ],
  };
}
