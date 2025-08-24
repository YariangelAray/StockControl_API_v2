import { ResponseProvider } from "../../providers/ResponseProvider.js";

/**
 * Middleware genérico para validar campos en solicitudes parciales (PATCH).
 * 
 * Este middleware verifica que los campos proporcionados en el cuerpo de la solicitud
 * cumplan con las reglas de validación definidas, como longitud mínima y máxima,
 * tipo de dato y formato de fecha.
 * 
 * @param {Array} campos - Definición de campos de la entidad, donde cada campo es un objeto
 *                         que puede contener propiedades como name, minLength, maxLength y type.
 * @returns {Function} Middleware que valida los campos en la solicitud.
 */
export const validatePartialFields = (campos) => {
  return (req, res, next) => {
    const errors = []; // Array para almacenar errores de validación
    const body = req.body || {}; // Cuerpo de la solicitud, se asegura de que no sea undefined

    // Itera sobre cada campo definido en la validación
    for (const campo of campos) {
      const { name, minLength, maxLength, type } = campo; // Desestructura las propiedades del campo
      const value = body[name]; // Obtiene el valor del campo del cuerpo de la solicitud

      // En PATCH no validamos required, solo lo que venga en el body
      if (value !== undefined) { // Solo valida si el campo está presente en el cuerpo
        // Valida la longitud mínima del campo
        if (minLength && value.length < minLength) {
          errors.push({ campo: name, message: `El campo '${name}' debe tener al menos ${minLength} caracteres.` });
          continue; // Continúa con el siguiente campo
        }

        // Valida la longitud máxima del campo
        if (maxLength && value.length > maxLength) {
          errors.push({ campo: name, message: `El campo '${name}' no puede tener más de ${maxLength} caracteres.` });
          continue; // Continúa con el siguiente campo
        }

        // Valida que el campo sea un número entero
        if (type === "number" && !Number.isInteger(Number(value))) {
          errors.push({ campo: name, message: `El campo '${name}' debe ser un número entero.` });
          continue; // Continúa con el siguiente campo
        }

        // Valida que el campo sea una fecha en el formato correcto
        if (type === "date") {
          const regex = /^\d{4}-\d{2}-\d{2}$/; // Expresión regular para validar el formato yyyy-MM-dd
          if (!regex.test(value)) {
            errors.push({ campo: name, message: `El campo '${name}' debe tener el formato yyyy-MM-dd.` });
            continue; // Continúa con el siguiente campo
          }
          const date = new Date(value); // Intenta crear un objeto de fecha
          if (isNaN(date.getTime())) { // Verifica si la fecha es válida
            errors.push({ campo: name, message: `El campo '${name}' no es una fecha válida.` });
            continue; // Continúa con el siguiente campo
          }
        }
      }
    }

    // Si hay errores de validación, envía una respuesta de error
    if (errors.length > 0) {
      return ResponseProvider.error(res, "Error de validación", 400, errors); // Respuesta de error con detalles
    }

    next(); // Si no hay errores, pasa al siguiente middleware o ruta
  };
};
