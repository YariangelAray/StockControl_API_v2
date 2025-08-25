import express from "express";

import EstadoController from "../controllers/EstadoController.js";
import { validarEstado, validarEstadoParcial } from "../middlewares/entities/estados/estadoValidator.js";
import authorize from "../middlewares/auth/authorize.js";
import authenticate from "../middlewares/auth/authenticate.js";

const router = express.Router();

// Obtener todos los estados
router.get("/", authenticate, authorize('estado.view'), EstadoController.getAllEstados);

// Obtener un estado por ID
router.get("/:id", authenticate, authorize('estado.view'), EstadoController.getEstadoById);

// Crear un nuevo estado
router.post("/", authenticate, authorize('estado.create'), validarEstado, EstadoController.createEstado);

// Actualizar un estado
router.put("/:id", authenticate, authorize('estado.update'), validarEstado, EstadoController.updateEstado);

// Actualizar un estado parcialmente
router.patch("/:id", authenticate, authorize('estado.update'), validarEstadoParcial, EstadoController.updateEstado);

// Eliminar un estado
router.delete("/:id", authenticate, authorize('estado.delete'), EstadoController.deleteEstado);

export default router;