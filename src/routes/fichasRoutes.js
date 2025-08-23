import express from "express";

import FichaController from "../controllers/FichaController.js";
import { validarFicha, validarFichaParcial } from "../middlewares/entities/fichas/fichaValidator.js";

const router = express.Router();

// Obtener todas las fichas
router.get("/", FichaController.getAllFichas);

// Obtener una ficha por ID
router.get("/:id", FichaController.getFichaById);

// Crear una nueva ficha
router.post("/", validarFicha, FichaController.createFicha);

// Actualizar una ficha
router.put("/:id", validarFicha, FichaController.updateFicha);

// Actualizar una ficha parcialmente
router.patch("/:id", validarFichaParcial, FichaController.updateFicha);

// Eliminar una ficha
router.delete("/:id", FichaController.deleteFicha);

export default router;