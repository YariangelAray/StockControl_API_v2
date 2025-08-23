import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarPermisoRol = validateFields(campos);          // Para POST/PUT
export const validarPermisoRolParcial = validatePartialFields(campos); // Para PATCH
