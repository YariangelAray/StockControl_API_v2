import express from "express";

import RolController from "../controllers/RolController.js";
import { validarRol, validarRolParcial } from "../middlewares/entities/roles/rolValidator.js";
import authenticate from "../middlewares/auth/authenticate.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los roles
router.get("/", authenticate, authorize('rol.view'), RolController.getAllRoles);

// Obtener un rol por ID
router.get("/:id", authenticate, authorize('rol.view'), RolController.getRolById);

// Crear un nuevo rol
router.post("/", authenticate, authorize('rol.create'), validarRol, RolController.createRol);

// Actualizar un rol
router.put("/:id", authenticate, authorize('rol.update'), validarRol, RolController.updateRol);

// Actualizar un rol parcialmente
router.patch("/:id", authenticate, authorize('rol.update'), validarRolParcial, RolController.updateRol);

// Eliminar un rol
router.delete("/:id", authenticate, authorize('rol.delete'), RolController.deleteRol);

export default router;