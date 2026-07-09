export type Service = {
  id: string;
  number: string;
  title: string;
  tags: string[];
  images: string[];
  modalTitle: string;
  tagline: string;
  headline: string;
  desafio: string;
  solucion: string;
  resultado: string;
  modalCta: string;
};

export const services: Service[] = [
  {
    id: "streaming",
    number: "01",
    title: "Streaming",
    tags: [
      "Eventos corporativos",
      "Congresos",
      "Seminarios",
      "Lanzamientos institucionales",
      "Conferencias",
    ],
    images: [
      "/images/servicios/streaming/01.png",
      "/images/servicios/streaming/02.png",
      "/images/servicios/streaming/03.png",
      "/images/servicios/streaming/04.png",
    ],
    modalTitle: "TRANSMISIÓN DE EVENTOS",
    tagline: "Cuando no todos pueden asistir...",
    headline: "CONECTA LO PRESENCIAL CON LO DIGITAL",
    desafio:
      "Recrear la experiencia en vivo para una audiencia remota implica mantener la atención, transmitir la emoción del evento presencial y asegurar una calidad técnica impecable, sin importar la distancia ni la plataforma utilizada.",
    solucion:
      "En Tauren Pro, transmitimos eventos que cruzan fronteras, combinando emoción y tecnología para conectar audiencias presenciales y digitales en tiempo real. Garantizamos una experiencia auténtica, con calidad audiovisual y el impacto de un evento vivido desde cualquier lugar.",
    resultado:
      "Cada transmisión se ejecuta bajo una planificación precisa, con expertos en dirección técnica, producción audiovisual y diseño digital. Esta colaboración garantiza un servicio de alto nivel, alineado con los objetivos del cliente y los más altos estándares de calidad.",
    modalCta: "¿Te gustaría aumentar tu audiencia?",
  },
  {
    id: "produccion-integral",
    number: "02",
    title: "Producción Integral",
    tags: [
      "Planificación",
      "Producción técnica",
      "Mobiliario",
      "Catering",
      "Escenografía",
      "Coordinación general",
    ],
    images: [
      "/images/servicios/produccion-integral/01.jpg",
      "/images/servicios/produccion-integral/02.jpg",
      "/images/servicios/produccion-integral/03.jpg",
      "/images/servicios/produccion-integral/04.jpg",
    ],
    modalTitle: "PRODUCCIÓN INTEGRAL",
    tagline: "Cuando cada detalle importa...",
    headline: "UN EVENTO IMPECABLE DE PRINCIPIO A FIN",
    desafio:
      "Organizar un evento corporativo implica mucho más que coordinar proveedores: exige visión estratégica, orden operativo, un diseño coherente con la identidad institucional y la capacidad de anticipar imprevistos. La experiencia de las y los asistentes depende de cientos de pequeñas decisiones que deben ejecutarse con precisión y con una supervisión profesional constante.",
    solucion:
      "En Tauren Pro, producimos eventos corporativos de principio a fin. Nos encargamos de la planificación, y la logística, la coordinación de proveedores, el arriendo de mobiliario, el catering, la ambientación, los arreglos florales y la operación técnica en terreno. Diseñamos flujos claros, cuidamos cada detalle y ejecutamos con eficiencia para que tu evento avance con ritmo, coherencia y una presentación impecable. Nuestro enfoque combina creatividad, orden y tecnología, para que cada etapa tenga un propósito y mantenga un alto estándar de calidad.",
    resultado:
      "Cada evento se vive como una experiencia fluida, bien diseñada y alineada con los objetivos de tu organización. Tu equipo se libera de la carga operativa, y los asistentes disfrutan de un encuentro profesional, cuidado y memorable. La producción avanza con precisión, el ambiente refleja la identidad de la institución y el resultado final deja una impresión clara: todo estuvo en manos de expertos.",
    modalCta: "¿Quieres un evento impecable de principio a fin?",
  },
  {
    id: "media",
    number: "03",
    title: "Media",
    tags: [
      "Videos corporativos",
      "Piezas institucionales",
      "Testimoniales",
      "Contenido promocional",
      "Spots publicitarios",
    ],
    images: [
      "/images/servicios/media/01.png",
      "/images/servicios/media/02.png",
      "/images/servicios/media/03.png",
      "/images/servicios/media/04.jpg",
    ],
    modalTitle: "PRODUCCIÓN AUDIOVISUAL",
    tagline: "Cuando tu marca necesita hablar con impacto...",
    headline: "CONTENIDO QUE COMUNICA Y CONVIERTE",
    desafio:
      "Tu empresa realiza eventos, jornadas o actividades valiosas, pero cuesta traducir esa energía en contenidos que realmente conecten, inspiren o generen recordación. Muchas veces, todo ese esfuerzo queda en el olvido por falta de una estrategia audiovisual que lo proyecte con fuerza y coherencia.",
    solucion:
      "Desarrollamos piezas audiovisuales que se adaptan a cada necesidad corporativa. Cubrimos eventos, grabamos entrevistas, generamos videos resumen y también producimos contenidos desde cero. Integramos diseño gráfico en 2D y 3D, animaciones y recursos visuales que fortalecen tu mensaje, siempre con un enfoque creativo y alineado a tus objetivos de comunicación.",
    resultado:
      "Transformamos tus instancias corporativas en material de alto valor, ideal para ser difundido internamente, compartido en redes o utilizado en futuras campañas, posicionando tu marca como activa, profesional y cercana.",
    modalCta: "¿Necesitas contenido que comunique con impacto?",
  },
  {
    id: "diseno-web",
    number: "04",
    title: "Desarrollo Web y Apps",
    tags: [
      "Apps móviles iOS/Android",
      "Sitios corporativos",
      "Landing pages",
      "E-commerce",
      "UX/UI",
      "Desarrollo responsive",
    ],
    images: [
      "/images/servicios/diseno-web/01.png",
      "/images/servicios/diseno-web/02.jpg",
      "/images/servicios/diseno-web/03.jpg",
      "/images/servicios/diseno-web/04.jpg",
    ],
    modalTitle: "DESARROLLO WEB Y APPS MÓVILES",
    tagline: "Cuando tu presencia digital debe estar a la altura...",
    headline: "WEB Y APPS QUE REPRESENTAN TU MARCA",
    desafio:
      "Necesitar presencia digital profesional sin un sitio o app que represente la calidad de la marca ni se adapte a cada dispositivo.",
    solucion:
      "Diseño visual, desarrollo web responsive y apps móviles a medida con experiencia de usuario pensada para convertir visitas en oportunidades de negocio.",
    resultado:
      "Sitios web y apps móviles modernos, rápidos y alineados a tu identidad de marca, listos para crecer con tu empresa.",
    modalCta: "¿Listo para llevar tu marca al digital?",
  },
];
