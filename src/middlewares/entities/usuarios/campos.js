// Definición de los campos de la entidad Usuario
export const campos = [
  { name: "nombres", required: true, minLength: 3, maxLength: 100, type: "string" },
  { name: "apellidos", required: true, minLength: 3, maxLength: 100, type: "string" },
  { name: "tipo_documento_id", required: true, minLength: 1, maxLength: 11, type: "number" },
  { name: "documento", required: true, minLength: 6, maxLength: 11, type: "string" },
  { name: "genero_id", required: true, minLength: 1, maxLength: 11, type: "number" },
  { name: "telefono", required: true, minLength: 8, maxLength: 15, type: "string" },
  { name: "correo", required: true, minLength: 6, maxLength: 100, type: "string" },
  { name: "ficha_id", required: false, minLength: 1, maxLength: 11, type: "number" },
  { name: "contrasena", required: false, minLength: 8, maxLength: 30, type: "string" },  
];

export const camposContrasena = [
  { name: "contrasena_nueva", required: true, minLength: 8, maxLength: 30, type: "string" },
  { name: "contrasena_actual", required: true, minLength: 8, maxLength: 30, type: "string" },
];