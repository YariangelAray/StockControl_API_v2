import express from "express";

import ElementoController from "../controllers/ElementoController.js";
// import { camposProducto } from "../middlewares/productos/index.js";
// import { parcialesProducto } from "../middlewares/productos/parcialesProducto.js";

const router = express.Router();

// Obtener todos los productos
router.get("/", ElementoController.getAllElementos);

// Obtener un producto por ID
router.get("/:id", ElementoController.getElementoById);

// // Crear un nuevo producto
// router.post("/", camposProducto, ElementoController.createProducto);

// router.put("/:id", camposProducto, ElementoController.updateProducto);

// // Actualizar un producto
// router.patch("/:id", parcialesProducto, ElementoController.updateProducto);

// // Eliminar un producto
// router.delete("/:id", ElementoController.deleteProduct);

export default router;