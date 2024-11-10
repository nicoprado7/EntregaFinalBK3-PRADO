import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import { errorHandle } from "./errors/errHandle.js";
import { logger } from "./utils/logger.js";
import swaggerUiExpress from "swagger-ui-express";
import { specs } from "./config/swagger.config.js";

const app = express();
const PORT = process.env.PORT || 8080;

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://nicoprado7:vqZRIUO8QORZOGlI@cluster0.lqucksl.mongodb.net/proyectoBackendFinal?retryWrites=true&w=majority&appName=Cluster0`
    );
    logger.info("Base de datos conectada correctamente");
  } catch (error) {
    logger.error("Error al conectar con la base de datos:", error);
    process.exit(1);
  }
};

app.use(express.json());
app.use(cookieParser());
app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.use("/api", router);
app.use(errorHandle);

connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`El servidor está corriendo en http://localhost:${PORT}`);
    logger.info(`La documentación de la API está disponible en http://localhost:${PORT}/api-docs/`);
  });
});
