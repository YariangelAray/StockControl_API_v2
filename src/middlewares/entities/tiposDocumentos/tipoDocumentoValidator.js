import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarTipoDocumento = validateFields(campos);          // Para POST/PUT
export const validarTipoDocumentoParcial = validatePartialFields(campos); // Para PATCH
