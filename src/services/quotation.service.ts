import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { generateQuotationReference } from "@/lib/quotation-reference";
import type { QuotationCreateInput } from "@/lib/validations/quotations";

export type CreateQuotationResult = {
  success: true;
  message: "Quotation created successfully.";
  data: {
    reference: string;
    quotedPrice: string;
  };
};

export class QuotationServiceError extends Error {
  status: number;
  body: {
    success: false;
    message: string;
  };

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.body = {
      success: false,
      message,
    };
  }
}

export async function createQuotation(
  input: QuotationCreateInput & { userId: number },
): Promise<CreateQuotationResult> {
  const product = await prisma.product.findUnique({
    where: {
      id: input.productId,
    },
    select: {
      id: true,
      name: true,
      coverageType: true,
      isActive: true,
      minVehicleValue: true,
      maxVehicleValue: true,
      basePrice: true,
    },
  });

  if (!product) {
    throw new QuotationServiceError(404, "Product not found.");
  }

  if (!product.isActive) {
    throw new QuotationServiceError(400, "Product is inactive.");
  }

  const vehicleValue = input.vehicleValue;
  const minVehicleValue = product.minVehicleValue.toNumber();
  const maxVehicleValue = product.maxVehicleValue.toNumber();

  if (vehicleValue < minVehicleValue || vehicleValue > maxVehicleValue) {
    throw new QuotationServiceError(
      400,
      "Vehicle value is outside the allowed range for this product.",
    );
  }

  const reference = await generateQuotationReference();

  const quotation = await prisma.quotation.create({
    data: {
      reference,
      vehicleYear: input.vehicleYear,
      vehicleBrand: input.vehicleBrand,
      vehicleModel: input.vehicleModel,
      vehicleValue: new Prisma.Decimal(input.vehicleValue),
      quotedPrice: product.basePrice,
      productName: product.name,
      coverageType: product.coverageType,
      userId: input.userId,
      productId: product.id,
    },
  });

  return {
    success: true,
    message: "Quotation created successfully.",
    data: {
      reference: quotation.reference,
      quotedPrice: quotation.quotedPrice.toFixed(2),
    },
  };
}
