import express from "express";

import FichaController from "../controllers/FichaController.js";
import { validarFicha, validarFichaParcial } from "../middlewares/entities/fichas/fichaValidator.js";
import authenticate from "../middlewares/auth/authenticate.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todas las fichas
router.get("/", FichaController.getAllFichas);

// Obtener una ficha por ID
router.get("/:id", FichaController.getFichaById);

// Crear una nueva ficha
router.post("/", authenticate, authorize('ficha.create'), validarFicha, FichaController.createFicha);

// Actualizar una ficha
router.put("/:id", authenticate, authorize('ficha.update'), validarFicha, FichaController.updateFicha);

// Actualizar una ficha parcialmente
router.patch("/:id", authenticate, authorize('ficha.update'), validarFichaParcial, FichaController.updateFicha);

// Eliminar una ficha
router.delete("/:id", authenticate, authorize('ficha.delete'), FichaController.deleteFicha);

export default router;