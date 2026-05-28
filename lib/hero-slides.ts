export type HeroSlide = {
  id: string;
  tab: string;
  shortTab: string;
  title: string;
  services: string;
  ctaHref: string;
  image: string;
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
    image: "/images/hero-planning.jpg",
  },
  {
    id: "02",
    tab: "Producción Integral",
    shortTab: "Producción",
    title: "Producción Integral",
    services:
      "PLANIFICACIÓN | PRODUCCIÓN TÉCNICA | MOBILIARIO | CATERING | ESCENOGRAFÍA | COORDINACIÓN GENERAL",
    ctaHref: "#servicios",
    image: "/images/hero-eventos.jpg",
  },
  {
    id: "03",
    tab: "Media",
    shortTab: "Media",
    title: "Media",
    services:
      "VIDEOS CORPORATIVOS | PIEZAS INSTITUCIONALES | TESTIMONIALES | CONTENIDO PROMOCIONAL | SPOTS PUBLICITARIOS",
    ctaHref: "#servicios",
    image: "/images/hero-audiovisual.jpg",
  },
  {
    id: "04",
    tab: "Podcast",
    shortTab: "Podcast",
    title: "Podcast",
    services:
      "GRABACIÓN EN ESTUDIO | EDICIÓN Y MEZCLA | DISTRIBUCIÓN DIGITAL | SPOTIFY & YOUTUBE | PRODUCCIÓN END TO END",
    ctaHref: "#servicios",
    image: "/images/hero-podcast.jpg",
  },
];
