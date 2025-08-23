import express from "express";

import RolController from "../controllers/RolController.js";
import { validarRol, validarRolParcial } from "../middlewares/entities/roles/rolValidator.js";

const router = express.Router();

// Obtener todos los roles
router.get("/", RolController.getAllRoles);

// Obtener un rol por ID
router.get("/:id", RolController.getRolById);

// Crear un nuevo rol
router.post("/", validarRol, RolController.createRol);

// Actualizar un rol
router.put("/:id", validarRol, RolController.updateRol);

// Actualizar un rol parcialmente
router.patch("/:id", validarRolParcial, RolController.updateRol);

// Eliminar un rol
router.delete("/:id", RolController.deleteRol);

export default router;