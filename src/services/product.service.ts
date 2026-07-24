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

  const total = await prisma.product.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const skip = (page - 1) * limit;

  const products = await prisma.product.findMany({
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
  });

  return {
    success: true,
    message: "Products retrieved successfully.",
    data: products,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}
