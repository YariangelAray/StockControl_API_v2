import express from "express";

import InventarioController from "../controllers/InventarioController.js";
import { validarInventario, validarInventarioParcial } from "../middlewares/entities/inventarios/inventarioValidator.js";

const router = express.Router();

// Obtener inventarios propios
router.get("/me", InventarioController.getInventariosMe);

// Obtener todos los inventarios
router.get("/", InventarioController.getAllInventarios);

// Obtener un inventario por ID
router.get("/:id", InventarioController.getInventarioById);

// Crear un nuevo inventario
router.post("/", validarInventario, InventarioController.createInventario);

// Actualizar un inventario
router.put("/:id", validarInventario, InventarioController.updateInventario);

// Actualizar un inventario parcialmente
router.patch("/:id", validarInventarioParcial, InventarioController.updateInventario);

// Eliminar un inventario
router.delete("/:id", InventarioController.deleteInventario);

// Obtener inventarios por ID de usuario
router.get("/usuario/:usuarioId", InventarioController.getInventariosByUsuarioId);

// Obtener ambientes cubiertos por inventario
router.get("/:id/ambientes", InventarioController.getAmbientesCubiertos);

export default router;