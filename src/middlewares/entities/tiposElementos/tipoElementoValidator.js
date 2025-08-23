import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarTipoElemento = validateFields(campos);          // Para POST/PUT
export const validarTipoElementoParcial = validatePartialFields(campos); // Para PATCH
