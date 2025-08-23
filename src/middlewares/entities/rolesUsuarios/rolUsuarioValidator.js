import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarRolUsuario = validateFields(campos);          // Para POST/PUT
export const validarRolUsuarioParcial = validatePartialFields(campos); // Para PATCH
