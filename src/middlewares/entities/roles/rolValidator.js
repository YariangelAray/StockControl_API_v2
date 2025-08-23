import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarRol = validateFields(campos);          // Para POST/PUT
export const validarRolParcial = validatePartialFields(campos); // Para PATCH
