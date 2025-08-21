import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarElemento = validateFields(campos);          // Para POST/PUT
export const validarElementoParcial = validatePartialFields(campos); // Para PATCH
