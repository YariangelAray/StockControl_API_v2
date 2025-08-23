import express from "express";

import RolUsuarioController from "../controllers/RolUsuarioController.js";
import { validarRolUsuario, validarRolUsuarioParcial } from "../middlewares/entities/rolesUsuarios/rolUsuarioValidator.js";


const router = express.Router();

// Obtener todas las relaciones rol-usuario
router.get("/", RolUsuarioController.getAllRolesUsuarios);

// Obtener una relación rol-usuario por ID
router.get("/:id", RolUsuarioController.getRolUsuarioById);

// Crear una nueva relación rol-usuario
router.post("/", validarRolUsuario, RolUsuarioController.createRolUsuario);

// Actualizar una relación rol-usuario
router.put("/:id", validarRolUsuario, RolUsuarioController.updateRolUsuario);

// Actualizar una relación rol-usuario parcialmente
router.patch("/:id", validarRolUsuarioParcial, RolUsuarioController.updateRolUsuario);

// Eliminar una relación rol-usuario
router.delete("/:id", RolUsuarioController.deleteRolUsuario);

export default router;