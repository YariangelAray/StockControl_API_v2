import express from "express";

import ProgramaFormacionController from "../controllers/ProgramaFormacionController.js";
import { validarPrograma, validarProgramaParcial } from "../middlewares/entities/programasFormacion/programaValidator.js";

const router = express.Router();

// Obtener todos los programas de formación
router.get("/", ProgramaFormacionController.getAllProgramas);

// Obtener un programa de formación por ID
router.get("/:id", ProgramaFormacionController.getProgramaFormacionById);

// Crear un nuevo programa de formación
router.post("/", validarPrograma, ProgramaFormacionController.createProgramaFormacion);

// Actualizar un programa de formación
router.put("/:id", validarPrograma, ProgramaFormacionController.updateProgramaFormacion);

// Actualizar un programa de formación parcialmente
router.patch("/:id", validarProgramaParcial, ProgramaFormacionController.updateProgramaFormacion);

// Eliminar un programa de formación
router.delete("/:id", ProgramaFormacionController.deleteProgramaFormacion);

export default router;