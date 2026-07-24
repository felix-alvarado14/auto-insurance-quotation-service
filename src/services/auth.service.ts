import bcrypt from "bcrypt";

import { generateToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import type { VerifyAuthInput } from "@/lib/validations/auth";

type AuthenticatedUser = {
  id: number;
  name: string;
  identification: string;
};

type VerifyAuthResult = {
  success: true;
  message: "Authentication successful.";
  token: string;
  user: AuthenticatedUser;
};

export class AuthenticationError extends Error {
  constructor(message = "Invalid credentials.") {
    super(message);
    this.name = "AuthenticationError";
  }
}

export async function verifyCredentials(input: VerifyAuthInput): Promise<VerifyAuthResult> {
  const user = await prisma.user.findUnique({
    where: {
      identification: input.identification,
    },
  });

  if (!user) {
    throw new AuthenticationError();
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.passwordHash);

  if (!isPasswordValid) {
    throw new AuthenticationError();
  }

  const token = generateToken({
    sub: String(user.id),
    identification: user.identification,
  });

  return {
    success: true,
    message: "Authentication successful.",
    token,
    user: {
      id: user.id,
      name: user.name,
      identification: user.identification,
    },
  };
}
