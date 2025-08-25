import { campos, camposLogin } from "../entities/usuarios/campos.js";
import { validateFields } from "../validators/validateFields.js";

export const validarRegistro = validateFields(campos);
export const validarLogin = validateFields(camposLogin);