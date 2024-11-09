import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import router from "./routes/index.js"; // Rutas
import { errorHandle } from "./errors/errHandle.js"; // Middleware de manejo de errores
import { logger } from "./utils/logger.js"; // Logger personalizado
import swaggerUiExpress from "swagger-ui-express";
import { specs } from "./config/swagger.config.js"; // Configuración de Swagger

const app = express();
const PORT = process.env.PORT || 8080;

// Conectar con MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://nicoprado7:vqZRIUO8QORZOGlI@cluster0.lqucksl.mongodb.net/proyectoBackendFinal?retryWrites=true&w=majority&appName=Cluster0`
    );
    logger.info("Base de datos conectada correctamente");
  } catch (error) {
    logger.error("Error al conectar con la base de datos:", error);
    process.exit(1); // Si la conexión falla, salimos de la aplicación
  }
};

app.use(express.json());
app.use(cookieParser());

// Configuración de Swagger
app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// Rutas principales de la API
app.use("/api", router);

// Middleware de manejo de errores
app.use(errorHandle);

// Inicializa la base de datos y luego inicia el servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`El servidor está corriendo en http://localhost:${PORT}`);
    logger.info(`La documentación de la API está disponible en http://localhost:${PORT}/api-docs/`);
  });
});
