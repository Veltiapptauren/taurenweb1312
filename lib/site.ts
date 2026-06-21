import { allSeoKeywords } from "./seo-services";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://taurenproeventos.cl";

export const siteConfig = {
  name: "Tauren Pro Eventos",
  title: "Streaming y Eventos Corporativos | Tauren Pro Eventos",
  description:
    "Soluciones tecnológicas para eventos corporativos: streaming en vivo, producción audiovisual, desarrollo web, apps móviles y experiencias híbridas. Cotiza streaming, eventos, video o desarrollo digital con Tauren Pro Eventos.",
  url: rawSiteUrl.replace(/\/$/, ""),
  locale: "es_CL",
  keywords: [...allSeoKeywords],
  logo: "/images/logo-tauren-pro-eventos.png",
  ogImage: "/opengraph-image",
  contactEmail: "contacto@taurenproeventos.cl",
  contactPhone: "+56 9 8501 3727",
  contactPhoneTel: "+56985013727",
  contactWhatsApp: "56985013727",
  contactAddress: "Av. Providencia 1650, Providencia, Santiago, Chile",
  contactLocality: "Providencia",
  contactRegion: "Región Metropolitana",
  contactCountry: "CL",
  geo: {
    latitude: -33.4264,
    longitude: -70.6108,
  },
  areaServed: ["Chile", "Latinoamérica", "Internacional"],
  whatsappMessage: "Hola Tauren Pro Eventos, quiero cotizar un proyecto",
  twitter: "@tauren",
  instagram: "https://www.instagram.com/",
  linkedin: "https://www.linkedin.com/",
} as const;

export function getAbsoluteUrl(path: string = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return path ? `${siteConfig.url}${normalizedPath}` : siteConfig.url;
}

export function getWhatsAppUrl(
  message: string = siteConfig.whatsappMessage
) {
  return `https://wa.me/${siteConfig.contactWhatsApp}?text=${encodeURIComponent(message)}`;
}
