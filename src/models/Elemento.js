import connection from '../utils/db.js';
import Modelo from './Modelo.js';

class Elemento extends Modelo {

  /**
   * Método para obtener los elementos almacenados en la base de datos
   *
   * @returns {QueryResult} Areglo de elementos obtenidos de la base de datos
   */
  async getAll() {
    try {
      return await super.getAll('elementos');
    } catch (error) {
      throw new Error("Error al obtener todos los elementos");
    }
  }

  /**
   * Método para obtener un elemento por su id
   *
   * @param {Number} id Identificador del elemento
   * @returns {Object} Objeto elemento
   */
  async getById(id) {
    try {
      return await super.getById('elementos', id)
    } catch (error) {
      throw new Error("Error al obtener el elemento");
    }
  }

  // /**
  //  * Método para crear un nuevo elemento
  //  *
  //  * @returns {Object} Objeto elemento
  //  */
  // async create(nombre, descripcion, precio, categoria_id) {
  //   try {
  //     const [result] = await connection.query(
  //       "INSERT INTO elementos (nombre, descripcion, precio, categoria_id) VALUES (?,?,?,?)",
  //       [nombre, descripcion, precio, categoria_id]
  //     );
  //     return {
  //       id: result.insertId,
  //       nombre: nombre,
  //       descripcion: descripcion,
  //       precio: precio,
  //       categoria_id: categoria_id,
  //     };
  //   } catch (error) {
  //     throw new Error("Error al crear el elemento");
  //   }
  // }

  // /**
  //  * Método para actualizar un elemento
  //  *
  //  * @param {Number} id Identificador del elemento
  //  * @returns {Object} Objeto elemento actualizado
  //  */
  // async update(id, campos) {
  //   try {
  //     let query = "UPDATE elementos SET ";
  //     let params = [];

  //     // Construimos dinámicamente la consulta de actualización solo con los campos proporcionados
  //     for (const [key, value] of Object.entries(campos)) {
  //       query += `${key} = ?, `;
  //       params.push(value);
  //     }

  //     // Eliminamos la última coma y espacio de la consulta
  //     query = query.slice(0, -2);

  //     // Añadimos la condición WHERE para seleccionar el elemento por su ID
  //     query += " WHERE id = ?";
  //     params.push(id);
  //     const [result] = await connection.query(query, params);
  //     return result.affectedRows > 0 ? { id, ...campos } : null;
  //   } catch (error) {
  //     throw new Error("Error al actualizar el elemento");
  //   }
  // }

  // /**
  //  * Método para eliminar un elemento
  //  * @param {Number} id identificador del elemento
  //  * @returns {String} Mensaje de respuesta
  //  */
  // async delete(id) {
  //   try {
  //     // Procedemos con la eliminación si no está relacionada
  //     const [result] = await connection.query(
  //       "DELETE FROM elementos WHERE id = ?",
  //       [id]
  //     );

  //     if (result.affectedRows === 0) {
  //       return {
  //         error: true,
  //         mensaje: "Elemento no encontrado.",
  //       };
  //     }
  //     return {
  //       error: false,
  //       mensaje: "Elemento eliminado exitosamente.",
  //     };
  //   } catch (error) {
  //     res.status(500).json({
  //       error: true,
  //       mensaje: "Error al eliminar el elemento.",
  //     });
  //   }
  // }
}

export default Elemento;