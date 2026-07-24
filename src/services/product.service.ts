import { prisma } from "@/lib/prisma";
import type { ProductsQueryInput } from "@/lib/validations/products";

export type ProductResponse = {
  id: number;
  code: string;
  name: string;
  coverageType: string;
  description: string;
  minVehicleValue: string;
  maxVehicleValue: string;
  basePrice: string;
  conditions: string;
};

export type ProductsPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type GetProductsResult = {
  success: true;
  message: "Products retrieved successfully.";
  data: ProductResponse[];
  pagination: ProductsPagination;
};

export async function getProducts(input: ProductsQueryInput): Promise<GetProductsResult> {
  const { page, limit } = input;

  const where = {
    isActive: true,
  };

  const skip = (page - 1) * limit;

  const [total, products] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        id: "asc",
      },
      select: {
        id: true,
        code: true,
        name: true,
        coverageType: true,
        description: true,
        minVehicleValue: true,
        maxVehicleValue: true,
        basePrice: true,
        conditions: true,
      },
    }),
  ]);

  const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

  return {
    success: true,
    message: "Products retrieved successfully.",
    data: products.map((product) => ({
      id: product.id,
      code: product.code,
      name: product.name,
      coverageType: product.coverageType,
      description: product.description,
      minVehicleValue: product.minVehicleValue.toString(),
      maxVehicleValue: product.maxVehicleValue.toString(),
      basePrice: product.basePrice.toString(),
      conditions: product.conditions,
    })),
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}
