import { campos, camposContrasena } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";
import ResponseProvider from "../../../providers/ResponseProvider.js";

export const validarUsuario = validateFields(campos);          // Para POST/PUT
export const validarUsuarioParcial = validatePartialFields(campos); // Para PATCH

export const validarContrasena = validateFields(camposContrasena); // Para actualizar contraseña
export const validarDesactivar = (req, res, next) => {
  const { activo } = req.body;
  if (activo !== false && activo !== "false" && activo !== 0 && activo !== "0") {
    return ResponseProvider.error(
      res, "El campo 'activo' debe estar presente y ser false para desactivar al usuario.", 400,
      [{ campo: "activo", message: "Debe ser false, 'false', 0 o '0'." }]
    );
  }
  next();
}