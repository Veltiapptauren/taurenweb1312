export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
};

export const services: Service[] = [
  {
    id: "planning",
    number: "01",
    title: "Planning de Eventos",
    description:
      "Conceptualización, logística y coordinación integral para eventos de alto impacto.",
    image: "/images/hero-planning.jpg",
  },
  {
    id: "eventos",
    number: "02",
    title: "Producción de Eventos Corporativos",
    description:
      "Lanzamientos, conferencias, activaciones y experiencias de marca memorables.",
    image: "/images/hero-eventos.jpg",
  },
  {
    id: "audiovisual",
    number: "03",
    title: "Producción Audiovisual",
    description:
      "Videos corporativos, institucionales, spots digitales y cobertura multicámara.",
    image: "/images/hero-audiovisual.jpg",
  },
  {
    id: "podcast",
    number: "04",
    title: "Podcast",
    description:
      "Grabación, edición, distribución y producción end to end para Spotify y YouTube.",
    image: "/images/hero-podcast.jpg",
  },
];
