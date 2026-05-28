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
    id: "planning",
    number: "01",
    title: "Planning de Eventos",
    description:
      "Conceptualización, logística y coordinación integral para eventos de alto impacto.",
    image: "/images/hero-planning.jpg",
    desafio:
      "Marcas con una visión ambiciosa pero sin una hoja de ruta clara: plazos ajustados, múltiples proveedores y poca visibilidad sobre riesgos, costos y prioridades antes del día del evento.",
    solucion:
      "Tauren Pro Eventos estructura el proyecto desde el briefing: cronograma maestro, presupuesto por partidas, selección de venues y proveedores, plan de contingencia y coordinación transversal con un solo interlocutor.",
    resultado:
      "Un evento planificado con control total del timing y la inversión, equipos alineados y una ejecución fluida que transmite profesionalismo en cada detalle.",
  },
  {
    id: "eventos",
    number: "02",
    title: "Producción de Eventos Corporativos",
    description:
      "Lanzamientos, conferencias, activaciones y experiencias de marca memorables.",
    image: "/images/hero-eventos.jpg",
    desafio:
      "Empresas que necesitan impactar a su audiencia en vivo —lanzamientos, conferencias o activaciones— sin sacrificar imagen de marca ni calidad técnica bajo presión de tiempos y expectativas altas.",
    solucion:
      "Producción llave en mano: escenografía, audio, iluminación, streaming, staff operativo y dirección de piso. Integramos creatividad y operación para que la experiencia en sala y digital sea coherente.",
    resultado:
      "Eventos corporativos que refuerzan el posicionamiento de la marca, generan engagement real y dejan un estándar de producción repetible para futuras ediciones.",
  },
  {
    id: "audiovisual",
    number: "03",
    title: "Producción Audiovisual",
    description:
      "Videos corporativos, institucionales, spots digitales y cobertura multicámara.",
    image: "/images/hero-audiovisual.jpg",
    desafio:
      "Comunicar mensajes complejos en formatos cortos y competitivos, con equipos internos saturados y la necesidad de piezas que funcionen en web, redes y presentaciones comerciales.",
    solucion:
      "Guion, rodaje multicámara, dirección de arte, postproducción y entregables optimizados por canal. Un flujo de trabajo ágil con revisiones claras y estándar broadcast donde el proyecto lo exige.",
    resultado:
      "Contenido audiovisual listo para publicar, alineado al tono de la marca y con impacto medible en campañas, capacitaciones y presentaciones institucionales.",
  },
  {
    id: "podcast",
    number: "04",
    title: "Podcast",
    description:
      "Grabación, edición, distribución y producción end to end para Spotify y YouTube.",
    image: "/images/hero-podcast.jpg",
    desafio:
      "Líderes y equipos con historias valiosas pero sin infraestructura de estudio, identidad sonora ni proceso editorial para sostener un podcast profesional en el tiempo.",
    solucion:
      "Estudio equipado, asesoría de formato, grabación multipista, edición, mastering, portadas y publicación en Spotify y YouTube con calendario de episodios y soporte técnico continuo.",
    resultado:
      "Un podcast con sonido premium, identidad clara y publicación constante que posiciona a la marca o al líder como referente en su industria.",
  },
];
