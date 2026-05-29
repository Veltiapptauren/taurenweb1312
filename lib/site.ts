export const siteConfig = {
  name: "Tauren Pro Eventos",
  title: "Tauren Pro Eventos | Producción audiovisual y eventos corporativos",
  description:
    "Tauren Pro Eventos: planning, producción de eventos corporativos y producción audiovisual. Videos corporativos, spots digitales y experiencias de marca.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://taurenproeventos.cl",
  locale: "es_CL",
  keywords: [
    "Tauren Pro Eventos",
    "producción audiovisual",
    "eventos corporativos",
    "videos corporativos",
    "planning de eventos",
    "Chile",
  ],
  logo: "/images/logo-tauren-pro-eventos.png",
  ogImage: "/images/hero-bg.png",
  contactEmail: "contacto@taurenproeventos.cl",
  contactPhone: "+56 9 8501 3727",
  contactPhoneTel: "+56985013727",
  contactWhatsApp: "56985013727",
  contactAddress: "Av. Providencia 1650, Providencia",
  whatsappMessage: "Hola Tauren Pro Eventos, quiero cotizar un proyecto",
  twitter: "@tauren",
  instagram: "https://www.instagram.com/",
  linkedin: "https://www.linkedin.com/",
} as const;

export function getWhatsAppUrl(
  message: string = siteConfig.whatsappMessage
) {
  return `https://wa.me/${siteConfig.contactWhatsApp}?text=${encodeURIComponent(message)}`;
}
