import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarPrograma = validateFields(campos);          // Para POST/PUT
export const validarProgramaParcial = validatePartialFields(campos); // Para PATCH
