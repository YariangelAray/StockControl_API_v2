import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarPermiso = validateFields(campos);          // Para POST/PUT
export const validarPermisoParcial = validatePartialFields(campos); // Para PATCH
