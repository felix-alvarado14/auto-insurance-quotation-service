import { responses } from "./responses";
import { schemas } from "./schemas";
import { security, securitySchemes } from "./security";

const apiBaseUrl = process.env.PUBLIC_APP_URL || "http://localhost:3000";

export const openApiDocument = {
  openapi: "3.1.0",
  info: {
    title: "Auto Insurance Quotation Service API",
    description:
      "API for user authentication, product listing, and insurance quotation creation.",
    version: "1.0.0",
  },
  servers: [
    {
      url: apiBaseUrl,
      description: "Application server",
    },
  ],
  tags: [
    {
      name: "Authentication",
      description: "User authentication operations",
    },
    {
      name: "Products",
      description: "Product catalog operations",
    },
    {
      name: "Quotations",
      description: "Insurance quotation operations",
    },
  ],
  paths: {
    "/api/auth/verify": {
      post: {
        tags: ["Authentication"],
        summary: "Authenticate a user",
        description: "Validates the supplied credentials and returns a JWT token.",
        operationId: "verifyAuth",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AuthenticationRequest",
              },
              examples: {
                login: {
                  summary: "Valid login request",
                  value: {
                    identification: "123456789",
                    password: "secret123",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Authentication successful.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AuthenticationResponse",
                },
                examples: {
                  success: {
                    summary: "Successful authentication",
                    value: {
                      success: true,
                      message: "Authentication successful.",
                      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                      user: {
                        id: 1,
                        name: "Juan Pérez",
                        identification: "123456789",
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            $ref: "#/components/responses/BadRequest",
          },
          401: {
            $ref: "#/components/responses/Unauthorized",
          },
          500: {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
    },
    "/api/products": {
      get: {
        tags: ["Products"],
        summary: "List active products",
        description: "Returns the list of active products with pagination metadata.",
        operationId: "listProducts",
        security,
        parameters: [
          {
            name: "page",
            in: "query",
            required: true,
            description: "Page number to retrieve.",
            schema: {
              type: "integer",
              minimum: 1,
              default: 1,
            },
            example: 1,
          },
          {
            name: "limit",
            in: "query",
            required: true,
            description: "Number of products per page.",
            schema: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 10,
            },
            example: 10,
          },
        ],
        responses: {
          200: {
            description: "Products retrieved successfully.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ProductsResponse",
                },
                examples: {
                  products: {
                    summary: "Paginated product list",
                    value: {
                      success: true,
                      message: "Products retrieved successfully.",
                      data: [
                        {
                          id: 1,
                          code: "AUTO-01",
                          name: "Basic Auto Protection",
                          coverageType: "Comprehensive",
                          description: "Coverage for damage and theft.",
                          minVehicleValue: "1000000",
                          maxVehicleValue: "20000000",
                          basePrice: "125000.00",
                          conditions: "Valid for vehicles from 2010 onward.",
                        },
                      ],
                      pagination: {
                        page: 1,
                        limit: 10,
                        total: 1,
                        totalPages: 1,
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            $ref: "#/components/responses/BadRequest",
          },
          500: {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
    },
    "/api/quotations": {
      post: {
        tags: ["Quotations"],
        summary: "Create a quotation",
        description: "Creates an insurance quotation for a given vehicle and product.",
        operationId: "createQuotation",
        security,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/QuotationRequest",
              },
              examples: {
                quotation: {
                  summary: "Typical quotation request",
                  value: {
                    productId: 1,
                    vehicleYear: 2022,
                    vehicleBrand: "Toyota",
                    vehicleModel: "Corolla",
                    vehicleValue: 18000000,
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Quotation created successfully.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/QuotationResponse",
                },
                examples: {
                  success: {
                    summary: "Quotation created",
                    value: {
                      success: true,
                      message: "Quotation created successfully.",
                      data: {
                        reference: "QT-20260723-000001",
                        quotedPrice: "125000.00",
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            $ref: "#/components/responses/BadRequest",
          },
          401: {
            $ref: "#/components/responses/Unauthorized",
          },
          404: {
            $ref: "#/components/responses/NotFound",
          },
          500: {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
    },
  },
  components: {
    securitySchemes,
    schemas,
    responses,
  },
};

export default openApiDocument;
