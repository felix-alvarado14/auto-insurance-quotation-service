import { jwtVerify } from "jose";
import jwt from "jsonwebtoken";
import type { Secret, SignOptions } from "jsonwebtoken";

import type { JwtPayload } from "@/types/jwt";

type GenerateTokenInput = {
  sub: string;
  identification: string;
};

function getJwtSecret(): Secret {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined.");
  }

  return secret as Secret;
}

function getJwtExpiresIn(): SignOptions["expiresIn"] {
  const expiresIn = process.env.JWT_EXPIRES_IN;

  if (!expiresIn) {
    throw new Error("JWT_EXPIRES_IN is not defined.");
  }

  return expiresIn as SignOptions["expiresIn"];
}

function isJwtPayload(value: unknown): value is JwtPayload {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Partial<JwtPayload>;

  return typeof candidate.sub === "string" && typeof candidate.identification === "string";
}

export function generateToken(input: GenerateTokenInput): string {
  return jwt.sign(
    {
      identification: input.identification,
    },
    getJwtSecret(),
    {
      subject: input.sub,
      expiresIn: getJwtExpiresIn(),
    },
  );
}

export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const secret = getJwtSecret();
    const encodedSecret = new TextEncoder().encode(String(secret));
    const { payload } = await jwtVerify(token, encodedSecret);

    if (!isJwtPayload(payload)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
