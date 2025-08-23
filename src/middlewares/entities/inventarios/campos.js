// Definición de los campos de la entidad Inventario
export const campos = [
    { name: "nombre", required: true, minLength: 1, maxLength: 50, type: "string" },
    { name: "fecha", required: true, minLength: 10, maxLength: 10, type: "date" },    
    { name: "usuario_admin_id", required: true, minLength: 1, maxLength: 11, type: "number" },    
];
