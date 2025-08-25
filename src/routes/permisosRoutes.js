import express from "express";

import PermisoController from "../controllers/PermisoController.js";
import { validarPermiso, validarPermisoParcial } from "../middlewares/entities/permisos/permisoValidator.js";
import authenticate from "../middlewares/auth/authenticate.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los permisos
router.get("/", authenticate, authorize('permiso.view'), PermisoController.getAllPermisos);

// Obtener un permiso por ID
router.get("/:id", authenticate, authorize('permiso.view'), PermisoController.getPermisoById);

// Crear un nuevo permiso
router.post("/", authenticate, authorize('permiso.create'), validarPermiso, PermisoController.createPermiso);

// Actualizar un permiso
router.put("/:id", authenticate, authorize('permiso.update'), validarPermiso, PermisoController.updatePermiso);

// Actualizar un permiso parcialmente
router.patch("/:id", authenticate, authorize('permiso.update'), validarPermisoParcial, PermisoController.updatePermiso);

// Eliminar un permiso
router.delete("/:id", authenticate, authorize('permiso.delete'), PermisoController.deletePermiso);

export default router;