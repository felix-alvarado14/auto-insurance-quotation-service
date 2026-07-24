export const schemas = {
  AuthenticationRequest: {
    type: "object",
    required: ["identification", "password"],
    properties: {
      identification: {
        type: "string",
        minLength: 1,
        description: "User identification number.",
        example: "123456789",
      },
      password: {
        type: "string",
        minLength: 1,
        description: "User password.",
        example: "secret123",
      },
    },
  },
  UserProfile: {
    type: "object",
    required: ["id", "name", "identification"],
    properties: {
      id: {
        type: "integer",
        example: 1,
      },
      name: {
        type: "string",
        example: "Juan Pérez",
      },
      identification: {
        type: "string",
        example: "123456789",
      },
    },
  },
  AuthenticationResponse: {
    type: "object",
    required: ["success", "message", "token", "user"],
    properties: {
      success: {
        type: "boolean",
        example: true,
      },
      message: {
        type: "string",
        example: "Authentication successful.",
      },
      token: {
        type: "string",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      },
      user: {
        $ref: "#/components/schemas/UserProfile",
      },
    },
  },
  Product: {
    type: "object",
    required: [
      "id",
      "code",
      "name",
      "coverageType",
      "description",
      "minVehicleValue",
      "maxVehicleValue",
      "basePrice",
      "conditions",
    ],
    properties: {
      id: {
        type: "integer",
        example: 1,
      },
      code: {
        type: "string",
        example: "AUTO-01",
      },
      name: {
        type: "string",
        example: "Basic Auto Protection",
      },
      coverageType: {
        type: "string",
        example: "Comprehensive",
      },
      description: {
        type: "string",
        example: "Coverage for damage and theft.",
      },
      minVehicleValue: {
        type: "string",
        example: "1000000",
      },
      maxVehicleValue: {
        type: "string",
        example: "20000000",
      },
      basePrice: {
        type: "string",
        example: "125000.00",
      },
      conditions: {
        type: "string",
        example: "Valid for vehicles from 2010 onward.",
      },
    },
  },
  Pagination: {
    type: "object",
    required: ["page", "limit", "total", "totalPages"],
    properties: {
      page: {
        type: "integer",
        minimum: 1,
        example: 1,
      },
      limit: {
        type: "integer",
        minimum: 1,
        maximum: 100,
        example: 10,
      },
      total: {
        type: "integer",
        example: 2,
      },
      totalPages: {
        type: "integer",
        example: 1,
      },
    },
  },
  ProductsResponse: {
    type: "object",
    required: ["success", "message", "data", "pagination"],
    properties: {
      success: {
        type: "boolean",
        example: true,
      },
      message: {
        type: "string",
        example: "Products retrieved successfully.",
      },
      data: {
        type: "array",
        items: {
          $ref: "#/components/schemas/Product",
        },
      },
      pagination: {
        $ref: "#/components/schemas/Pagination",
      },
    },
  },
  QuotationRequest: {
    type: "object",
    required: ["productId", "vehicleYear", "vehicleBrand", "vehicleModel", "vehicleValue"],
    properties: {
      productId: {
        type: "integer",
        minimum: 1,
        example: 1,
      },
      vehicleYear: {
        type: "integer",
        minimum: 1980,
        maximum: 2027,
        example: 2022,
      },
      vehicleBrand: {
        type: "string",
        maxLength: 50,
        example: "Toyota",
      },
      vehicleModel: {
        type: "string",
        maxLength: 50,
        example: "Corolla",
      },
      vehicleValue: {
        type: "number",
        minimum: 0,
        example: 18000000,
      },
    },
  },
  QuotationData: {
    type: "object",
    required: ["reference", "quotedPrice"],
    properties: {
      reference: {
        type: "string",
        example: "QT-20260723-000001",
      },
      quotedPrice: {
        type: "string",
        example: "125000.00",
      },
    },
  },
  QuotationResponse: {
    type: "object",
    required: ["success", "message", "data"],
    properties: {
      success: {
        type: "boolean",
        example: true,
      },
      message: {
        type: "string",
        example: "Quotation created successfully.",
      },
      data: {
        $ref: "#/components/schemas/QuotationData",
      },
    },
  },
  ErrorResponse: {
    type: "object",
    required: ["success", "message"],
    properties: {
      success: {
        type: "boolean",
        example: false,
      },
      message: {
        type: "string",
        example: "Invalid request body.",
      },
      errors: {
        $ref: "#/components/schemas/ValidationError",
      },
    },
  },
  ValidationError: {
    type: "object",
    additionalProperties: {
      type: "array",
      items: {
        type: "string",
      },
    },
    example: {
      identification: ["Identification is required."],
    },
  },
};
