import express from "express";

import PermisoRolController from "../controllers/PermisoRolController.js";
import { validarPermisoRol, validarPermisoRolParcial } from "../middlewares/entities/permisosRoles/permisoRolValidator.js";
import authenticate from "../middlewares/auth/authenticate.js";
import authorize from "../middlewares/auth/authorize.js";


const router = express.Router();

// Obtener todas las relaciones permiso-rol por rol id
router.get("/rol/:rolId", authenticate, authorize('rol.view-permission'), PermisoRolController.getAllPermisosRolesByRolId);

// Obtener todas las relaciones permiso-rol
router.get("/", authenticate, authorize('permiso-rol.view'), PermisoRolController.getAllPermisosRoles);

// Obtener una relación permiso-rol por ID
router.get("/:id", authenticate, authorize('permiso-rol.view'), PermisoRolController.getPermisoRolById);

// Crear una nueva relación permiso-rol
router.post("/", authenticate, authorize('rol.assign-permission'), validarPermisoRol, PermisoRolController.createPermisoRol);

// Actualizar una relación permiso-rol
router.put("/:id", authenticate, authorize('rol.update-permission'), validarPermisoRol, PermisoRolController.updatePermisoRol);

// Actualizar una relación permiso-rol parcialmente
router.patch("/:id", authenticate, authorize('rol.update-permission'), validarPermisoRolParcial, PermisoRolController.updatePermisoRol);

// Eliminar una relación permiso-rol
router.delete("/:id", authenticate, authorize('rol.delete-permission'), PermisoRolController.deletePermisoRol);

export default router;