import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarEstado = validateFields(campos);          // Para POST/PUT
export const validarEstadoParcial = validatePartialFields(campos); // Para PATCH
