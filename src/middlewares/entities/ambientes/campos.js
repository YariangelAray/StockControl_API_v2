// Definición de los campos de la entidad Ambiente
export const campos = [
  { name: "nombre", required: true, minLength: 3, maxLength: 50, type: "string" },
  { name: "centro_id", required: true, minLength: 1, maxLength: 11, type: "number" },  
];
