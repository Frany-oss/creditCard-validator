import express from "express";
import mongoose from "mongoose";
import errorHandler from "./middleware/errorHandler";
import cardRoutes from "./routes/card.routes";

import swaggerOptions from "./swaggerOptions";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
require('dotenv').config();
const serverless = require("serverless-http");
const PORT = process.env.PORT || 3456;

app.use(express.json());
const specs = swaggerJsdoc(swaggerOptions)

mongoose.connect(process.env.URI || "");

app.use("/api/cards", cardRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(errorHandler);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

export { app };
module.exports.handler = serverless(app);