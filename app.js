import express from "express"; // Importa el módulo Express para crear el servidor
import dotenv from "dotenv"; // Importa dotenv para cargar variables de entorno
import cors from "cors"; // Importa cors para habilitar CORS en la aplicación
import cookieParser from "cookie-parser"; // Importa cookie-parser para manejar cookies

import rutas from './src/routes/index.js'; // Importa las rutas definidas en el archivo de rutas
import { ResponseProvider } from "./src/providers/ResponseProvider.js"; // Importa el proveedor de respuestas para manejar respuestas de la API

dotenv.config(); // Carga las variables de entorno desde el archivo .env

// Crear la instancia de Express
const app = express(); // Inicializa una nueva aplicación Express
const API_BASE_PATH = process.env.API_BASE_PATH || "/stockcontrol_api"; // Define la ruta base de la API

// ─────────────────────────────────────────────
// 🔧 Middlewares globales
// ─────────────────────────────────────────────
app.use(cors({ origin: true, credentials: true })); // Habilita CORS para permitir solicitudes desde otros orígenes
app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.urlencoded({ extended: true })); // Middleware para parsear datos URL-encoded
app.use(cookieParser()); // Middleware para parsear cookies en las solicitudes

// ─────────────────────────────────────────────
// 📁 Archivos estáticos
// ─────────────────────────────────────────────
app.use(express.static('public')); // Sirve archivos estáticos desde la carpeta 'public'
app.use('/fotos_reportes', express.static('public/img/reportes')); // Sirve imágenes de reportes desde la carpeta específica

// ─────────────────────────────────────────────
// 📌 Ruta principal de documentación
// ─────────────────────────────────────────────
app.get(API_BASE_PATH, (req, res) => { // Define una ruta GET para la documentación de la API
  res.sendFile('endpoints.html', { root: './public' }); // Envía el archivo 'endpoints.html' como respuesta
});

// ─────────────────────────────────────────────
// 🚦 Rutas dinámicas (API)
// ─────────────────────────────────────────────
rutas.forEach(({ path, router }) => { // Itera sobre las rutas definidas
  app.use(API_BASE_PATH + path, router); // Asocia cada ruta con su respectivo router
});

// ─────────────────────────────────────────────
// ❌ Middleware 404
// ─────────────────────────────────────────────
app.use((req, res, next) => { // Middleware para manejar rutas no encontradas
  const mensaje = `Recurso no encontrado: [${req.method}] ${req.originalUrl}`; // Mensaje de error con el método y la URL solicitada
  return ResponseProvider.error(res, mensaje, 404); // Envía una respuesta de error 404 (Not Found)
});

// ─────────────────────────────────────────────
// 🚀 Inicio del servidor
// ─────────────────────────────────────────────
const port = process.env.PORT || 3000; // Define el puerto en el que se ejecutará el servidor
app.listen(port, () => { // Inicia el servidor y escucha en el puerto definido
  console.log(`Servidor corriendo en http://localhost:${port}${API_BASE_PATH}`); // Mensaje en consola indicando que el servidor está en funcionamiento
});
