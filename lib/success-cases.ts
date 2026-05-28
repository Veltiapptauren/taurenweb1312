export type SuccessCase = {
  id: string;
  title: string;
  subtitle: string;
  company: string;
  image: string;
  gridClass: string;
  description: string;
  services: string[];
  year: string;
};

export const successCases: SuccessCase[] = [
  {
    id: "proteccion-ninez",
    title: "Producción Integral & Transmisión Institucional",
    subtitle: "Servicio de Protección a la Niñez",
    company: "Gobierno de Chile",
    image: "/images/cases/case-1.jpg",
    gridClass: "min-h-[220px] sm:col-start-1 sm:row-start-1 sm:row-span-2",
    description:
      "Cobertura integral de seminario institucional con transmisión en vivo, registro multicámara y piezas de difusión para canales oficiales.",
    services: ["Transmisión streaming", "Producción multicámara", "Postproducción"],
    year: "2025",
  },
  {
    id: "mineria-corporativa",
    title: "Lanzamiento Corporativo",
    subtitle: "Minería & Energía",
    company: "Empresa Minera del Norte",
    image: "/images/cases/case-2.jpg",
    gridClass: "min-h-[180px] sm:col-start-2 sm:row-start-1",
    description:
      "Evento de lanzamiento con escenografía, streaming para sedes remotas y cobertura fotográfica para prensa y redes.",
    services: ["Evento corporativo", "Streaming", "Fotografía oficial"],
    year: "2024",
  },
  {
    id: "banco-innovacion",
    title: "Cumbre de Innovación",
    subtitle: "Sector Financiero",
    company: "Banco Regional",
    image: "/images/cases/case-3.jpg",
    gridClass: "min-h-[180px] sm:col-start-3 sm:row-start-1",
    description:
      "Producción de conferencia con paneles, entrevistas a ejecutivos y entrega de highlights en 48 horas.",
    services: ["Conferencia", "Entrevistas", "Highlights"],
    year: "2024",
  },
  {
    id: "retail-expansion",
    title: "Activación de Marca",
    subtitle: "Retail Nacional",
    company: "Cadena Retail X",
    image: "/images/cases/case-4.jpg",
    gridClass: "min-h-[180px] sm:col-start-2 sm:row-start-2",
    description:
      "Activación en mall con cobertura audiovisual, contenido para redes y reporte de asistencia para el cliente.",
    services: ["Activación", "Contenido RRSS", "Reporte KPI"],
    year: "2023",
  },
  {
    id: "universidad-aniversario",
    title: "Aniversario Institucional",
    subtitle: "Educación Superior",
    company: "Universidad Austral",
    image: "/images/cases/case-5.jpg",
    gridClass: "min-h-[180px] sm:col-start-3 sm:row-start-2",
    description:
      "Gala de aniversario con gala dinner, show en vivo, transmisión híbrida y documental de cierre de campaña.",
    services: ["Gala", "Show en vivo", "Documental"],
    year: "2023",
  },
];
