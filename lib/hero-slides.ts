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
    tab: "Planning de Eventos",
    shortTab: "Planning",
    title: "Planning de Eventos",
    services:
      "CONCEPTUALIZACIÓN | LOGÍSTICA | COORDINACIÓN | PRODUCCIÓN INTEGRAL | STAFF | OPERACIÓN EN TERRENO",
    ctaHref: "#servicios",
    image: "/images/hero-planning.jpg",
  },
  {
    id: "02",
    tab: "Producción de Eventos Corporativos",
    shortTab: "Eventos",
    title: "Producción de Eventos Corporativos",
    services:
      "LANZAMIENTOS | CONFERENCIAS | ACTIVACIONES | INAUGURACIONES | EVENTOS INTERNOS | EXPERIENCIAS DE MARCA",
    ctaHref: "#servicios",
    image: "/images/hero-eventos.jpg",
  },
  {
    id: "03",
    tab: "Producción Audiovisual",
    shortTab: "Audiovisual",
    title: "Producción Audiovisual",
    services:
      "VIDEOS CORPORATIVOS | PIEZAS INSTITUCIONALES | TESTIMONIALES | CONTENIDO PROMOCIONAL | SPOTS DIGITALES | ENTREVISTAS",
    ctaHref: "#servicios",
    image: "/images/hero-audiovisual.jpg",
  },
  {
    id: "04",
    tab: "Podcast",
    shortTab: "Podcast",
    title: "Producción Podcast",
    services:
      "GRABACIÓN EN ESTUDIO | EDICIÓN Y MEZCLA | VOZ EN OFF | DISTRIBUCIÓN DIGITAL | SPOTIFY & YOUTUBE | PRODUCCIÓN END TO END",
    ctaHref: "#servicios",
    image: "/images/hero-podcast.jpg",
  },
];
