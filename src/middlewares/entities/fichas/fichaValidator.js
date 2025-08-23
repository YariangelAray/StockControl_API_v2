import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarFicha = validateFields(campos);          // Para POST/PUT
export const validarFichaParcial = validatePartialFields(campos); // Para PATCH
