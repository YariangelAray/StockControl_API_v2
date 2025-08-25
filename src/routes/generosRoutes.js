import express from "express";

import GeneroController from "../controllers/GeneroController.js";
import { validarGenero, validarGeneroParcial } from "../middlewares/entities/generos/generoValidator.js";
import { authenticate } from "../middlewares/auth/authenticate.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los generos
router.get("/", authenticate, authorize('genero.view'), GeneroController.getAllGeneros);

// Obtener un genero por ID
router.get("/:id", authenticate, authorize('genero.view'), GeneroController.getGeneroById);

// Crear un nuevo genero
router.post("/", authenticate, authorize('genero.create'), validarGenero, GeneroController.createGenero);

// Actualizar un genero
router.put("/:id", authenticate, authorize('genero.update'), validarGenero, GeneroController.updateGenero);

// Actualizar un genero parcialmente
router.patch("/:id", authenticate, authorize('genero.update'), validarGeneroParcial, GeneroController.updateGenero);

// Eliminar un genero
router.delete("/:id", authenticate, authorize('genero.delete'), GeneroController.deleteGenero);

export default router;