export type SuccessCaseGallery = {
  wide: string;
  left: string;
  right: string;
  smallLeft: string;
  smallRight: string;
  device?: string;
};

export type SuccessCase = {
  id: string;
  title: string;
  subtitle: string;
  company: string;
  image: string;
  description: string;
  services: string[];
  year: string;
  indexTotal: number;
  client: string;
  location: string;
  stats: { value: string; label: string }[];
  desafio: string;
  solucion: string;
  reflexiones: string;
  gallery: SuccessCaseGallery;
  titleLines?: string[];
};

function galleryFromHero(image: string): SuccessCaseGallery {
  return {
    wide: image,
    left: image,
    right: image,
    smallLeft: image,
    smallRight: image,
    device: image,
  };
}

export const successCases: SuccessCase[] = [
  {
    id: "proteccion-ninez",
    title: "Seminario de la Protección a la Reparación",
    titleLines: ["Seminario de la", "Protección a la Reparación"],
    subtitle:
      "Conectar lo presencial con lo digital, sin perder una sola palabra.",
    company: "Servicio Nacional de Protección a la Niñez y Adolescencia",
    client: "Servicio Nacional de Protección a la Niñez y Adolescencia",
    location: "Auditorio de la Fiscalía Nacional",
    image: "/images/cases/proteccion-ninez/hero.jpg",
    description:
      "El Seminario De la Protección a la Reparación fue un encuentro técnico organizado por el Servicio Nacional de Protección a la Niñez y Adolescencia para reunir a 300 especialistas en un espacio de reflexión, debate y actualización en torno a la protección de derechos de niños, niñas y adolescentes en Chile. Tauren Pro Eventos asumió la producción integral de la jornada: sonido profesional, transmisión en vivo, registro fotográfico y audiovisual, y servicio de catering para los 300 asistentes.",
    services: ["Streaming", "Sonido", "Fotografía", "Filmación", "Catering"],
    year: "2025",
    indexTotal: 5,
    stats: [
      { value: "300", label: "asistentes presenciales" },
      { value: "1500+", label: "asistentes virtuales y un chat muy activo" },
    ],
    desafio:
      "El Servicio Nacional de Protección a la Niñez y Adolescencia necesitaba llevar a cabo un seminario de alto nivel técnico con la exigencia de no dejar a nadie fuera. La audiencia era doble: 300 profesionales presentes en el Auditorio de la Fiscalía Nacional y una comunidad de especialistas conectados desde distintos puntos del país a través de internet. Coordinar ambas experiencias, garantizando la misma calidad de audio, imagen y contenido tanto en la sala como en la pantalla, requería una operación técnica precisa, equipamiento profesional y un equipo capaz de anticipar cada variable sin interrumpir el flujo de la jornada. A esto se sumaba la necesidad de gestionar el catering para 300 asistentes con la misma atención al detalle que el resto de la producción.",
    solucion:
      "Tauren Pro Eventos diseñó e implementó una producción híbrida integral para responder a las dos dimensiones del evento. Desplegamos un sistema de sonido con mesa de 16 canales y microfonía profesional que garantizó una experiencia acústica impecable en sala. Para la transmisión en vivo, operamos tres cámaras robóticas en simultáneo, cubriendo el escenario, el auditorio y los momentos de interacción con una dinámica visual ágil y sin interrupciones. En paralelo, nuestro equipo de registro fotográfico documentó cada momento de la jornada y el filmmaker estuvo presente desde el inicio para la posterior edición del video resumen del seminario. Cerramos la experiencia con un servicio de catering para los 300 asistentes, cuidando cada detalle logístico para que el equipo organizador pudiera enfocarse en el contenido.",
    reflexiones:
      "El Seminario De la Protección a la Reparación demostró que un evento institucional puede tener la precisión técnica de una producción de alto nivel sin sacrificar la calidez del encuentro humano. En una jornada que conectó lo presencial con lo digital, Tauren Pro Eventos entregó cada servicio comprometido: streaming, sonido, fotografía, filmmaking y catering, a tiempo, sin imprevistos y con la calidad que el Servicio Nacional de Protección a la Niñez y Adolescencia merecía. El resultado habló por sí solo: un cliente que confió, quedó conforme y recomendó.",
    gallery: {
      wide: "/images/cases/proteccion-ninez/wide.jpg",
      left: "/images/cases/proteccion-ninez/left.jpg",
      right: "/images/cases/proteccion-ninez/right.jpg",
      smallLeft: "/images/cases/proteccion-ninez/small-left.jpg",
      smallRight: "/images/cases/proteccion-ninez/small-right.jpg",
      device: "/images/cases/proteccion-ninez/device.jpg",
    },
  },
  {
    id: "sernatur-50",
    title: "50 Años SERNATUR",
    titleLines: ["50 Años", "SERNATUR"],
    subtitle:
      "Celebrar medio siglo de turismo en Chile con imagen, sabor y relato.",
    company: "SERNATUR",
    client: "Servicio Nacional de Turismo",
    location: "Santiago, Chile",
    image: "/images/cases/sernatur-50/hero.jpg",
    description:
      "La celebración de los 50 años de SERNATUR reunió a equipos, autoridades y colaboradores en una jornada institucional de alto valor simbólico. Tauren Pro Eventos asumió la producción integral del encuentro: registro fotográfico oficial, filmación de testimoniales, postproducción audiovisual y un servicio de catering diseñado para acompañar la experiencia con el mismo nivel de cuidado que el resto de la operación.",
    services: ["Fotografía", "Filmación", "Testimoniales", "Catering"],
    year: "2025",
    indexTotal: 5,
    stats: [
      { value: "50", label: "años de historia institucional" },
      { value: "4", label: "frentes de producción coordinados" },
    ],
    desafio:
      "SERNATUR necesitaba conmemorar cinco décadas de trayectoria con una producción que fuera a la altura del hito: una experiencia presencial impecable, material fotográfico oficial para comunicaciones y un set de testimoniales audiovisuales capaces de capturar la voz de quienes construyen el turismo en Chile. El desafío incluía operar en un entorno exterior con branding institucional, coordinar paneles y momentos protocolares, y entregar un catering de alto estándar sin que la logística restara protagonismo al contenido ni a la celebración.",
    solucion:
      "Diseñamos una operación integral en paralelo. El equipo de fotografía documentó el encuentro institucional, los paneles con branding Chile y los momentos colectivos de la jornada. En filmación, capturamos testimoniales en terreno con estabilización profesional y cerramos el proceso en postproducción con edición, grafismos y piezas listas para difusión. Complementamos la experiencia con un catering cuidado en presentación y servicio, alineado al tono de una celebración institucional de medio siglo.",
    reflexiones:
      "Los 50 años de SERNATUR demostraron que un hito institucional se construye con narrativa, precisión técnica y hospitalidad. Tauren Pro Eventos entregó fotografía, filmación, testimoniales y catering en una sola operación coherente: imagen limpia, relatos con identidad y una experiencia que honró el legado del Servicio Nacional de Turismo.",
    gallery: {
      wide: "/images/cases/sernatur-50/wide.jpg",
      left: "/images/cases/sernatur-50/left.jpg",
      right: "/images/cases/sernatur-50/right.jpg",
      smallLeft: "/images/cases/sernatur-50/small-left.jpg",
      smallRight: "/images/cases/sernatur-50/small-right.jpg",
      device: "/images/cases/sernatur-50/device.png",
    },
  },
  {
    id: "banco-innovacion",
    title: "Cumbre de Innovación",
    subtitle: "Sector Financiero",
    company: "Banco Regional",
    client: "Banco Regional",
    location: "Hotel W Santiago",
    image: "/images/cases/case-3.jpg",
    description:
      "Producción de conferencia con paneles, entrevistas a ejecutivos y entrega de highlights en 48 horas. Tauren Pro Eventos gestionó la operación técnica completa: sonido, iluminación, registro multicámara, entrevistas en backstage y edición acelerada de piezas para comunicación interna y externa.",
    services: ["Conferencia", "Entrevistas", "Highlights"],
    year: "2024",
    indexTotal: 5,
    stats: [
      { value: "280", label: "ejecutivos y invitados" },
      { value: "48", label: "horas para entrega de highlights" },
    ],
    desafio:
      "El banco requería una cumbre de innovación con múltiples paneles, entrevistas a líderes del sector y contenido audiovisual listo en un plazo exigente. La operación debía mantener estándares corporativos de imagen y sonido mientras se capturaban momentos espontáneos en backstage y en sala.",
    solucion:
      "Implementamos un esquema de producción con tres cámaras en sala, estación de entrevistas dedicada y editor en sitio para acelerar la postproducción. Definimos un pipeline de entrega con piezas cortas para redes y un resumen ejecutivo entregado en 48 horas.",
    reflexiones:
      "La cumbre demostró que la velocidad de entrega no tiene por qué comprometer la calidad. El cliente recibió material listo para difundir mientras el evento aún generaba conversación en el sector financiero.",
    gallery: galleryFromHero("/images/cases/case-3.jpg"),
  },
  {
    id: "retail-expansion",
    title: "Activación de Marca",
    subtitle: "Retail Nacional",
    company: "Cadena Retail X",
    client: "Cadena Retail X",
    location: "Mall Plaza Vespucio, Santiago",
    image: "/images/cases/case-4.jpg",
    description:
      "Activación en mall con cobertura audiovisual, contenido para redes y reporte de asistencia para el cliente. Tauren Pro Eventos produjo la experiencia en terreno: montaje de activación, registro fotográfico y audiovisual, piezas para Instagram y TikTok, y consolidación de métricas de asistencia y engagement.",
    services: ["Activación", "Contenido RRSS", "Reporte KPI"],
    year: "2023",
    indexTotal: 5,
    stats: [
      { value: "1200+", label: "personas impactadas en el mall" },
      { value: "15", label: "piezas de contenido entregadas" },
    ],
    desafio:
      "La cadena retail necesitaba una activación de alto tráfico en un mall con restricciones de horario, generación de contenido en tiempo real para redes y un reporte cuantitativo de resultados para justificar la inversión comercial.",
    solucion:
      "Montamos la activación con flujo optimizado para captura continua, equipo de contenido dedicado a redes y un sistema de conteo de asistencia integrado al cierre del evento. Entregamos un reporte con KPIs, material editado y fotografías listas para campaña.",
    reflexiones:
      "La activación mostró cómo combinar experiencia presencial y contenido digital en una sola operación. El cliente obtuvo visibilidad inmediata en redes y datos concretos para medir el retorno de la activación.",
    gallery: galleryFromHero("/images/cases/case-4.jpg"),
  },
  {
    id: "universidad-aniversario",
    title: "Aniversario Institucional",
    subtitle: "Educación Superior",
    company: "Universidad Austral",
    client: "Universidad Austral",
    location: "Campus Peñalolén, Santiago",
    image: "/images/cases/case-5.jpg",
    description:
      "Gala de aniversario con gala dinner, show en vivo, transmisión híbrida y documental de cierre de campaña. Tauren Pro Eventos asumió la producción integral: escenario, sonido e iluminación para el show, transmisión para alumni internacional, registro cinematográfico y producción de un documental de cierre.",
    services: ["Gala", "Show en vivo", "Documental"],
    year: "2023",
    indexTotal: 5,
    stats: [
      { value: "600", label: "invitados en gala dinner" },
      { value: "2000+", label: "espectadores en transmisión" },
    ],
    desafio:
      "La universidad celebraba un aniversario institucional con gala dinner, show artístico en vivo y una audiencia híbrida que incluía alumni en el extranjero. El reto era mantener la elegancia del formato presencial mientras se capturaba material de alto valor para un documental conmemorativo.",
    solucion:
      "Diseñamos una producción escénica completa con iluminación de gala, audio profesional para show en vivo y transmisión multicámara para audiencia remota. Un equipo de filmmaking documentó la jornada con enfoque cinematográfico para la pieza conmemorativa final.",
    reflexiones:
      "El aniversario reafirmó que los hitos institucionales merecen una producción a la altura de su significado. La combinación de gala presencial, streaming global y documental de cierre entregó un legado audiovisual que trasciende la noche del evento.",
    gallery: galleryFromHero("/images/cases/case-5.jpg"),
  },
];
