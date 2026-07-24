import bcrypt from "bcrypt";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { CoverageType, PrismaClient } from "@prisma/client";

const SALT_ROUNDS = 10;
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined.");
}

const connectionUrl = new URL(databaseUrl);

const adapter = new PrismaMariaDb({
  host: connectionUrl.hostname,
  port: Number(connectionUrl.port || 3306),
  user: decodeURIComponent(connectionUrl.username),
  password: decodeURIComponent(connectionUrl.password),
  database: connectionUrl.pathname.replace(/^\//, ""),
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

const users = [
  {
    identification: "0801199912345",
    name: "Felix Alvarado",
    password: "123456",
  },
  {
    identification: "0801198812345",
    name: "Juan Pérez",
    password: "123456",
  },
];

const products = [
  {
    code: "BAS001",
    name: "Seguro Básico",
    coverageType: CoverageType.BASIC,
    description: "Cobertura esencial para vehículos de uso particular en entorno de desarrollo.",
    minVehicleValue: "50000",
    maxVehicleValue: "300000",
    basePrice: "1250.00",
    conditions: "Aplica a vehículos de uso personal con revisión documental básica.",
    isActive: true,
  },
  {
    code: "STD001",
    name: "Seguro Familiar",
    coverageType: CoverageType.STANDARD,
    description: "Cobertura intermedia pensada para pruebas con perfiles familiares.",
    minVehicleValue: "80000",
    maxVehicleValue: "600000",
    basePrice: "2100.00",
    conditions: "Incluye asistencia vial y cobertura ampliada para uso familiar.",
    isActive: true,
  },
  {
    code: "PRM001",
    name: "Seguro Premium",
    coverageType: CoverageType.PREMIUM,
    description: "Cobertura premium para vehículos de mayor valor en ambiente local.",
    minVehicleValue: "150000",
    maxVehicleValue: "1200000",
    basePrice: "3650.00",
    conditions: "Requiere valuación vigente del vehículo y documentos completos.",
    isActive: true,
  },
  {
    code: "PRM002",
    name: "Seguro Todo Riesgo",
    coverageType: CoverageType.PREMIUM,
    description: "Cobertura integral para escenarios de prueba con protección extendida.",
    minVehicleValue: "200000",
    maxVehicleValue: "1500000",
    basePrice: "4900.00",
    conditions: "Considera deducible configurable y revisión previa del vehículo.",
    isActive: true,
  },
];

async function seedUsers() {
  for (const user of users) {
    const passwordHash = await bcrypt.hash(user.password, SALT_ROUNDS);

    await prisma.user.upsert({
      where: { identification: user.identification },
      update: {
        name: user.name,
        passwordHash,
      },
      create: {
        identification: user.identification,
        name: user.name,
        passwordHash,
      },
    });
  }
}

async function seedProducts() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { code: product.code },
      update: product,
      create: product,
    });
  }
}

async function main() {
  await seedUsers();
  await seedProducts();
  console.log("Seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed.", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
