import express from "express";

import ReporteController from "../controllers/ReporteController.js";
import { validarReporte, validarReporteParcial } from "../middlewares/entities/reportes/reporteValidator.js";

const router = express.Router();

// Obtener todos los reportes
router.get("/", ReporteController.getAllReportes);

// Obtener un reporte por ID
router.get("/:id", ReporteController.getReporteById);

// Crear un nuevo reporte
router.post("/", validarReporte, ReporteController.createReporte);

// Actualizar un reporte
router.put("/:id", validarReporte, ReporteController.updateReporte);

// Actualizar un reporte parcialmente
router.patch("/:id", validarReporteParcial, ReporteController.updateReporte);

// Eliminar un reporte
router.delete("/:id", ReporteController.deleteReporte);

// Obtener reportes por ID de inventario
router.get("/inventario/:inventarioId", ReporteController.getReportesByInventarioId);


export default router;