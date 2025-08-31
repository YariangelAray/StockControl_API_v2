import mysql from "mysql2/promise"; // Importa el módulo mysql2 con soporte para promesas
import dotenv from "dotenv"; // Importa dotenv para manejar variables de entorno

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Configuración de la conexión a la base de datos
const connection = await mysql.createConnection({
  host: process.env.DB_HOST, // Host de la base de datos (definido en .env)
  user: process.env.DB_USER, // Usuario de la base de datos (definido en .env)
  password: process.env.DB_PASSWORD, // Contraseña de la base de datos (definido en .env)
  database: process.env.DB_NAME, // Nombre de la base de datos (definido en .env)
  typeCast: function (field, next) {
    if (field.type === 'TINY' && field.length === 1) {
      return field.string() === '1'; // convierte a true/false
    }
    return next();
  }
});

// Exporta la conexión como valor por defecto del módulo
export default connection;
