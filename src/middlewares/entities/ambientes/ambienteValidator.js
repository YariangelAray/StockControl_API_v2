import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarAmbiente = validateFields(campos);          // Para POST/PUT
export const validarAmbienteParcial = validatePartialFields(campos); // Para PATCH
