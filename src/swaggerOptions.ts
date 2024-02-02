import { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  swaggerDefinition: {
    info: {
      title: "Culqi card validation backend",
      version: "1.0.0",
      description: "Backend service to validate card token and retreive ",
    },
  },
  apis: ["./src/routes/*.ts"],
};

export default swaggerOptions;
