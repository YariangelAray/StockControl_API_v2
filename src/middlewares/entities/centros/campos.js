// Definición de los campos de la entidad Centro
export const campos = [
  { name: "nombre", required: true, minLength: 3, maxLength: 100, type: "string" },
  { name: "direccion", required: true, minLength: 1, maxLength: 100, type: "string" },  
];
