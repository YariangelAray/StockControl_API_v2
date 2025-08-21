// Definición de los campos de la entidad Elemento
export const campos = [
  { name: "placa", required: true, minLength: 1, maxLength: 15, type: "string" },
  { name: "serial", required: false, minLength: 0, maxLength: 15, type: "string" },
  { name: "tipo_elemento_id", required: true, minLength: 1, maxLength: 2, type: "number" },
  { name: "fecha_adquisicion", required: true, minLength: 10, maxLength: 10, type: "string" },
  { name: "valor_monetario", required: true, minLength: 1, maxLength: 20, type: "number" },
  { name: "estado_id", required: false, minLength: 1, maxLength: 2, type: "number" },
  { name: "observaciones", required: false, minLength: 0, maxLength: 250, type: "string" },
  { name: "ambiente_id", required: false, minLength: 1, maxLength: 2, type: "number" },
  { name: "inventario_id", required: true, minLength: 1, maxLength: 2, type: "number" }
];
