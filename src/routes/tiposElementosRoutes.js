import express from "express";

import TipoElementoController from "../controllers/TipoElementoController.js";
import { validarTipoElemento, validarTipoElementoParcial } from "../middlewares/entities/tiposElementos/tipoElementoValidator.js";

const router = express.Router();

// Obtener todos los tipos de elementos
router.get("/", TipoElementoController.getAllTiposElementos);

// Obtener un tipo de elemento por ID
router.get("/:id", TipoElementoController.getTipoElementoById);

// Crear un nuevo tipo de elemento
router.post("/", validarTipoElemento, TipoElementoController.createTipoElemento);

// Actualizar un tipo de elemento
router.put("/:id", validarTipoElemento, TipoElementoController.updateTipoElemento);

// Actualizar un tipo de elemento parcialmente
router.patch("/:id", validarTipoElementoParcial, TipoElementoController.updateTipoElemento);

// Eliminar un tipo de elemento
router.delete("/:id", TipoElementoController.deleteTipoElemento);

// Obtener tipos de elementos con la cantidad de elementos del inventario con ID especificado
router.get("/inventario/:inventarioId", TipoElementoController.getTiposElementosByInventarioId);


export default router;