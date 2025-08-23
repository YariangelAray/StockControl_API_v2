// Definición de los campos de la entidad TipoElemento
export const campos = [
  { name: "nombre", required: true, minLength: 3, maxLength: 50, type: "string" },
  { name: "consecutivo", required: true, minLength: 1, maxLength: 10, type: "number" },
  { name: "descripcion", required: false, minLength: 0, maxLength: 250, type: "string" },
  { name: "marca", required: false, minLength: 0, maxLength: 50, type: "string" },
  { name: "modelo", required: false, minLength: 0, maxLength: 50, type: "string" },
  { name: "atributos", required: true, minLength: 3, maxLength: 250, type: "string" },
];
