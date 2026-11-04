import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import swaggerJSDoc from "swagger-jsdoc";
import { apiReference } from "@scalar/express-api-reference";
import swaggerOptions from "./openapi.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

const openapiDocument = swaggerJSDoc(swaggerOptions);

// Enable CORS for mobile web and external clients
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

app.get("/openapi.json", (req, res) => {
  res.json(openapiDocument);
});

app.use(
  "/docs",
  apiReference({
    url: "/openapi.json",
  })
);

app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Backend is running successfully",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message || error);
  }
};

startServer();
