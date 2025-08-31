import connection from '../utils/connection.js';
import Modelo from './Modelo.js';

class Inventario extends Modelo {

  #nameTable = 'inventarios';
  /**
   * Obtiene todos los inventarios de la base de datos
   * @returns {Promise<Array>} Lista de todos los inventarios
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAll() {
    try {
      return await super.getAll(this.#nameTable);
    } catch (error) {
      throw new Error(`Error al obtener todos los inventarios: ${error.message}`);
    }
  }

  /**
   * Obtiene un inventario específico por su ID
   * @param {number} id - ID del inventario
   * @returns {Promise<Object|null>} El inventario encontrado o null si no existe
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getById(id) {
    try {
      return await super.getById(this.#nameTable, id);
    } catch (error) {
      throw new Error(`Error al obtener el inventario con ID ${id}: ${error.message}`);
    }
  }

  /**
   * Obtiene todos los inventarios asociados a un centro
   * @param {number} centroId - ID del centro
   * @returns {Promise<Array>} Lista de inventarios del centro
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAllByUsuarioAdminId(usuarioAdminId) {
    try {
      return await super.getByField(this.#nameTable, 'usuario_admin_id', usuarioAdminId);
    } catch (error) {
      throw new Error(`Error al obtener inventarios por usuario_admin_id ${usuarioAdminId}: ${error.message}`);
    }
  }

  /**
     * Obtiene todos los ambientes que estan cubiertos por un inventario
     * @param {number} inventarioId - ID del inventario
     * @returns {Promise<Array>} Lista de ambientes del inventario
     * @throws {Error} Si ocurre un error en la consulta
     */
  async getAmbientesCubiertos(inventarioId) {
    try {
      //Obtenemos el resultado de la consulta
      const [rows] = await connection.query(`SELECT a.id AS id, a.nombre AS nombre, a.mapa AS mapa, COUNT(e.id) AS cantidad_elementos FROM elementos e JOIN ambientes a ON e.ambiente_id = a.id WHERE e.inventario_id = ? GROUP BY a.id, a.nombre ORDER BY a.nombre`, [inventarioId]);
      //Retornamos la respuesta al servicio
      return rows;
    } catch (error) {
      // Lanza un error personalizado si la operación falla
      throw new Error(`Error al obtener ambientes cubiertos por el inventario con ID ${inventarioId}: ${error.message}`);
    }
  }

  /**
   * Crea un nuevo inventario en la base de datos
   * @param {Object} inventario - Objeto con los datos del inventario {nombre, centro_id, mapa}
   * @returns {Promise<Object|null>} El inventario creado con su ID, o null si falló
   * @throws {Error} Si ocurre un error en la inserción
   */
  async create(inventario) {
    try {
      const idCreado = await super.create(this.#nameTable, inventario);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear el inventario: ${error.message}`);
    }
  }

  /**
   * Actualiza un inventario existente
   * @param {number} id - ID del inventario a actualizar
   * @param {Object} inventario - Objeto con los nuevos datos del inventario
   * @returns {Promise<Object|null>} El inventario actualizado, o null si falló
   * @throws {Error} Si ocurre un error en la actualización
   */
  async update(id, inventario) {
    try {
      if (await super.update(this.#nameTable, id, inventario)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al actualizar el inventario con ID ${id}: ${error.message}`);
    }
  }

  /**
   * Elimina un inventario de la base de datos
   * @param {number} id - ID del inventario a eliminar
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no
   * @throws {Error} Si ocurre un error en la eliminación
   */
  async delete(id) {
    try {
      return await super.delete(this.#nameTable, id);
    } catch (error) {
      throw new Error(`Error al eliminar el inventario con ID ${id}: ${error.message}`);
    }
  }
}

export default Inventario;
