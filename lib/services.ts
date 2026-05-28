export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  desafio: string;
  solucion: string;
  resultado: string;
};

export const services: Service[] = [
  {
    id: "streaming",
    number: "01",
    title: "Streaming",
    description:
      "Eventos corporativos | Congresos | Seminarios | Lanzamientos institucionales | Conferencias",
    image: "/images/hero-planning.jpg",
    desafio:
      "Llegar a audiencias presenciales y remotas al mismo tiempo, sin perder calidad técnica ni engagement en la transmisión.",
    solucion:
      "Streaming multicámara, audio profesional, gráficos en vivo y operación técnica para que tu evento se vea y suene impecable en cualquier plataforma.",
    resultado:
      "Transmisiones estables, imagen de marca cuidada y una experiencia híbrida que conecta con quienes están en sala y online.",
  },
  {
    id: "produccion-integral",
    number: "02",
    title: "Producción Integral",
    description:
      "Planificación | Producción técnica | Mobiliario | Catering | Escenografía | Coordinación general",
    image: "/images/hero-eventos.jpg",
    desafio:
      "Coordinar muchos proveedores, plazos y recursos sin una visión única que asegure coherencia en cada fase del evento.",
    solucion:
      "Tauren Pro Eventos asume la producción llave en mano: planificación, técnica, mobiliario, catering, escenografía y coordinación general con un solo equipo responsable.",
    resultado:
      "Un evento ejecutado con control, timing preciso y una experiencia integral que refleja el estándar de tu marca.",
  },
  {
    id: "media",
    number: "03",
    title: "Media",
    description:
      "Videos corporativos | Piezas institucionales | Testimoniales | Contenido promocional | Spots publicitarios",
    image: "/images/hero-audiovisual.jpg",
    desafio:
      "Comunicar con impacto en múltiples canales cuando el equipo interno no alcanza a producir piezas con nivel profesional y consistencia visual.",
    solucion:
      "Rodaje, dirección, postproducción y entregables optimizados para web, redes, presentaciones y campañas institucionales.",
    resultado:
      "Contenido audiovisual listo para publicar, alineado a tu marca y pensado para generar conversión y credibilidad.",
  },
  {
    id: "podcast",
    number: "04",
    title: "Podcast",
    description:
      "Grabación en estudio | Edición y mezcla | Distribución digital | Spotify y YouTube | Producción end to end",
    image: "/images/hero-podcast.jpg",
    desafio:
      "Tener una historia o marca que contar, pero sin estudio, formato ni proceso para sostener un podcast con calidad profesional.",
    solucion:
      "Producción completa: asesoría de formato, grabación multipista, edición, mastering y publicación en plataformas digitales.",
    resultado:
      "Un podcast con identidad clara, sonido premium y publicación constante que posiciona tu mensaje en el mercado.",
  },
];
