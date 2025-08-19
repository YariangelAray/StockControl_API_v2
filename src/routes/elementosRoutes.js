import express from "express";

import ElementoController from "../controllers/ElementoController.js";
// import { camposElemento } from "../middlewares/elementos/index.js";
// import { parcialesElemento } from "../middlewares/elementos/parcialesElemento.js";

const router = express.Router();

// Obtener todos los elementos
router.get("/", ElementoController.getAllElementos);

// Obtener un elemento por ID
router.get("/:id", ElementoController.getElementoById);

// // Crear un nuevo elemento
// router.post("/", camposElemento, ElementoController.createElemento);

// Actualizar un elemento
// router.put("/:id", camposElemento, ElementoController.updateElemento);

// // Actualizar un elemento parcialmente
// router.patch("/:id", parcialesElemento, ElementoController.updateElemento);

// // Eliminar un elemento
// router.delete("/:id", ElementoController.deleteProduct);

export default router;