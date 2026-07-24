export const securitySchemes = {
  bearerAuth: {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
    description: "JWT access token issued by the authentication endpoint.",
  },
};

export const security = [{ bearerAuth: [] }];
