// NEXUM FISCAL — Sistema de facturación en la nube (CFDI 4.0)
// Respaldado por Corporativo AA · Los Mochis, Sinaloa
// Datos tomados del material de ventas (NEXUM_Timbres_Ventas_1.pdf)

export const nexumWhatsapp =
  "https://wa.me/526681220386?text=" +
  encodeURIComponent(
    "Hola, quiero información sobre paquetes de timbres NEXUM"
  );

export const dolores = [
  {
    numero: 1,
    titulo: "Te quedas sin folios a media facturación",
    texto:
      "Último día del mes, decenas de facturas pendientes y los timbres se acaban justo cuando el cliente ya te está marcando.",
  },
  {
    numero: 2,
    titulo: "Tu PAC se cae cuando más urge",
    texto:
      'El proveedor "no responde" en el peor momento y tu operación se detiene por completo. Otra vez.',
  },
  {
    numero: 3,
    titulo: "Pagas de más por cada timbre",
    texto:
      "Tarifas infladas, mensualidades que no usas y esquemas que castigan el volumen en lugar de premiarlo.",
  },
];

export const soluciones = [
  {
    icono: "zap",
    titulo: "Timbrado instantáneo, sin fallas",
    texto:
      "Infraestructura estable con PAC de respaldo. Facturas sin caídas ni tiempos muertos.",
  },
  {
    icono: "refresh",
    titulo: "Recarga y asignación inmediata",
    texto:
      "Recargas folios y ya están disponibles al instante. Cero espera, cero pretextos.",
  },
  {
    icono: "puzzle",
    titulo: "Compatibilidad total CFDI 4.0",
    texto:
      "XML descargable y PDF con diseño profesional. Sin migraciones eternas.",
  },
  {
    icono: "dollar",
    titulo: "Precio por volumen que sí conviene",
    texto:
      "Mientras más facturas, menos pagas por timbre. Sin mensualidad ni compromisos.",
  },
];

export const paquetes = [
  {
    id: "arranque",
    nombre: "Motor de arranque",
    destacado: false,
    precio: 144,
    precioPorTimbre: 12,
    timbres: 12,
    descripcion:
      "Perfecto para negocios que facturan ocasionalmente. Sin mensualidad ni compromisos.",
    incluye: [
      "12 timbres CFDI 4.0",
      "Sin vencimiento",
      "XML descargable",
      "PDF con diseño NEXUM",
    ],
  },
  {
    id: "pro",
    nombre: "Pro",
    destacado: false,
    precio: 300,
    precioPorTimbre: 10,
    timbres: 30,
    descripcion:
      "Para negocios con facturación frecuente. Ahorra $2 por timbre vs. Motor de arranque.",
    incluye: [
      "30 timbres CFDI 4.0",
      "Sin vencimiento",
      "XML descargable",
      "PDF con diseño NEXUM",
    ],
  },
  {
    id: "negocio",
    nombre: "Negocio",
    destacado: true,
    badge: "MEJOR PRECIO",
    precio: 540,
    precioPorTimbre: 9,
    timbres: 60,
    descripcion:
      "El mejor precio por timbre de toda la plataforma. Para alto volumen de facturación, sin pagar mensualidad.",
    incluye: [
      "60 timbres CFDI 4.0",
      "Sin vencimiento",
      "XML descargable",
      "PDF con diseño NEXUM",
    ],
    ahorra: "ahorra 25% vs. arranque",
  },
];

export const contactoNexum = {
  whatsapp: "668 122 0386",
  correo: "aalvarez@corporativoaa.com.mx",
  ubicacion: "Los Mochis, Sinaloa",
};
