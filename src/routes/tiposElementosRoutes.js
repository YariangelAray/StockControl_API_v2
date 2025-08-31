import express from "express";

import TipoElementoController from "../controllers/TipoElementoController.js";
import { validarTipoElemento, validarTipoElementoParcial } from "../middlewares/entities/tiposElementos/tipoElementoValidator.js";
import authenticate from "../middlewares/auth/authenticate.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los tipos de elementos de un inventario propio especifico
router.get("inventario/me/:inventarioId", authenticate, authorize('tipo-elemento.view-inventory-own'), TipoElementoController.getTiposElementosByInventarioIdMe);

// Obtener todos los tipos de elementos
router.get("/", authenticate, TipoElementoController.getAllTiposElementos);

// Obtener un tipo de elemento por ID
router.get("/:id", authenticate, authorize('tipo-elemento.view'), TipoElementoController.getTipoElementoById);

// Crear un nuevo tipo de elemento
router.post("/", authenticate, authorize('tipo-elemento.create'), validarTipoElemento, TipoElementoController.createTipoElemento);

// Actualizar un tipo de elemento
router.put("/:id", authenticate, authorize('tipo-elemento.update'), validarTipoElemento, TipoElementoController.updateTipoElemento);

// Actualizar un tipo de elemento parcialmente
router.patch("/:id", authenticate, authorize('tipo-elemento.update'), validarTipoElementoParcial, TipoElementoController.updateTipoElemento);

// Eliminar un tipo de elemento
router.delete("/:id", authenticate, authorize('tipo-elemento.delete'), TipoElementoController.deleteTipoElemento);

// Obtener tipos de elementos por ID de inventario
router.get("/inventario/:inventarioId", authenticate, authorize('tipo-elemento.view'), TipoElementoController.getTiposElementosByInventarioId);

export default router;