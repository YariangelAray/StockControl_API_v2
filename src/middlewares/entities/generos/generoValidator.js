import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarGenero = validateFields(campos);          // Para POST/PUT
export const validarGeneroParcial = validatePartialFields(campos); // Para PATCH
