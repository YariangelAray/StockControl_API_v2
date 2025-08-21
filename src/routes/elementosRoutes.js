import express from "express";

import ElementoController from "../controllers/ElementoController.js";
import { validarElemento, validarElementoParcial } from "../middlewares/entities/elementos/elementoValidator.js";

const router = express.Router();

// Obtener todos los elementos
router.get("/", ElementoController.getAllElementos);

// Obtener un elemento por ID
router.get("/:id", ElementoController.getElementoById);

// Crear un nuevo elemento
router.post("/", validarElemento, ElementoController.createElemento);

// Actualizar un elemento
router.put("/:id", validarElemento, ElementoController.updateElemento);

// Actualizar un elemento parcialmente
router.patch("/:id", validarElementoParcial, ElementoController.updateElemento);

// Eliminar un elemento
router.delete("/:id", ElementoController.deleteElemento);

export default router;