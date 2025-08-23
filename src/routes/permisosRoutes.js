import express from "express";

import PermisoController from "../controllers/PermisoController.js";
import { validarPermiso, validarPermisoParcial } from "../middlewares/entities/permisos/permisoValidator.js";

const router = express.Router();

// Obtener todos los permisos
router.get("/", PermisoController.getAllPermisos);

// Obtener un permiso por ID
router.get("/:id", PermisoController.getPermisoById);

// Crear un nuevo permiso
router.post("/", validarPermiso, PermisoController.createPermiso);

// Actualizar un permiso
router.put("/:id", validarPermiso, PermisoController.updatePermiso);

// Actualizar un permiso parcialmente
router.patch("/:id", validarPermisoParcial, PermisoController.updatePermiso);

// Eliminar un permiso
router.delete("/:id", PermisoController.deletePermiso);

export default router;