import express from "express";

import RolUsuarioController from "../controllers/RolUsuarioController.js";
import { validarRolUsuario, validarRolUsuarioParcial } from "../middlewares/entities/rolesUsuarios/rolUsuarioValidator.js";
import authenticate from "../middlewares/auth/authenticate.js";
import authorize from "../middlewares/auth/authorize.js";


const router = express.Router();

// Obtener todas las relaciones rol-usuario por usuario id
router.get("/usuario/:usuarioId", authenticate, authorize('usuario.view-role'), RolUsuarioController.getAllRolesUsuariosByUsuarioId);

// Obtener todas las relaciones rol-usuario
router.get("/", authenticate, authorize('rol-usuario.view'), RolUsuarioController.getAllRolesUsuarios);

// Obtener una relación rol-usuario por ID
router.get("/:id", authenticate, authorize('rol-usuario.view'), RolUsuarioController.getRolUsuarioById);

// Crear una nueva relación rol-usuario
router.post("/", authenticate, authorize('usuario.assign-role'), validarRolUsuario, RolUsuarioController.createRolUsuario);

// Actualizar una relación rol-usuario
router.put("/:id", authenticate, authorize('usuario.update-role'), validarRolUsuario, RolUsuarioController.updateRolUsuario);

// Actualizar una relación rol-usuario parcialmente
router.patch("/:id", authenticate, authorize('usuario.update-role'), validarRolUsuarioParcial, RolUsuarioController.updateRolUsuario);

// Eliminar una relación rol-usuario
router.delete("/:id", authenticate, authorize('usuario.delete-role'), RolUsuarioController.deleteRolUsuario);

export default router;