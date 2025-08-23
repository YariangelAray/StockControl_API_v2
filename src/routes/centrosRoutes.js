import express from "express";

import CentroController from "../controllers/CentroController.js";
import { validarCentro, validarCentroParcial } from "../middlewares/entities/centros/centroValidator.js";

const router = express.Router();

// Obtener todos los centros
router.get("/", CentroController.getAllCentros);

// Obtener un centro por ID
router.get("/:id", CentroController.getCentroById);

// Crear un nuevo centro
router.post("/", validarCentro, CentroController.createCentro);

// Actualizar un centro
router.put("/:id", validarCentro, CentroController.updateCentro);

// Actualizar un centro parcialmente
router.patch("/:id", validarCentroParcial, CentroController.updateCentro);

// Eliminar un centro
router.delete("/:id", CentroController.deleteCentro);

export default router;