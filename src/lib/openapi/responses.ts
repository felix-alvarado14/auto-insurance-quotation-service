export const responses = {
  BadRequest: {
    description: "The request body or query parameters are invalid.",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ErrorResponse",
        },
        examples: {
          invalidBody: {
            summary: "Validation error in the request body",
            value: {
              success: false,
              message: "Invalid request body.",
              errors: {
                identification: ["Identification is required."],
              },
            },
          },
          invalidQuery: {
            summary: "Validation error in query parameters",
            value: {
              success: false,
              message: "Invalid query parameters.",
              errors: {
                page: ["Page must be greater than or equal to 1."],
              },
            },
          },
        },
      },
    },
  },
  Unauthorized: {
    description: "Authentication is required or the token is invalid.",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ErrorResponse",
        },
        examples: {
          unauthorized: {
            summary: "Missing or invalid bearer token",
            value: {
              success: false,
              message: "Unauthorized.",
            },
          },
        },
      },
    },
  },
  NotFound: {
    description: "The requested resource does not exist.",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ErrorResponse",
        },
        examples: {
          notFound: {
            summary: "Missing product",
            value: {
              success: false,
              message: "Product not found.",
            },
          },
        },
      },
    },
  },
  InternalServerError: {
    description: "Unexpected server error.",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ErrorResponse",
        },
        examples: {
          internalError: {
            summary: "Unexpected error",
            value: {
              success: false,
              message: "Internal server error.",
            },
          },
        },
      },
    },
  },
};
