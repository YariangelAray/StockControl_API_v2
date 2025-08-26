import express from "express";

import ProgramaFormacionController from "../controllers/ProgramaFormacionController.js";
import { validarPrograma, validarProgramaParcial } from "../middlewares/entities/programasFormacion/programaValidator.js";
import authenticate from "../middlewares/auth/authenticate.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los programas de formación
router.get("/", ProgramaFormacionController.getAllProgramas);

// Obtener un programa de formación por ID
router.get("/:id", ProgramaFormacionController.getProgramaFormacionById);

// Crear un nuevo programa de formación
router.post("/",  authenticate, authorize('programa-formacion.create'), validarPrograma, ProgramaFormacionController.createProgramaFormacion);

// Actualizar un programa de formación
router.put("/:id", authenticate, authorize('programa-formacion.update'), validarPrograma, ProgramaFormacionController.updateProgramaFormacion);

// Actualizar un programa de formación parcialmente
router.patch("/:id", authenticate, authorize('programa-formacion.update'), validarProgramaParcial, ProgramaFormacionController.updateProgramaFormacion);

// Eliminar un programa de formación
router.delete("/:id", authenticate, authorize('programa-formacion.delete'), ProgramaFormacionController.deleteProgramaFormacion);

export default router;