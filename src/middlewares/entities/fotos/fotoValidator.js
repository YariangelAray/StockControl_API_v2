import { ResponseProvider } from "../../../providers/ResponseProvider.js";

/**
 * Middleware para validar que venga un archivo y un reporte_idválido
 */
export const validarFoto = (req, res, next) => {
  const errors = [];

  // Validar archivo
  if (!req.file) {
    errors.push({ campo: "archivo", message: "No se recibió ninguna foto." });
  }

  // Validar reporte_id
  const reporteId = req.body.reporte_id;
  if (!reporteId || reporteId.toString().trim() === "") {
    errors.push({ campo: "reporte_id", message: "El campo 'reporte_id' es obligatorio." });
  } else if (!Number.isInteger(Number(reporteId))) {
    errors.push({ campo: "reporte_id", message: "El campo 'reporte_id' debe ser un número entero." });
  }

  if (errors.length > 0) {
    return ResponseProvider.error(res, "Error de validación", 400, errors);
  }

  next();
};
