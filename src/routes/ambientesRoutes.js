import express from "express";

import AmbienteController from "../controllers/AmbienteController.js";
import { validarAmbiente, validarAmbienteParcial } from "../middlewares/entities/ambientes/ambienteValidator.js";
import authorize from "../middlewares/auth/authorize.js";
import authenticate from "../middlewares/auth/authenticate.js";

const router = express.Router();

// Obtener todos los ambientes
router.get("/", authenticate, authorize('ambiente.view'), AmbienteController.getAllAmbientes);

// Obtener un ambiente por ID
router.get("/:id", authenticate, authorize('ambiente.view'), AmbienteController.getAmbienteById);

// Crear un nuevo ambiente
router.post("/", authenticate, authorize('ambiente.create'), validarAmbiente, AmbienteController.createAmbiente);

// Actualizar un ambiente
router.put("/:id", authenticate, authorize('ambiente.update'), validarAmbiente, AmbienteController.updateAmbiente);

// Actualizar un ambiente parcialmente
router.patch("/:id", authenticate, authorize('ambiente.update'), validarAmbienteParcial, AmbienteController.updateAmbiente);

// Eliminar un ambiente
router.delete("/:id", authenticate, authorize('ambiente.delete'), AmbienteController.deleteAmbiente);

export default router;