// Definición de los campos de la entidad Reporte
export const campos = [
    { name: "fecha", required: false, minLength: 10, maxLength: 10, type: "date" },
    { name: "asunto", required: true, minLength: 1, maxLength: 100, type: "string" },
    { name: "mensaje", required: true, minLength: 1, maxLength: 1000, type: "string" },
    { name: "usuario_id", required: true, minLength: 1, maxLength: 11, type: "number" },
    { name: "elemento_id", required: true, minLength: 1, maxLength: 11, type: "number" },
];