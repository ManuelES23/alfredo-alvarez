// Fotos: Unsplash (uso libre bajo la Unsplash License, enlazadas directo
// desde su CDN — no requieren descarga ni atribución).
export const articulos = [
  {
    id: 4,
    slug: "autoridades-fiscales-recaudacion-digital",
    categoria: "Fiscalización",
    categoriaColor: "#0D2260",
    titulo:
      "Las autoridades fiscales y sus estrategias recaudatorias en la era digital",
    extracto:
      "Cómo la digitalización del CFDI, el buzón tributario y el análisis masivo de datos cambiaron la forma en que la autoridad fiscaliza, y qué debe hacer tu negocio para prevenir contingencias.",
    fecha: "20 Ago 2026",
    tiempoLectura: "6 min",
    // Versión pequeña para la card del home, y una más grande para la
    // portada a pantalla completa del artículo.
    imagen:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop",
    imagenPortada:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&auto=format&fit=crop",
    url: "/blog/autoridades-fiscales-recaudacion-digital",
    // Artículo de invitado: no es contenido de Alfredo, se le da crédito al autor.
    autor: {
      nombre: "CPC y MI Benjamín Carriquiry Hays",
      cargo: "Director General, Hays Consultores",
      correo: "direccion@haysconsultores.com",
    },
    contenido: [
      { tipo: "titulo", texto: "1. De lo presencial a lo digital" },
      {
        tipo: "parrafo",
        texto:
          "Durante los últimos años, el modelo de fiscalización en México ha tenido cambios significativos, impulsados por las nuevas tecnologías y sobre todo en la digitalización de los procesos fiscales. Como, por ejemplo, la incorporación de los comprobantes fiscales digitales por internet (CFDI) han permitido a las autoridades fiscales analizar grandes volúmenes de información en tiempo real. Además, el uso obligatorio del buzón tributario y la facultad que tiene la autoridad para restringir temporalmente los certificados de sellos digitales le han dado una facilidad a la autoridad para fiscalizar de manera exitosa y con mucho menos personal.",
      },
      {
        tipo: "parrafo",
        texto:
          "En este nuevo entorno o nueva era, la recaudación fiscal ya no depende de auditorías tradicionales o actos presenciales para ejercer las facultades de comprobación. Con la ayuda de las nuevas tecnologías como es la inteligencia artificial (IA), el análisis masivo de datos, entre otros procesos que hoy sabemos que las autoridades utilizan, hoy la recaudación digital está más que presente en la recaudación fiscal de México.",
      },
      {
        tipo: "titulo",
        texto: "2. Herramientas utilizadas por la autoridad fiscal",
      },
      {
        tipo: "subtitulo",
        texto: "2.1. CFDI como fuente primaria de información",
      },
      {
        tipo: "parrafo",
        texto:
          "El CFDI se ha consolidado como la principal herramienta para el análisis del comportamiento fiscal de los contribuyentes. A través de este documento la autoridad conoce los ingresos, las deducciones, retenciones efectuadas y sobre todo la capacidad operativa y económica de los contribuyentes, generando cruces automáticos que pueden detectar inconsistencias, anomalías en el comportamiento de los contribuyentes y sobre todo la posible existencia de empresas que facturan operaciones no reales o simuladas.",
      },
      {
        tipo: "subtitulo",
        texto: "2.2. Buzón tributario y la comunicación electrónica",
      },
      {
        tipo: "parrafo",
        texto:
          "El buzón tributario también juega un papel muy importante en la recaudación fiscal, funciona como medio oficial para las notificaciones, avisos y comunicados que la autoridad realiza, reduciendo costos y la necesidad de realizar comunicaciones físicas.",
      },
      { tipo: "subtitulo", texto: "2.3. Revisiones electrónicas" },
      {
        tipo: "parrafo",
        texto:
          "Las revisiones electrónicas permiten a la autoridad analizar el comportamiento fiscal de un contribuyente sin la necesidad de acudir al domicilio del mismo. Esto maximiza la rapidez y eficiencia en los procesos recaudatorios de la autoridad, además de disminuir los tiempos invertidos en los mismos.",
      },
      {
        tipo: "titulo",
        texto: "3. Estrategias recaudatorias indirectas del SAT",
      },
      {
        tipo: "subtitulo",
        texto: "3.1. Fiscalización basada en análisis masivo de datos",
      },
      {
        tipo: "parrafo",
        texto:
          "El uso de algoritmos y modelos programados para evaluar posibles riesgos permite detectar diferencias, inconsistencias e incumplimientos fiscales. Esta fiscalización preventiva busca invitar a los contribuyentes a corregir sus inconsistencias sin que se ejerzan las facultades de comprobación, incrementando la eficiencia recaudatoria.",
      },
      {
        tipo: "subtitulo",
        texto: "3.2. Restricción temporal de certificados de sello digital",
      },
      {
        tipo: "parrafo",
        texto:
          "Una de las estrategias más relevantes en los últimos 2 años es la restricción de los certificados de sellos digitales, prevista en el artículo 17-H bis del CFF. Esta medida tiene un impacto inmediato en la operación de los contribuyentes, lo que provoca una regularización inmediata de la situación fiscal del contribuyente.",
      },
      {
        tipo: "subtitulo",
        texto:
          "3.3. Opinión de cumplimiento como mecanismo de presión recaudatoria",
      },
      {
        tipo: "parrafo",
        texto:
          "La opinión de cumplimiento se ha convertido en un indicador que utilizan las empresas para verificar la situación fiscal de sus clientes, proveedores o cualquier tercero involucrado en la operación, incentivando así el cumplimiento oportuno de las obligaciones fiscales.",
      },
      { tipo: "subtitulo", texto: "3.4. Listados oficiales de la autoridad" },
      {
        tipo: "parrafo",
        texto:
          "La publicación de contribuyentes en las listas restrictivas y la validación constante de operaciones comerciales representan una estrategia indirecta que influye en la conducta fiscal de los contribuyentes. Estas herramientas generan efectos de reputación y de operación que promueven regularizaciones.",
      },
      {
        tipo: "titulo",
        texto: "4. Automatización y la gestión de riesgos fiscales",
      },
      {
        tipo: "parrafo",
        texto:
          "La digitalización le ha permitido a la autoridad implementar esquemas de análisis automatizado que ya identifican por sí solos patrones de riesgo fiscal. Estos sistemas son capaces de evaluar variables desde el comportamiento histórico del contribuyente, discrepancias fiscales, incumplimientos de obligaciones y movimientos financieros.",
      },
      {
        tipo: "titulo",
        texto:
          "5. El nuevo rol del contador público ante la recaudación digital",
      },
      {
        tipo: "parrafo",
        texto:
          "En este contexto, el contador público ha evolucionado hacia un gestor estratégico de riesgos fiscales. Su función ya no se limita al cálculo de impuestos, sino que incluye la supervisión del cumplimiento de obligaciones fiscales, el uso de herramientas digitales y la automatización de procesos, que llevan al contador público a prevenir contingencias fiscales.",
      },
      {
        tipo: "parrafo",
        texto:
          "El profesional de la contaduría debe desarrollar habilidades tecnológicas y de análisis que permitan interpretar indicadores de riesgo fiscal y diseñar estrategias preventivas para sus clientes.",
      },
      {
        tipo: "titulo",
        texto:
          "6. Buenas prácticas para la prevención de contingencias fiscales",
      },
      {
        tipo: "parrafo",
        texto: "Entre las principales recomendaciones destacan:",
      },
      {
        tipo: "lista",
        items: [
          "Monitoreo constante del buzón tributario.",
          "Conciliación periódica entre CFDI y declaraciones presentadas.",
          "Implementación de controles internos digitales.",
          "Documentación adecuada de operaciones y papeles de trabajo electrónicos.",
          "Capacitación continua del profesional de la contaduría.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "La prevención se convierte en la principal herramienta para evitar medidas que puedan afectar al contribuyente.",
      },
      { tipo: "titulo", texto: "7. Conclusión" },
      {
        tipo: "parrafo",
        texto:
          "Las estrategias recaudatorias en la era digital reflejan un cambio profundo en la relación entre autoridad y contribuyente. La fiscalización basada en datos permite a la autoridad actuar con mayor rapidez y precisión, generando un entorno donde la prevención y el cumplimiento oportuno adquieren un papel central.",
      },
      {
        tipo: "parrafo",
        texto:
          "Para los profesionales de la contaduría pública, este escenario representa una oportunidad para evolucionar hacia modelos de asesoría estratégica que integren tecnología, análisis de riesgos y cumplimiento normativo. La adaptación a esta nueva realidad no solo fortalece la práctica profesional, sino que contribuye a un sistema fiscal más eficiente y transparente.",
      },
    ],
  },
  {
    id: 1,
    categoria: "RESICO",
    categoriaColor: "#00AEEF",
    titulo: "RESICO 2025: Guía completa para no cometer errores este año",
    extracto:
      "El Régimen Simplificado de Confianza tiene cambios importantes para 2025. Te explico qué cambió, los nuevos límites de ingresos y qué obligaciones debes cumplir mes a mes para evitar multas.",
    fecha: "20 Feb 2025",
    tiempoLectura: "8 min",
    imagen:
      "https://images.unsplash.com/photo-1772588627327-1eeddcf73c11?w=800&q=80&auto=format&fit=crop",
    url: "#",
  },
  {
    id: 2,
    categoria: "Personas Físicas",
    categoriaColor: "#1A3A8F",
    titulo:
      "10 deducciones personales que puedes aplicar en tu declaración anual",
    extracto:
      "¿Sabías que los gastos médicos, dentales, colegiaturas y hasta la renta de tu casa pueden reducir tu ISR? Te explico exactamente qué puedes deducir y cómo comprobarlo ante la autoridad fiscal.",
    fecha: "14 Feb 2025",
    tiempoLectura: "10 min",
    imagen:
      "https://images.unsplash.com/photo-1709880945165-d2208c6ad2ec?w=800&q=80&auto=format&fit=crop",
    url: "#",
  },
  {
    id: 3,
    categoria: "CFDI",
    categoriaColor: "#0D2260",
    titulo: "CFDI 4.0: Cómo corregir errores en tu factura sin cancelarla",
    extracto:
      "Emitir una factura con datos incorrectos ya no significa cancelar de inmediato. Conoce los métodos permitidos para corregir información en el CFDI 4.0 y evita problemas con tus clientes.",
    fecha: "7 Feb 2025",
    tiempoLectura: "6 min",
    imagen:
      "https://images.unsplash.com/photo-1735825764460-c5dec05d6253?w=800&q=80&auto=format&fit=crop",
    url: "#",
  },
];
