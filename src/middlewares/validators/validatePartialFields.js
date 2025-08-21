import { ResponseProvider } from "../../providers/ResponseProvider.js";

/**
 * Middleware genérico para validaciones parciales (PATCH)
 * @param {Array} campos - Definición de campos de la entidad
 */
export const validatePartialFields = (campos) => {
  return (req, res, next) => {
    const errors = [];

    for (const campo of campos) {
      const { name, minLength, maxLength, type } = campo;
      const value = req.body[name];

      // En PATCH no validamos required, solo lo que venga en el body
      if (value !== undefined) {
        if (minLength && value.length < minLength) {
          errors.push({ campo: name, message: `El campo ${name} debe tener al menos ${minLength} caracteres.` });
          continue;
        }

        if (maxLength && value.length > maxLength) {
          errors.push({ campo: name, message: `El campo ${name} no puede tener más de ${maxLength} caracteres.` });
          continue;
        }

        if (type === "number" && !Number.isInteger(Number(value))) {
          errors.push({ campo: name, message: `El campo ${name} debe ser un número entero.` });
          continue;
        }
      }
    }

    if (errors.length > 0) {
      return ResponseProvider.error(res, "Error de validación", 400, errors);
    }

    next();
  };
};
