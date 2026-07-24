export const summaryCards = [
  {
    label: "Cotizaciones activas",
    value: "1,248",
    description: "Cantidad de cotizaciones abiertas en el tablero.",
    trend: "+12 %",
    variant: "success" as const,
  },
  {
    label: "Nuevos productos",
    value: "8",
    description: "Productos añadidos recientemente para pruebas.",
    trend: "Estable",
    variant: "secondary" as const,
  },
  {
    label: "Reservas pendientes",
    value: "34",
    description: "Registros ficticios que muestran el estado de la plataforma.",
    trend: "-3 %",
    variant: "warning" as const,
  },
  {
    label: "Incidencias",
    value: "2",
    description: "Alertas de ejemplo para el tablero administrativo.",
    trend: "Bajo",
    variant: "destructive" as const,
  },
];

export const statistics = {
  totalProducts: 18,
  activeProducts: 12,
  pendingReviews: 6,
};

export const products = [
  {
    code: "BAS001",
    name: "Seguro Básico",
    coverageType: "Básica",
    vehicleValue: "$ 75,000",
    basePrice: "$ 1,250",
    status: "Activo",
    statusVariant: "success" as const,
  },
  {
    code: "STD001",
    name: "Seguro Familiar",
    coverageType: "Estándar",
    vehicleValue: "$ 210,000",
    basePrice: "$ 2,100",
    status: "Activo",
    statusVariant: "success" as const,
  },
  {
    code: "PRM001",
    name: "Seguro Premium",
    coverageType: "Premium",
    vehicleValue: "$ 540,000",
    basePrice: "$ 3,650",
    status: "En revisión",
    statusVariant: "warning" as const,
  },
];
