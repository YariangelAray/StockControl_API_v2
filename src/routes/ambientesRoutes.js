import express from "express";

import AmbienteController from "../controllers/AmbienteController.js";
import { validarAmbiente, validarAmbienteParcial } from "../middlewares/entities/ambientes/ambienteValidator.js";

const router = express.Router();

// Obtener todos los ambientes
router.get("/", AmbienteController.getAllAmbientes);

// Obtener un ambiente por ID
router.get("/:id", AmbienteController.getAmbienteById);

// Crear un nuevo ambiente
router.post("/", validarAmbiente, AmbienteController.createAmbiente);

// Actualizar un ambiente
router.put("/:id", validarAmbiente, AmbienteController.updateAmbiente);

// Actualizar un ambiente parcialmente
router.patch("/:id", validarAmbienteParcial, AmbienteController.updateAmbiente);

// Eliminar un ambiente
router.delete("/:id", AmbienteController.deleteAmbiente);

export default router;