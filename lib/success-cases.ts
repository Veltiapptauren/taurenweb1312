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

export const successCases: SuccessCase[] = [
  {
    id: "ministerio-publico",
    title: "Cuenta Pública Ministerio Público 2025",
    titleLines: ["Cuenta Pública", "Ministerio Público 2025"],
    subtitle:
      "Señal en vivo sin margen de error para la Fiscalía de Chile.",
    company: "Ministerio Público de Chile",
    client: "Ministerio Público de Chile",
    location: "Auditorio de la Fiscalía Nacional, Santiago",
    image: "/images/cases/ministerio-publico/hero.jpg",
    description:
      "La Cuenta Pública del Ministerio Público 2025 reunió en el Auditorio de la Fiscalía Nacional a 300 autoridades del orden público, representantes de Carabineros, PDI y el Ministerio de Justicia, para la presentación de los resultados institucionales del año. La jornada fue presidida por Ángel Valencia Vásquez, Fiscal Nacional, con la participación de Xavier Almendáriz, Fiscal Metropolitano Centro Norte, y Lorena Parra, a cargo de la Fiscalía Regional Metropolitana Oriente. Tauren Pro Eventos produjo la transmisión en vivo al canal de YouTube de la Fiscalía de Chile, con redundancia eléctrica total garantizada mediante generador propio.",
    services: [
      "Streaming",
      "Pantalla LED",
      "Internet satelital",
      "Amplificación",
      "Iluminación",
      "Generador eléctrico",
      "Intérprete en lengua de señas",
    ],
    year: "2025",
    indexTotal: 4,
    stats: [
      { value: "300", label: "asistentes presenciales" },
      { value: "700", label: "personas conectadas a lo largo de todo Chile" },
    ],
    desafio:
      "Este evento no admitía márgenes de error. La Cuenta Pública del Ministerio Público es un acto protocolar con las principales autoridades del sistema de justicia del país y con transmisión en vivo al canal oficial de la Fiscalía de Chile. Un corte de señal o una falla eléctrica no era una opción. El Auditorio de la Fiscalía Nacional no contaba con la autonomía energética necesaria para garantizar continuidad absoluta durante toda la jornada, por lo que la solución debía contemplarse desde la etapa de montaje y no dejar ningún punto crítico expuesto al azar.",
    solucion:
      "Instalamos un generador eléctrico en el frontis del primer piso del edificio de la Fiscalía que alimentó de forma continua la iluminación, la amplificación y las cámaras de transmisión durante toda la jornada. Para la conectividad, operamos con internet satelital como fuente principal, eliminando la dependencia de la red del edificio. La pantalla LED de 4 x 2,5 metros y el servicio de intérprete en lengua de señas completaron una producción diseñada para no dejar ningún detalle al margen. El resultado fue una transmisión ininterrumpida que llegó en vivo a 305 espectadores y que acumula 690 visualizaciones en el canal de YouTube de la Fiscalía de Chile.",
    reflexiones:
      "Primera vez que el Ministerio Público trabajó con Tauren Pro Eventos. El cliente valoró la disposición del equipo ante imprevistos de último momento y el cumplimiento de cada ítem contratado. La señal nunca se cayó.",
    gallery: {
      wide: "/images/cases/ministerio-publico/wide.jpg",
      left: "/images/cases/ministerio-publico/left.jpg",
      right: "/images/cases/ministerio-publico/right.jpg",
      smallLeft: "/images/cases/ministerio-publico/small-left.jpg",
      smallRight: "/images/cases/ministerio-publico/small-right.jpg",
      device: "/images/cases/ministerio-publico/device.jpg",
    },
  },
  {
    id: "snpnea-noviembre",
    title: "Charla Magistral: Principios Teóricos de Evidencia C.A.R.E.",
    titleLines: ["Charla Magistral:", "Principios Teóricos de Evidencia C.A.R.E."],
    subtitle:
      "Traducción simultánea y transmisión en vivo en el Aula Magna de la UC.",
    company: "Servicio Nacional de Protección a la Niñez y Adolescencia",
    client: "Servicio Nacional de Protección a la Niñez y Adolescencia",
    location: "Aula Magna, Pontificia Universidad Católica de Chile",
    image: "/images/cases/snpnea-noviembre/hero.jpg",
    description:
      "250 asistentes se reunieron en el Aula Magna de la Pontificia Universidad Católica de Chile para escuchar a Martha Holden y Andrea Turnbull, directora y codirectora del Centro de Investigación sobre Cuidado Residencial de la Universidad de Cornell, Nueva York. La jornada incluyó un conversatorio moderado por María Pía Santelices, directora ejecutiva del Centro Cuida de la UC, con la participación del director del Servicio, Claudio Castillo. Tauren Pro Eventos asumió la producción técnica integral: transmisión en vivo, traducción simultánea en tiempo real, cobertura audiovisual y fotográfica, generación de contenido y coffee break para los asistentes.",
    services: [
      "Streaming",
      "Traducción simultánea",
      "Fotografía",
      "Filmación",
      "Coffee break",
    ],
    year: "2023",
    indexTotal: 4,
    stats: [
      { value: "250", label: "asistentes presenciales" },
      { value: "1000+", label: "asistentes virtuales y un chat muy activo" },
    ],
    desafio:
      "El Aula Magna de la UC es un espacio patrimonial con características técnicas particulares. Durante la etapa de montaje y ensayos previos al evento, identificamos interferencias entre los transmisores de las cabinas de traducción simultánea y el equipo de sonido, así como condiciones de conectividad que requerían una solución a medida. Anticipar estos puntos antes del inicio de la jornada nos permitió llegar al evento con todo resuelto.",
    solucion:
      "Implementamos un balanceador de red que operó en paralelo sobre el cable interno de la universidad y un chip de datos 4G, garantizando estabilidad en la transmisión sin depender de una sola fuente. Las interferencias de audio detectadas en los ensayos fueron corregidas antes del inicio, asegurando una experiencia limpia tanto en sala como para la audiencia online. En paralelo, el equipo audiovisual registró la jornada completa y generó contenido para el cliente, desde las palabras de bienvenida del prorector Francisco Gallego hasta el cierre del conversatorio.",
    reflexiones:
      "Un edificio antiguo, dos ponentes internacionales y 250 personas entre sala y pantalla. Tauren Pro Eventos resolvió cada variable técnica en silencio para que el contenido fuera lo único que se notara. El Servicio Nacional de Protección Especializada a la Niñez y Adolescencia recibió un evento sin contratiempos y el registro completo para comunicarlo.",
    gallery: {
      wide: "/images/cases/snpnea-noviembre/wide.jpg",
      left: "/images/cases/snpnea-noviembre/left.jpg",
      right: "/images/cases/snpnea-noviembre/right.jpg",
      smallLeft: "/images/cases/snpnea-noviembre/small-left.jpg",
      smallRight: "/images/cases/snpnea-noviembre/small-right.jpg",
      device: "/images/cases/snpnea-noviembre/device.jpg",
    },
  },
  {
    id: "sernatur-50",
    title: "Conversatorio de los 50 Años de SERNATUR",
    titleLines: ["Conversatorio de los", "50 Años de SERNATUR"],
    subtitle:
      "Cincuenta años de historia turística de Chile, reunidos en una sola tarde.",
    company: "SERNATUR",
    client: "Servicio Nacional de Turismo",
    location: "Santiago, Chile",
    image: "/images/cases/sernatur/hero.jpg",
    description:
      "El Conversatorio de los 50 Años de SERNATUR reunió a equipos, autoridades y colaboradores en una jornada institucional de alto valor simbólico. Tauren Pro Eventos asumió la producción integral del encuentro: registro fotográfico oficial, filmación de testimoniales, postproducción audiovisual y un servicio de catering diseñado para acompañar la experiencia con el mismo nivel de cuidado que el resto de la operación.",
    services: ["Fotografía", "Filmación", "Testimoniales", "Catering"],
    year: "2025",
    indexTotal: 4,
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
      wide: "/images/cases/sernatur/wide.jpg",
      left: "/images/cases/sernatur/left.jpg",
      right: "/images/cases/sernatur/right.jpg",
      smallLeft: "/images/cases/sernatur/small-left.jpg",
      smallRight: "/images/cases/sernatur/small-right.jpg",
      device: "/images/cases/sernatur/device.png",
    },
  },
  {
    id: "proteccion-ninez",
    title: "Seminario de la Protección a la Reparación",
    titleLines: ["Seminario de la", "Protección a la Reparación"],
    subtitle:
      "Conectar lo presencial con lo digital, sin perder una sola palabra.",
    company: "Servicio Nacional de Protección a la Niñez y Adolescencia",
    client: "Servicio Nacional de Protección a la Niñez y Adolescencia",
    location: "Auditorio de la Fiscalía Nacional",
    image: "/images/cases/snpnea/hero.jpg",
    description:
      "El Seminario De la Protección a la Reparación fue un encuentro técnico organizado por el Servicio Nacional de Protección a la Niñez y Adolescencia para reunir a 300 especialistas en un espacio de reflexión, debate y actualización en torno a la protección de derechos de niños, niñas y adolescentes en Chile. Tauren Pro Eventos asumió la producción integral de la jornada: sonido profesional, transmisión en vivo, registro fotográfico y audiovisual, y servicio de catering para los 300 asistentes.",
    services: ["Streaming", "Sonido", "Fotografía", "Filmación", "Catering"],
    year: "2025",
    indexTotal: 4,
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
      wide: "/images/cases/snpnea/wide.jpg",
      left: "/images/cases/snpnea/left.jpg",
      right: "/images/cases/snpnea/right.jpg",
      smallLeft: "/images/cases/snpnea/small-left.jpg",
      smallRight: "/images/cases/snpnea/small-right.jpg",
      device: "/images/cases/snpnea/device.jpg",
    },
  },
];
