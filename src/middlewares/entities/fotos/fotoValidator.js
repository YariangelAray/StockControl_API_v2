import ResponseProvider from "../../../providers/ResponseProvider.js";

/**
 * Middleware para validar que se haya enviado una foto (archivo)
 * y que el campo 'reporte_id' sea válido.
 * Este middleware se usa antes de crear una foto asociada a un reporte.
 */
export const validarFoto = (req, res, next) => {
  // Inicializa un arreglo para acumular errores de validación
  const errors = [];

  // Verifica si se recibió un archivo en la solicitud (req.file)
  if (!req.file) {
    // Si no hay archivo, agrega un error indicando que falta la foto
    errors.push({
      campo: "foto",
      message: "No se recibió ninguna foto."
    });
  }

  const reporteId = req.body.reporte_id;

  // Verifica si el campo está vacío, nulo o solo contiene espacios
  if (!reporteId || reporteId.toString().trim() === "") {
    errors.push({
      campo: "reporte_id",
      message: "El campo 'reporte_id' es obligatorio."
    });

  // Verifica si el valor no es un número entero válido
  } else if (!Number.isInteger(Number(reporteId))) {
    errors.push({
      campo: "reporte_id",
      message: "El campo 'reporte_id' debe ser un número entero."
    });
  }
  
  // Si hay errores, se detiene el flujo y se responde con error 400  
  if (errors.length > 0) {
    return ResponseProvider.error(res, "Error de validación", 400, errors);
  }

  // Si no hay errores, continúa con el siguiente middleware o controlador
  next();
};
