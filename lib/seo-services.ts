import { services } from "@/lib/services";

export type SeoServiceProfile = {
  id: string;
  anchor: string;
  name: string;
  seoTitle: string;
  headline: string;
  intro: string;
  bullets: string[];
  keywords: string[];
  serviceType: string;
};

export type SeoFaq = {
  question: string;
  answer: string;
};

export const seoServiceProfiles: SeoServiceProfile[] = [
  {
    id: "streaming",
    anchor: "streaming",
    name: "Streaming de eventos",
    seoTitle: "Streaming en vivo",
    headline: "Streaming y transmisión en vivo",
    intro:
      "Realizamos streaming profesional para eventos corporativos, congresos, seminarios, lanzamientos y conferencias. Operamos transmisiones en vivo con multicámara, audio de calidad broadcast y soporte técnico en terreno para audiencias presenciales y online.",
    bullets: [
      "Streaming en vivo para congresos y seminarios",
      "Transmisión híbrida presencial + online",
      "Multicámara, audio profesional y gráficos en vivo",
      "YouTube, LinkedIn, Zoom y plataformas corporativas",
      "Cobertura en Chile y proyectos internacionales",
    ],
    keywords: [
      "streaming en santiago",
      "contratar streaming santiago",
      "cotizar streaming eventos",
      "streaming de eventos santiago",
      "transmisión en vivo santiago",
      "streaming eventos corporativos",
      "streaming congresos chile",
      "streaming seminarios santiago",
      "transmisión en vivo eventos",
      "empresa de streaming santiago",
      "streaming lanzamientos corporativos",
      "eventos híbridos streaming chile",
    ],
    serviceType: "Streaming de eventos y transmisión en vivo",
  },
  {
    id: "produccion-integral",
    anchor: "produccion-integral",
    name: "Producción integral de eventos",
    seoTitle: "Producción de eventos",
    headline: "Producción integral de eventos corporativos",
    intro:
      "Planificamos y ejecutamos eventos corporativos de punta a punta: producción técnica, escenografía, mobiliario, catering, coordinación de proveedores y operación en terreno con un solo equipo responsable.",
    bullets: [
      "Planning y coordinación general del evento",
      "Producción técnica, iluminación y sonido",
      "Escenografía, mobiliario y ambientación",
      "Catering y logística para empresas",
      "Eventos institucionales, aniversarios y lanzamientos",
    ],
    keywords: [
      "producción de eventos santiago",
      "producción integral eventos chile",
      "eventos corporativos santiago",
      "productora de eventos santiago",
      "organización eventos empresas chile",
      "producción técnica eventos santiago",
      "empresa productora eventos santiago",
      "eventos institucionales chile",
      "coordinación eventos corporativos",
      "lanzamientos corporativos santiago",
    ],
    serviceType: "Producción integral de eventos corporativos",
  },
  {
    id: "media",
    anchor: "produccion-audiovisual",
    name: "Producción audiovisual",
    seoTitle: "Videos corporativos",
    headline: "Producción audiovisual y videos corporativos",
    intro:
      "Producimos videos corporativos, piezas institucionales, testimoniales, spots publicitarios y contenido promocional. Desde el guion y rodaje hasta la postproducción, entregamos piezas listas para web, redes y presentaciones comerciales.",
    bullets: [
      "Videos corporativos e institucionales",
      "Testimoniales, spots y contenido promocional",
      "Rodaje, dirección y postproducción",
      "Piezas para web, redes sociales y campañas",
      "Cobertura audiovisual de eventos y activaciones",
    ],
    keywords: [
      "producción audiovisual santiago",
      "videos corporativos santiago",
      "productora audiovisual chile",
      "spots publicitarios santiago",
      "videos institucionales chile",
      "productora de video santiago",
      "contenido audiovisual empresas",
      "testimoniales corporativos chile",
      "rodaje corporativo santiago",
      "postproducción video chile",
    ],
    serviceType: "Producción audiovisual corporativa",
  },
  {
    id: "diseno-web",
    anchor: "diseno-web",
    name: "Desarrollo web y apps móviles",
    seoTitle: "Desarrollo web y apps",
    headline: "Desarrollo web y apps móviles",
    intro:
      "Diseñamos y desarrollamos sitios web corporativos, landing pages, e-commerce y aplicaciones móviles a medida para iOS y Android. Creamos experiencias digitales rápidas, responsive y orientadas a convertir visitas en oportunidades comerciales.",
    bullets: [
      "Sitios corporativos y landing pages",
      "Apps móviles nativas e híbridas iOS/Android",
      "E-commerce y tiendas online",
      "UX/UI y desarrollo responsive",
      "Integración con campañas, eventos y herramientas de marca",
    ],
    keywords: [
      "diseño web santiago",
      "desarrollo web santiago",
      "desarrollo apps móviles chile",
      "apps móviles empresas chile",
      "desarrollo app ios android chile",
      "sitios corporativos chile",
      "landing pages santiago",
      "diseño web empresas chile",
      "desarrollo web corporativo",
      "e-commerce santiago",
      "diseño ux ui santiago",
      "páginas web profesionales chile",
      "agencia desarrollo web apps chile",
    ],
    serviceType: "Desarrollo web y apps móviles",
  },
];

export const seoFaqs: SeoFaq[] = [
  {
    question: "¿Dónde contratar streaming para eventos corporativos?",
    answer:
      "Tauren Pro Eventos ofrece streaming en vivo para empresas e instituciones en Chile y el extranjero. Puedes cotizar por WhatsApp indicando fecha, tipo de evento y plataformas de transmisión para recibir una propuesta a medida.",
  },
  {
    question: "¿Qué incluye la producción integral de eventos?",
    answer:
      "Incluye planificación, producción técnica, escenografía, mobiliario, catering, coordinación de proveedores y operación en terreno para eventos corporativos e institucionales.",
  },
  {
    question: "¿Ofrecen streaming para eventos corporativos?",
    answer:
      "Sí. Realizamos streaming en vivo para congresos, seminarios, lanzamientos, conferencias y eventos híbridos, con equipo técnico, multicámara y transmisión a plataformas corporativas.",
  },
  {
    question: "¿Hacen videos corporativos y producción audiovisual?",
    answer:
      "Sí. Producimos videos corporativos, piezas institucionales, testimoniales, spots publicitarios y contenido promocional con rodaje, dirección y postproducción profesional.",
  },
  {
    question: "¿Trabajan solo en Chile o también en el extranjero?",
    answer:
      "Nuestra base operativa está en Providencia, Chile. Atendemos proyectos en todo el país y también producciones internacionales según el alcance del evento o la producción.",
  },
  {
    question: "¿Puedo cotizar streaming y producción integral en un mismo evento?",
    answer:
      "Sí. Integramos streaming, producción técnica, audiovisual y coordinación general en una sola propuesta para simplificar la operación y asegurar coherencia de principio a fin.",
  },
  {
    question: "¿Desarrollan apps móviles además de sitios web?",
    answer:
      "Sí. Desarrollamos aplicaciones móviles a medida para iOS y Android, además de sitios web corporativos, landing pages y e-commerce. Integramos apps con tus eventos, campañas y herramientas de marca.",
  },
  {
    question: "¿Cómo solicito una cotización?",
    answer:
      "Puedes escribirnos por WhatsApp, correo o el formulario de contacto. Te respondemos con alcance, tiempos y presupuesto según tu evento o producción.",
  },
];

const baseKeywords = [
  "Tauren Pro Eventos",
  "Providencia",
  "Región Metropolitana",
  "Chile",
] as const;

export const allSeoKeywords = [
  ...baseKeywords,
  ...seoServiceProfiles.flatMap((profile) => profile.keywords),
];

export function getSeoProfileByServiceId(serviceId: string) {
  return seoServiceProfiles.find((profile) => profile.id === serviceId);
}

export function getServiceSchemaProfiles() {
  return services.map((service) => {
    const profile = getSeoProfileByServiceId(service.id);
    return {
      service,
      profile,
    };
  });
}
