// Fotos: Unsplash (uso libre bajo la Unsplash License, enlazadas directo
// desde su CDN — no requieren descarga ni atribución).
export const articulos = [
  {
    id: 6,
    slug: "factura-global-vs-factura-publico-en-general",
    categoria: "CFDI",
    categoriaColor: "#00AEEF",
    titulo:
      "Factura global y factura a público en general: no son lo mismo, y confundirlas te sale en multa",
    extracto:
      "Mucha gente cree que la factura a público en general y la factura global son lo mismo. No lo es, y el día que llega una revisión, no saber cuál es cuál te deja sin defensa. Te explico las diferencias, los requisitos de la global y las multas.",
    fecha: "9 Oct 2026",
    tiempoLectura: "6 min",
    imagen:
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80&auto=format&fit=crop",
    imagenPortada:
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1600&q=80&auto=format&fit=crop",
    url: "/blog/factura-global-vs-factura-publico-en-general",
    contenido: [
      {
        tipo: "parrafo",
        texto:
          "Llega el cliente, paga y no pide factura. Unos le emiten en ese momento una factura a público en general; otros le dan su ticket y al cierre emiten la global. Y mucha gente cree que es lo mismo. No lo es, y el día que llega una revisión, no saber cuál es cuál te deja sin defensa.",
      },
      { tipo: "titulo", texto: "1. Cómo llegamos hasta aquí" },
      {
        tipo: "parrafo",
        texto:
          "La idea no es de ayer. El artículo 29-A, fracción IV, del Código Fiscal de la Federación (CFF) permite a la autoridad dar facilidades para las ventas al público en general, y esa facilidad es la regla 2.7.1.21 de la Resolución Miscelánea Fiscal (RMF). Hasta 2021 la global se timbraba en 72 horas; en 2022 bajó a 24, como marca el artículo 39 del Reglamento del CFF (RCFF). Ese año también arrancó el Régimen Simplificado de Confianza (RESICO), previsto en el artículo 113-G de la Ley del Impuesto sobre la Renta (LISR), y con la versión 4.0 del comprobante llegó el nodo de información global.",
      },
      {
        tipo: "titulo",
        texto: "2. Factura a público en general vs. factura global",
      },
      {
        tipo: "parrafo",
        texto:
          "La **factura a público en general** es un comprobante por una sola venta, dirigido a la clave genérica del Registro Federal de Contribuyentes (RMF, regla 2.7.1.23). La **factura global** es otra cosa: una facilidad para emitir un solo comprobante por todas las ventas del periodo, respaldado por un ticket de cada operación. La **nominativa** lleva los datos del cliente.",
      },
      {
        tipo: "tabla",
        encabezados: [
          "",
          "Factura a público en general",
          "Factura global",
          "Factura nominativa",
        ],
        filas: [
          [
            "Qué ampara",
            "Una venta",
            "Todas las ventas del periodo",
            "Una venta",
          ],
          [
            "A quién",
            "Genérico (XAXX010101000)",
            "El mismo genérico",
            "Registro Federal de Contribuyentes del cliente",
          ],
          [
            "Requiere",
            "Nada adicional",
            "Ticket por venta e información global",
            "Datos fiscales del cliente",
          ],
          ["¿Deduce o acredita?", "No", "No", "Sí, si cumple requisitos"],
          [
            "Fundamento",
            "CFF, artículo 29-A; RMF, regla 2.7.1.23",
            "RMF, regla 2.7.1.21; CFF, artículo 29",
            "CFF, artículo 29-A",
          ],
        ],
      },
      { tipo: "titulo", texto: "3. Qué dice la regla en 2026" },
      {
        tipo: "parrafo",
        texto:
          "La RMF 2026 mantiene la regla 2.7.1.21 y su primera modificación (9 de julio de 2026) no la tocó. Para usarla entregas ticket y emites la global; si el ticket no es válido, la facilidad se cae.",
      },
      {
        tipo: "parrafo",
        texto:
          "Tres cosas que se pasan por alto. Las ventas de menos de $100 no obligan a dar ticket si el cliente no lo pide, pero aun así **van dentro de la global**. Si la operación lleva retenciones, la facilidad no aplica y toca una factura por operación. Y el sector de hidrocarburos (RMF, regla 2.6.1.2) no puede usarla.",
      },
      { tipo: "titulo", texto: "4. Periodicidad y plazo" },
      {
        tipo: "parrafo",
        texto:
          "La global puede ser diaria, semanal o mensual. La bimestral es solo para quien siga en el Régimen de Incorporación Fiscal. La quincenal no existe en la regla. Si eres persona física en RESICO, tu global es mensual y solo lleva el monto total.",
      },
      {
        tipo: "parrafo",
        texto:
          "El plazo para timbrarla es de 24 horas después del cierre. Si te dijeron que es novedad de 2026, te dijeron mal: viene de 2022.",
      },
      { tipo: "titulo", texto: "5. Qué debe llevar la global" },
      {
        tipo: "tabla",
        encabezados: ["Bloque", "Dato obligatorio"],
        filas: [
          [
            "Receptor",
            "Genérico XAXX010101000; nombre PUBLICO EN GENERAL; código postal igual al lugar de expedición; régimen 616; uso S01",
          ],
          [
            "Comprobante",
            "Ingreso; pago en una sola exhibición; forma de pago del ticket de mayor monto; exportación 01",
          ],
          ["Información global", "Periodicidad, mes y año de las ventas"],
          [
            "Conceptos",
            'Uno por ticket: clave 01010101, unidad ACT, cantidad 1, descripción "Venta" y folio del ticket; Impuesto al Valor Agregado e Impuesto Especial sobre Producción y Servicios, en su caso, por separado',
          ],
        ],
      },
      { tipo: "titulo", texto: "6. Cuando el cliente regresa por su factura" },
      {
        tipo: "parrafo",
        texto:
          "Ya timbraste la global y el cliente vuelve por su factura. La misma venta no puede estar en dos comprobantes. Cancela la global y emítela de nuevo sin ese ticket, con relación tipo 04, o haz un egreso con justificación y soporte (CFF, artículo 29).",
      },
      {
        tipo: "parrafo",
        texto:
          "Puedes cancelar hasta el mes de la declaración anual y con aceptación del receptor (CFF, artículo 29-A), que a la global no se le exige (RMF, regla 2.7.1.35, fracción VII). En RESICO hay un detalle: la LISR (artículo 113-G) dice que la global solo se cancela en el mes en que se emitió, pero la RMF (regla 3.13.29) te da hasta el 30 de abril del año siguiente. Y nunca condiciones la factura a que el cliente traiga su constancia de situación fiscal: es infracción (CFF, artículo 83, fracción IX).",
      },
      { tipo: "titulo", texto: "7. Lo que cuesta equivocarse" },
      {
        tipo: "parrafo",
        texto:
          "No expedir la global, o expedirla sin requisitos, es infracción (CFF, artículo 83, fracción VII). La multa va de **$22,300 a $127,530** y, si reincides, pueden clausurarte el establecimiento de 3 a 15 días; para personas físicas en RESICO (o en el Régimen de Incorporación Fiscal), de **$1,910 a $3,800** (CFF, artículo 84, fracción IV). Y desde noviembre de 2025, un comprobante que no ampare una operación real se considera falso (CFF, artículo 29-A, fracción IX).",
      },
      { tipo: "titulo", texto: "8. Dos casos de mostrador" },
      {
        tipo: "parrafo",
        texto:
          "**La tienda que vende en abonos.** Por lo devengado, la global lleva el monto total; por flujo de efectivo, solo lo cobrado en cada periodo (RMF, regla 2.7.1.21).",
      },
      {
        tipo: "parrafo",
        texto:
          "**El proveedor que le vende varias veces al mes a un cliente RESICO.** Emite una sola factura en los tres días posteriores al cierre del mes, y esas ventas salen de la global (RMF, regla 3.13.23).",
      },
      { tipo: "titulo", texto: "9. Qué hacer hoy" },
      {
        tipo: "lista",
        items: [
          "Revisa que los tickets cumplan la fracción III de la regla 2.7.1.21 de la RMF.",
          "Fija una periodicidad y calendariza el cierre más 24 horas.",
          "Concilia: ventas del punto de venta menos nominativas debe darte la base de la global.",
          "Deja por escrito qué se hace cuando un cliente pide factura después.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Fundamento: RMF 2026 (Diario Oficial de la Federación, 28 de diciembre de 2025) y su primera modificación (9 de julio de 2026), reglas 2.6.1.2, 2.7.1.21, 2.7.1.35, 3.13.23 y 3.13.29; CFF, artículos 29, 29-A, 83 y 84; RCFF, artículo 39; LISR, artículo 113-G; guía de llenado del comprobante global, versión 4.0 (Servicio de Administración Tributaria).",
      },
      {
        tipo: "parrafo",
        texto:
          "Aviso: contenido informativo y educativo; no sustituye asesoría profesional personalizada.",
      },
    ],
  },
  {
    id: 5,
    slug: "retencion-iva-isr-construccion",
    categoria: "Retenciones",
    categoriaColor: "#1A3A8F",
    titulo:
      "¿Debe llevar retención de IVA e ISR la factura de un servicio de construcción?",
    extracto:
      "Un contratista, ingeniero o albañil independiente te factura un servicio de construcción. Te explico, con fundamento legal, por qué en este caso la respuesta casi siempre es que no debe llevar retención de IVA ni de ISR.",
    fecha: "3 Sep 2026",
    tiempoLectura: "5 min",
    imagen:
      "https://images.unsplash.com/photo-1558227691-41ea78d1f631?w=800&q=80&auto=format&fit=crop",
    imagenPortada:
      "https://images.unsplash.com/photo-1558227691-41ea78d1f631?w=1600&q=80&auto=format&fit=crop",
    url: "/blog/retencion-iva-isr-construccion",
    contenido: [
      {
        tipo: "titulo",
        texto: "1. El caso: un contratista te factura y surge la duda",
      },
      {
        tipo: "parrafo",
        texto:
          "Imagina una situación muy común en el día a día de cualquier empresa: una persona física —un contratista, un ingeniero o un albañil independiente— presta un servicio de construcción y le factura a una empresa (persona moral). Antes de pagar, en el área de contabilidad surge la misma pregunta de siempre: ¿esa factura debe llevar retención de IVA y de ISR?",
      },
      {
        tipo: "parrafo",
        texto:
          "La respuesta no depende de la costumbre ni de \"así se ha hecho siempre\": la ley establece con precisión cuándo procede una retención y cuándo no. En este artículo explicamos, con fundamento legal pero en lenguaje sencillo, por qué en este caso concreto la respuesta es que no debe retenerse ninguno de los dos impuestos.",
      },
      {
        tipo: "titulo",
        texto: "2. ¿Qué es una retención y por qué se hace esta pregunta?",
      },
      {
        tipo: "parrafo",
        texto:
          "Retener un impuesto significa que quien paga —en este caso, la persona moral— no entrega el 100% del importe facturado a quien prestó el servicio, sino que se queda con una parte y la entera directamente a la autoridad fiscal. Es una manera de asegurar la recaudación en ciertas operaciones. Pero esta obligación no aplica a todos los servicios, solo a los que la ley señala expresamente. Por eso, antes de retener (o de dejar de hacerlo), hay que revisar si el servicio en cuestión encaja en alguno de esos supuestos.",
      },
      {
        tipo: "titulo",
        texto:
          "3. Retención de IVA: ¿la construcción es un \"servicio personal independiente\"?",
      },
      {
        tipo: "parrafo",
        texto:
          "La Ley del IVA, en su artículo 1-A, obliga a retener el impuesto, entre otros casos, cuando una persona moral recibe servicios personales independientes prestados por una persona física.",
      },
      {
        tipo: "parrafo",
        texto:
          "Aquí está la clave del asunto: no todo servicio prestado por una persona física es un \"servicio personal independiente\". El artículo 14 de la misma ley aclara que un servicio tiene esa naturaleza únicamente cuando NO se trata de una actividad empresarial.",
      },
      {
        tipo: "parrafo",
        texto:
          "Entonces, ¿qué es una actividad empresarial? El artículo 16 del Código Fiscal de la Federación la define como las actividades comerciales, industriales, agrícolas, ganaderas, de pesca o silvícolas.",
      },
      {
        tipo: "parrafo",
        texto:
          "Y aquí aparece la pieza que resuelve el caso: el artículo 75 del Código de Comercio establece que la construcción es un acto de comercio. Al tener ese carácter, la construcción se considera una actividad empresarial y, por definición, deja de ser un \"servicio personal independiente\".",
      },
      {
        tipo: "parrafo",
        texto:
          "Conclusión parcial: si el servicio no es \"personal independiente\" sino empresarial, no se ubica en el supuesto que obliga a retener IVA. La factura por un servicio de construcción, en este caso, no debe llevar retención de este impuesto.",
      },
      {
        tipo: "titulo",
        texto: "4. Retención de ISR: el mismo principio, otra ley",
      },
      {
        tipo: "parrafo",
        texto:
          "En materia de ISR ocurre algo muy similar. La Ley del ISR distingue con claridad dos tipos de ingresos de las personas físicas, en su artículo 100:",
      },
      {
        tipo: "lista",
        items: [
          "Ingresos por actividades empresariales (comerciales, industriales, agrícolas, ganaderas, de pesca o silvícolas).",
          "Ingresos por servicios profesionales, es decir, por un servicio personal independiente.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "La obligación de retener el 10% como pago provisional de ISR, prevista en el artículo 106, cuarto párrafo, aplica únicamente cuando una persona moral recibe servicios profesionales de una persona física, no cuando recibe un servicio de naturaleza empresarial.",
      },
      {
        tipo: "parrafo",
        texto:
          "Como ya vimos, la construcción es una actividad empresarial —así lo define el Código de Comercio— y no un servicio profesional. Por lo tanto, tampoco procede la retención de ISR.",
      },
      { tipo: "titulo", texto: "5. Conclusión" },
      {
        tipo: "parrafo",
        texto:
          "Cuando una persona física factura un servicio de construcción a una persona moral, esa factura no debe llevar retención de IVA ni de ISR. La razón es la misma en ambos casos: la construcción es, por disposición del Código de Comercio, una actividad empresarial, y las retenciones tanto de IVA como de ISR sobre pagos a personas físicas están diseñadas para servicios profesionales o personales independientes, no para actividades empresariales.",
      },
      {
        tipo: "parrafo",
        texto:
          "Este análisis aplica al caso general aquí descrito. Cada operación tiene particularidades —el tipo de contrato, la forma en que se presta el servicio, u otros elementos que puedan cambiar su naturaleza— que podrían modificar la conclusión. Por eso, ante cualquier duda sobre un caso concreto, lo más seguro es revisarlo con tu contador o asesor legal de confianza.",
      },
      {
        tipo: "parrafo",
        texto:
          "Este artículo tiene fines informativos y de divulgación; no sustituye una consulta personalizada sobre tu caso particular.",
      },
    ],
  },
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
