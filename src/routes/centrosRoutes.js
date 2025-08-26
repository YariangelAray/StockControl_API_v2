import express from "express";

import CentroController from "../controllers/CentroController.js";
import { validarCentro, validarCentroParcial } from "../middlewares/entities/centros/centroValidator.js";
import authenticate from "../middlewares/auth/authenticate.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los centros
router.get("/", CentroController.getAllCentros);

// Obtener un centro por ID
router.get("/:id", CentroController.getCentroById);

// Crear un nuevo centro
router.post("/", authenticate, authorize('centro.create'), validarCentro, CentroController.createCentro);

// Actualizar un centro
router.put("/:id", authenticate, authorize('centro.update'), validarCentro, CentroController.updateCentro);

// Actualizar un centro parcialmente
router.patch("/:id", authenticate, authorize('centro.update'), validarCentroParcial, CentroController.updateCentro);

// Eliminar un centro
router.delete("/:id", authenticate, authorize('centro.delete'), CentroController.deleteCentro);

export default router;