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
      "Llegar a audiencias presenciales y remotas al mismo tiempo, sin perder calidad técnica ni engagement en la transmisión.",
    solucion:
      "Streaming multicámara, audio profesional, gráficos en vivo y operación técnica para que tu evento se vea y suene impecable en cualquier plataforma.",
    resultado:
      "Transmisiones estables, imagen de marca cuidada y una experiencia híbrida que conecta con quienes están en sala y online.",
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
      "Coordinar muchos proveedores, plazos y recursos sin una visión única que asegure coherencia en cada fase del evento.",
    solucion:
      "Tauren Pro Eventos asume la producción llave en mano: planificación, técnica, mobiliario, catering, escenografía y coordinación general con un solo equipo responsable.",
    resultado:
      "Un evento ejecutado con control, timing preciso y una experiencia integral que refleja el estándar de tu marca.",
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
      "Comunicar con impacto en múltiples canales cuando el equipo interno no alcanza a producir piezas con nivel profesional y consistencia visual.",
    solucion:
      "Rodaje, dirección, postproducción y entregables optimizados para web, redes, presentaciones y campañas institucionales.",
    resultado:
      "Contenido audiovisual listo para publicar, alineado a tu marca y pensado para generar conversión y credibilidad.",
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
