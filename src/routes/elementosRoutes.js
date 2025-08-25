import express from "express";

import ElementoController from "../controllers/ElementoController.js";
import { validarElemento, validarElementoParcial } from "../middlewares/entities/elementos/elementoValidator.js";
import authenticate from "../middlewares/auth/authenticate.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los elementos
router.get("/me", authenticate, authorize('elemento.view-inventory-own'), ElementoController.getAllElementosMe);

// Obtener un elemento por ID
router.get("/me/:elementoId", authenticate, authorize('elemento.view-inventory-own'), ElementoController.getElementoByIdMe);

// Crear un nuevo elemento
router.post("/me", authenticate, authorize('elemento.create-inventory-own'), validarElemento, ElementoController.createElementoMe);

// Actualizar un elemento
router.put("/me/:elementoId", authenticate, authorize('elemento.update-inventory-own'), validarElemento, ElementoController.updateElementoMe);

// Actualizar un elemento parcialmente
router.patch("/me/:elementoId", authenticate, authorize('elemento.update-inventory-own', 'elemento.update-patch-inventory-access'), validarElementoParcial, ElementoController.updateElementoMe);

// Actualizar un elemento parcialmente
router.put("/me/:elementoId/estado/:estado", authenticate, authorize('elemento.change-status-inventory-own'), ElementoController.updateEstadoMe);

// Obtener elementos por ID de inventario
router.get("me/inventario/:inventarioId", authenticate, authorize('elemento.view-inventory-own'), ElementoController.getElementosByInventarioIdMe);



// Obtener todos los elementos
router.get("/", authenticate, authorize('elemento.view'), ElementoController.getAllElementos);

// Obtener un elemento por ID
router.get("/:id", authenticate, authorize('elemento.view'), ElementoController.getElementoById);

// Crear un nuevo elemento
router.post("/", authenticate, authorize('elemento.create'), validarElemento, ElementoController.createElemento);

// Actualizar un elemento
router.put("/:id", authenticate, authorize('elemento.update'), validarElemento, ElementoController.updateElemento);

// Actualizar un elemento parcialmente
router.patch("/:id", authenticate, authorize('elemento.update'), validarElementoParcial, ElementoController.updateElemento);

// Actualizar el estado de un elemento
router.put("/:id/estado/:estado", authenticate, authorize('elemento.change-status'), ElementoController.updateEstado);

// Eliminar un elemento
router.delete("/:id", authenticate, authorize('elemento.delete'), ElementoController.deleteElemento);

// Obtener elementos por ID de inventario
router.get("/inventario/:inventarioId", authenticate, authorize('elemento.view'), ElementoController.getElementosByInventarioId);


export default router;