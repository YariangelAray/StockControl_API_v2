import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarInventario = validateFields(campos);          // Para POST/PUT
export const validarInventarioParcial = validatePartialFields(campos); // Para PATCH
