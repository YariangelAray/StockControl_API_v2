import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarCentro = validateFields(campos);          // Para POST/PUT
export const validarCentroParcial = validatePartialFields(campos); // Para PATCH
