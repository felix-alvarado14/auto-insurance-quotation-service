# Auto Insurance Quotation Service

Aplicación web para gestionar el flujo de autenticación, consulta de productos y creación de cotizaciones de seguros de automóviles.

## Descripción general

Este proyecto implementa una interfaz administrativa que consume un backend basado en Next.js y expone un flujo claro para:

- iniciar sesión con JWT,
- consultar el catálogo de productos disponibles,
- completar una nueva cotización con los datos del vehículo,
- visualizar el resultado generado por el servicio backend.

La aplicación está pensada como una solución de presentación y operación para una aseguradora, con una arquitectura simple, directa y enfocada en la verdad del negocio.

## Objetivo

Resolver la necesidad de manejar de forma ordenada y consistente el proceso inicial de cotización de seguros automotrices, evitando que la interfaz frontend asuma lógica de negocio propia y adaptándose estrictamente al contrato del backend.

## Características principales

- Autenticación JWT
- Consulta de productos
- Creación de cotizaciones
- Documentación OpenAPI / Swagger
- Arquitectura basada en Next.js App Router y servicios

## Tecnologías utilizadas

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- Lucide React

### Backend

- Next.js Route Handlers
- JWT para autenticación
- Validaciones de entrada con Zod
- Servicios y utilidades organizados por dominio

### Base de datos

- MySQL
- Prisma ORM

### Herramientas

- Docker Compose
- ESLint
- Prisma Migrate
- Swagger UI

## Arquitectura

La solución sigue una arquitectura mínima y mantenible:

- el frontend representa la información entregada por el backend,
- las rutas API de Next.js actúan como capa de integración,
- la lógica de negocio se encapsula en servicios y validaciones,
- Prisma define el modelo de persistencia y la base de datos es la fuente de verdad.

## Flujo de funcionamiento

1. Login
2. Consulta de productos
3. Nueva cotización

El usuario se autentica, obtiene acceso al catálogo de productos y luego completa los datos del vehículo para generar la cotización correspondiente.

## Instalación

### Requisitos

- Node.js 20+
- npm
- MySQL en ejecución
- Docker Compose (opcional para base de datos local)

### Variables de entorno

Crea un archivo `.env` basado en `.env.example` y completa las variables requeridas:

```bash
DATABASE_URL="mysql://MYSQL_USER:MYSQL_PASSWORD@MYSQL_HOST:MYSQL_PORT/MYSQL_DATABASE"
MYSQL_HOST=
MYSQL_PORT=
MYSQL_DATABASE=
MYSQL_USER=
MYSQL_PASSWORD=
JWT_SECRET=
JWT_EXPIRES_IN=
```

### Instalación

```bash
npm install
```

### Migraciones

Aplicar esquema de base de datos con Prisma:

```bash
npx prisma migrate dev
```

### Seed

El proyecto incluye un script de seed para inicializar datos base:

```bash
node prisma/seed.mjs
```

### Inicio del proyecto

Para iniciar la aplicación en modo desarrollo:

```bash
npm run dev
```

### Docker

Si deseas levantar la base de datos con Docker Compose:

```bash
docker compose up -d
```

## Documentación API

La documentación OpenAPI / Swagger está disponible a través de la ruta:

```text
/api/docs
```

## Estructura del proyecto

- `src/app/`: rutas, páginas y handlers de la aplicación Next.js
- `src/components/`: componentes reutilizables de UI y layout
- `src/lib/`: utilidades, validaciones, autenticación y helpers
- `src/services/`: servicios de acceso a lógica y negocio
- `prisma/`: esquema, migraciones y seed
- `public/`: assets estáticos

## Decisiones técnicas

- El backend es la fuente de verdad del sistema.
- El frontend se adapta al contrato del backend y no introduce lógica duplicada.
- Se utiliza `fetch` directo para consumir la API del proyecto.
- La arquitectura es simple y explícita para evitar sobreingeniería.
- El objetivo es mantener el proyecto fácil de comprender, mantener y presentar.

## Posibles mejoras futuras

- ampliar la cobertura de pruebas automatizadas,
- añadir paginación y filtros avanzados en la UI,
- mejorar la gestión de estados de errores y observabilidad,
- preparar un entorno de despliegue más robusto en producción.

## Autor

Proyecto desarrollado como servicio de cotización de seguros automotrices con enfoque en claridad de flujo, estructura mantenible y presentación técnica profesional.

