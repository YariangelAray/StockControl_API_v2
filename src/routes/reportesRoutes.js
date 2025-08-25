import express from "express";

import ReporteController from "../controllers/ReporteController.js";
import { validarReporte, validarReporteParcial } from "../middlewares/entities/reportes/reporteValidator.js";
import { authenticate } from "../middlewares/auth/authenticate.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los reportes
router.get("/", authenticate, authorize('reporte.view'), ReporteController.getAllReportes);

// Obtener un reporte por ID
router.get("/:id", authenticate, authorize('reporte.view'), ReporteController.getReporteById);

// Crear un nuevo reporte
router.post("/", authenticate, authorize('reporte.create'), validarReporte, ReporteController.createReporte);

// Actualizar un reporte
router.put("/:id", authenticate, authorize('reporte.update'), validarReporte, ReporteController.updateReporte);

// Actualizar un reporte parcialmente
router.patch("/:id", authenticate, authorize('reporte.update'), validarReporteParcial, ReporteController.updateReporte);

// Eliminar un reporte
router.delete("/:id", authenticate, authorize('reporte.delete'), ReporteController.deleteReporte);

// Obtener reportes por ID de inventario
router.get("/inventario/:inventarioId", authenticate, authorize('reporte.view-inventory'), ReporteController.getReportesByInventarioId);


export default router;