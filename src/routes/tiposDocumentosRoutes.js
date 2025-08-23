import express from "express";

import TipoDocumentoController from "../controllers/TipoDocumentoController.js";
import { validarTipoDocumento, validarTipoDocumentoParcial } from "../middlewares/entities/tiposDocumentos/tipoDocumentoValidator.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get("/", TipoDocumentoController.getAllTiposDocumentos);

// Obtener un tipo de documento por ID
router.get("/:id", TipoDocumentoController.getTipoDocumentoById);

// Crear un nuevo tipo de documento
router.post("/", validarTipoDocumento, TipoDocumentoController.createTipoDocumento);

// Actualizar un tipo de documento
router.put("/:id", validarTipoDocumento, TipoDocumentoController.updateTipoDocumento);

// Actualizar un tipo de documento parcialmente
router.patch("/:id", validarTipoDocumentoParcial, TipoDocumentoController.updateTipoDocumento);

// Eliminar un tipo de documento
router.delete("/:id", TipoDocumentoController.deleteTipoDocumento);

export default router;