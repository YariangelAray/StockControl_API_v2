import express from "express";

import EstadoController from "../controllers/EstadoController.js";
import { validarEstado, validarEstadoParcial } from "../middlewares/entities/estados/estadoValidator.js";

const router = express.Router();

// Obtener todos los estados
router.get("/", EstadoController.getAllEstados);

// Obtener un estado por ID
router.get("/:id", EstadoController.getEstadoById);

// Crear un nuevo estado
router.post("/", validarEstado, EstadoController.createEstado);

// Actualizar un estado
router.put("/:id", validarEstado, EstadoController.updateEstado);

// Actualizar un estado parcialmente
router.patch("/:id", validarEstadoParcial, EstadoController.updateEstado);

// Eliminar un estado
router.delete("/:id", EstadoController.deleteEstado);

export default router;