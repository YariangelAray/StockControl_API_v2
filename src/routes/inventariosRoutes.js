import express from "express";

import InventarioController from "../controllers/InventarioController.js";
import { validarInventario, validarInventarioParcial } from "../middlewares/entities/inventarios/inventarioValidator.js";
import authenticate from "../middlewares/auth/authenticate.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener inventarios propios
router.get("/me", authenticate, authorize('inventario.view-own'), InventarioController.getInventariosMe);
// Obtener un inventario propio por ID
router.get("/me/:inventarioId", authenticate, authorize('inventario.view-own'), InventarioController.getInventarioByIdMe);

// Obtener ambientes cubiertos por inventario propio
router.get("/me/:inventarioId/ambientes", authenticate, authorize('inventario.view-own'), InventarioController.getAmbientesCubiertosMe);


// Obtener todos los inventarios
router.get("/", authenticate, authorize('inventario.view'), InventarioController.getAllInventarios);

// Obtener un inventario por ID
router.get("/:id", authenticate, authorize('inventario.view'), InventarioController.getInventarioById);

// Crear un nuevo inventario
router.post("/", authenticate, authorize('inventario.create'), validarInventario, InventarioController.createInventario);

// Actualizar un inventario
router.put("/:id", authenticate, authorize('inventario.update'), validarInventario, InventarioController.updateInventario);

// Actualizar un inventario parcialmente
router.patch("/:id", authenticate, authorize('inventario.update'), validarInventarioParcial, InventarioController.updateInventario);

// Eliminar un inventario
router.delete("/:id", authenticate, authorize('inventario.delete'), InventarioController.deleteInventario);

// Obtener inventarios por ID de usuario
router.get("/usuario/:usuarioId", authenticate, authorize('inventario.view'), InventarioController.getInventariosByUsuarioId);
// Obtener ambientes cubiertos por inventario
router.get("/:id/ambientes", authenticate, authorize('inventario.view'), InventarioController.getAmbientesCubiertos);

export default router;