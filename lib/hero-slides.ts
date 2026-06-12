export type HeroSlide = {
  id: string;
  tab: string;
  shortTab: string;
  title: string;
  services: string;
  ctaHref: string;
  video?: string;
  images: string[];
};

export const heroSlides: HeroSlide[] = [
  {
    id: "01",
    tab: "Streaming",
    shortTab: "Streaming",
    title: "Streaming",
    services:
      "EVENTOS CORPORATIVOS | CONGRESOS | SEMINARIOS | LANZAMIENTOS INSTITUCIONALES | CONFERENCIAS",
    ctaHref: "#servicios",
    video: "/videos/hero/streaming.mp4",
    images: [
      "/images/servicios/streaming/01.png",
      "/images/servicios/streaming/02.png",
      "/images/servicios/streaming/03.png",
      "/images/servicios/streaming/04.png",
    ],
  },
  {
    id: "02",
    tab: "Producción Integral",
    shortTab: "Producción",
    title: "Producción Integral",
    services:
      "PLANIFICACIÓN | PRODUCCIÓN TÉCNICA | MOBILIARIO | CATERING | ESCENOGRAFÍA | COORDINACIÓN GENERAL",
    ctaHref: "#servicios",
    video: "/videos/hero/produccion-integral.mp4",
    images: [
      "/images/servicios/produccion-integral/01.jpg",
      "/images/servicios/produccion-integral/02.jpg",
      "/images/servicios/produccion-integral/03.jpg",
      "/images/servicios/produccion-integral/04.jpg",
    ],
  },
  {
    id: "03",
    tab: "Media",
    shortTab: "Media",
    title: "Media",
    services:
      "VIDEOS CORPORATIVOS | PIEZAS INSTITUCIONALES | TESTIMONIALES | CONTENIDO PROMOCIONAL | SPOTS PUBLICITARIOS",
    ctaHref: "#servicios",
    video: "/videos/hero/media.mp4",
    images: [
      "/images/servicios/media/01.png",
      "/images/servicios/media/02.png",
      "/images/servicios/media/03.png",
      "/images/servicios/media/04.jpg",
    ],
  },
  {
    id: "04",
    tab: "Diseño Web",
    shortTab: "Web",
    title: "Diseño y Desarrollo Web",
    services:
      "APPS Y WEBS A MEDIDA | SITIOS CORPORATIVOS | LANDING PAGES | E-COMMERCE | UX/UI | DESARROLLO RESPONSIVE",
    ctaHref: "#servicios",
    images: [
      "/images/servicios/diseno-web/01.png",
      "/images/servicios/diseno-web/02.jpg",
      "/images/servicios/diseno-web/03.jpg",
      "/images/servicios/diseno-web/04.jpg",
    ],
  },
];
