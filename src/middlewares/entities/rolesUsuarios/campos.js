// Definición de los campos de la entidad RolUsuario
export const campos = [
    { name: "rol_id", required: true, minLength: 1, maxLength: 11, type: "number" },
    { name: "usuario_id", required: true, minLength: 1, maxLength: 11, type: "number" },
];