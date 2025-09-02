import connection from "../utils/connection.js";

/**
 * Clase Modelo para interactuar con la base de datos.
 * 
 * Esta clase proporciona métodos para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
 * en una tabla específica de la base de datos. 
 */
class Modelo {

  /**
   * Método para obtener todos los registros de una tabla.
   * 
   * @param {string} tabla - Nombre de la tabla de la que se obtendrán los registros.
   * @returns {Promise<Array>} - Promesa que resuelve con un array de registros.
   * @throws {Error} - Lanza un error si la operación falla.
   */
  async getAll(tabla) {
    try {
      // Obtenemos el resultado de la consulta
      const [rows] = await connection.query(`SELECT * FROM ${tabla} ORDER BY id DESC;`);
      // Retornamos la respuesta al servicio
      return rows;
    } catch (error) {
      // Lanza un error personalizado si la operación falla
      throw new Error(error);
    }
  }

  /**
   * Método para obtener un registro de una tabla por su identificador.
   * 
   * @param {string} tabla - Nombre de la tabla de la que se obtendrá el registro.
   * @param {number} id - Identificador del registro a obtener.
   * @returns {Promise<Object|null>} - Promesa que resuelve con el registro encontrado o null si no existe.
   * @throws {Error} - Lanza un error si la operación falla.
   */
  async getById(tabla, id) {
    try {      
      // Obtenemos el resultado de la consulta
      const [rows] = await connection.query(`SELECT * FROM ${tabla} WHERE id = ?`, [id]);      
      // Retornamos la respuesta al servicio
      return rows[0]; // Retorna el primer registro encontrado
    } catch (error) {
      // Lanza un error personalizado si la operación falla
      throw new Error(error);
    }
  }

  /**
   * Método para obtener los registros de una tabla por un campo específico.
   * 
   * @param {string} tabla - Nombre de la tabla de la que se obtendrán los registros.
   * @param {string} campo - Nombre del campo por el que se filtrarán los registros.
   * @param {*} valor - Valor del campo para filtrar los registros.
   * @returns {Promise<Array>} - Promesa que resuelve con un array de registros que coinciden con el filtro.
   * @throws {Error} - Lanza un error si la operación falla.
   */
  async getByField(tabla, campo, valor) {
    try {      
      // Obtenemos el resultado de la consulta
      const [rows] = await connection.query(`SELECT * FROM ${tabla} WHERE ${campo} = ? ORDER BY id DESC`, [valor]);
      // Retornamos la respuesta al servicio
      return rows; // Retorna todos los registros que coinciden con el filtro
    } catch (error) {
      // Lanza un error personalizado si la operación falla
      throw new Error(error);
    }
  }

  /**
   * Método asincrónico para insertar un registro en una tabla específica.
   * 
   * @param {string} tabla - Nombre de la tabla en la que se insertará el registro.
   * @param {Object} campos - Objeto que contiene los campos y valores a insertar.
   * @returns {Promise<number|null>} - Promesa que resuelve con el ID del registro insertado o null si falla.
   * @throws {Error} - Lanza un error si la operación falla.
   */
  async create(tabla, campos) {
    try {
      // Inicializa la parte de la consulta que define los nombres de los campos
      let query = `INSERT INTO ${tabla} (`;
      // Inicializa la parte de la consulta que define los valores a insertar
      let values = "VALUES (";
      // Arreglo para guardar los valores a insertar, que se usarán como parámetros en la consulta
      let params = [];

      // Itera sobre cada clave-valor del objeto 'campos'
      for (const [key, value] of Object.entries(campos)) {
        // Agrega el nombre del campo a la consulta
        query += `${key}, `;
        // Marca la posición de un valor usando el signo de interrogación (?)
        values += `?, `;
        // Agrega el valor correspondiente al arreglo de parámetros
        params.push(value);
      }

      // Elimina la última coma y espacio de la cadena de valores, y cierra los paréntesis
      values = values.slice(0, -2) + ")";

      // Elimina la última coma y espacio de la cadena de campos, y concatena la parte de los valores
      query = `${query.slice(0, -2)}) ${values};`;

      // Ejecuta la consulta con los parámetros usando el objeto 'connection'
      const [result] = await connection.query(query, params);

      // Devuelve el id insertado si hay filas afectadas o null
      return result.affectedRows > 0 ? result.insertId : null;

    } catch (error) {
      // Lanza un error personalizado si la operación falla
      throw new Error(error);
    }
  }

  /**
   * Método asincrónico para actualizar un registro en una tabla específica usando su ID.
   * 
   * @param {string} tabla - Nombre de la tabla en la que se actualizará el registro.
   * @param {number} id - Identificador del registro a actualizar.
   * @param {Object} campos - Objeto que contiene los campos y valores a actualizar.
   * @returns {Promise<boolean>} - Promesa que resuelve con true si se actualizó el registro, false en caso contrario.
   * @throws {Error} - Lanza un error si la operación falla.
   */
  async update(tabla, id, campos) {
    try {
      // Inicializa la consulta SQL de actualización
      let query = `UPDATE ${tabla} SET `;

      // Arreglo que contendrá los valores que reemplazarán los marcadores (?) en la consulta
      let params = [];

      // Recorre cada clave-valor del objeto 'campos' para construir dinámicamente los campos a actualizar
      for (const [key, value] of Object.entries(campos)) {
        // Agrega a la consulta la asignación de cada campo con un marcador de valor (?)
        query += `${key} = ?, `;

        // Agrega el valor correspondiente al arreglo de parámetros
        params.push(value);
      }

      // Elimina la última coma y espacio sobrantes, y agrega la cláusula WHERE para actualizar por ID
      query = `${query.slice(0, -2)} WHERE id = ?;`;

      // Agrega el ID al final del arreglo de parámetros para usarlo en la cláusula WHERE
      params.push(id);

      // Ejecuta la consulta SQL con los parámetros preparados
      const [result] = await connection.query(query, params);

      // Si se modificó al menos una fila, devuelve true, de lo contrario, devuelve false
      return result.affectedRows > 0;

    } catch (error) {
      // Si ocurre un error durante la operación, lanza un mensaje de error personalizado
      throw new Error(error);
    }
  }

  /**
   * Método asincrónico para eliminar un registro por su ID de una tabla específica.
   * 
   * @param {string} tabla - Nombre de la tabla de la que se eliminará el registro.
   * @param {number} id - Identificador del registro a eliminar.
   * @returns {Promise<boolean>} - Promesa que resuelve con true si se eliminó el registro, false en caso contrario.
   * @throws {Error} - Lanza un error si la operación falla.
   */
  async delete(tabla, id) {
    try {
      // Ejecuta una consulta SQL para eliminar un registro en la tabla especificada donde el id coincida
      const [result] = await connection.query(`DELETE FROM ${tabla} WHERE id = ?`, [id]);

      // Si se modificó al menos una fila, devuelve true, de lo contrario, devuelve false
      return result.affectedRows > 0;

    } catch (error) {
      // Si ocurre algún error en el proceso, lanza un mensaje de error personalizado
      throw new Error(error);
    }
  }
}

// Exporta el objeto Modelo como valor por defecto del módulo
export default Modelo;
