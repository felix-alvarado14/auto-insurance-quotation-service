import { prisma } from "@/lib/prisma";

export async function generateQuotationReference(): Promise<string> {
  const quotationCount = await prisma.quotation.count();
  const sequence = String(quotationCount + 1).padStart(6, "0");
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `AQ-${year}${month}${day}-${sequence}`;
}
