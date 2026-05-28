export const siteConfig = {
  name: "Tauren Pro Eventos",
  title: "Tauren Pro Eventos | Producción audiovisual y eventos corporativos",
  description:
    "Tauren Pro Eventos: planning, producción de eventos corporativos y producción audiovisual. Videos corporativos, spots digitales y experiencias de marca.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tauren.cl",
  locale: "es_CL",
  keywords: [
    "Tauren Pro Eventos",
    "producción audiovisual",
    "eventos corporativos",
    "videos corporativos",
    "planning de eventos",
    "Chile",
  ],
  ogImage: "/images/hero-bg.png",
  contactEmail: "hola@tauren.cl",
  twitter: "@tauren",
} as const;
