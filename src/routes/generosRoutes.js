import express from "express";

import GeneroController from "../controllers/GeneroController.js";
import { validarGenero, validarGeneroParcial } from "../middlewares/entities/generos/generoValidator.js";

const router = express.Router();

// Obtener todos los generos
router.get("/", GeneroController.getAllGeneros);

// Obtener un genero por ID
router.get("/:id", GeneroController.getGeneroById);

// Crear un nuevo genero
router.post("/", validarGenero, GeneroController.createGenero);

// Actualizar un genero
router.put("/:id", validarGenero, GeneroController.updateGenero);

// Actualizar un genero parcialmente
router.patch("/:id", validarGeneroParcial, GeneroController.updateGenero);

// Eliminar un genero
router.delete("/:id", GeneroController.deleteGenero);

export default router;