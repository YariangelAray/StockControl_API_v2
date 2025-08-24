import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import rutas from './src/routes/index.js';
import { ResponseProvider } from "./src/providers/ResponseProvider.js";

dotenv.config();

// Crear la instancia de Express
const app = express();

// Habilita CORS
app.use(cors({
  origin: true,
  credentials: true,
}));

// Permite que la app acepte datos JSON
// app.use(bodyParser.json());
app.use(express.json());

// Permite el envio de datos de tipo urlencode
app.use(express.urlencoded({ extended: true }));

// Permite manejar cookies en las respuestas.
app.use(cookieParser());

// Rutas
rutas.forEach(({ path, router }) => {
  app.use('/stockcontrol_api' + path, router);
});

app.use(express.static('public'));

app.get('/stockcontrol_api', (req, res) => {
  res.sendFile('endpoints.html', { root: './public' });
});

// Rutas estáticas para las fotos de reportes
app.use('/fotos_reportes', express.static('public/img/reportes'));

// Este middleware debe ir al final de todas tus rutas
app.use((req, res, next) => {
  const mensaje = `Recurso no encontrado: [${req.method}] ${req.originalUrl}`;
  return ResponseProvider.error(res, mensaje, 404);
});



// Puerto para ejecutar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}/stockcontrol_api`);
});