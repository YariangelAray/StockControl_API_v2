import { ResponseProvider } from "../../providers/ResponseProvider.js";

/**
 * Middleware genérico para validar campos requeridos
 * @param {Array} campos - Definición de campos de la entidad
 */
export const validateFields = (campos) => {
  return (req, res, next) => {
    const errors = [];

    for (const campo of campos) {
      const { name, required, minLength, maxLength, type } = campo;
      const value = req.body[name];

      if (required && (!value || value.toString().trim() === "")) {
        errors.push({ campo: name, message: `El campo ${name} es obligatorio.` });
        continue;
      }

      if (minLength && value && value.length < minLength) {
        errors.push({ campo: name, message: `El campo ${name} debe tener al menos ${minLength} caracteres.` });
        continue;
      }

      if (maxLength && value && value.length > maxLength) {
        errors.push({ campo: name, message: `El campo ${name} no puede tener más de ${maxLength} caracteres.` });
        continue;
      }

      if (type === "number" && value && !Number.isInteger(Number(value))) {
        errors.push({ campo: name, message: `El campo ${name} debe ser un número entero.` });
        continue;
      }
      if (type === "date") {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(value)) {
          errors.push({ campo: name, message: `El campo ${name} debe tener el formato yyyy-MM-dd.` });
          continue;
        }
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          errors.push({ campo: name, message: `El campo ${name} no es una fecha válida.` });
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
