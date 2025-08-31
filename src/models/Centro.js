import connection from '../utils/connection.js';
import Modelo from './Modelo.js';

class Centro extends Modelo {

  #nameTable = 'centros';
  /**
   * Obtiene todos los centros de la base de datos
   * @returns {Promise<Array>} Lista de todos los centros
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAll() {
    try {
      return await super.getAll(this.#nameTable);
    } catch (error) {
      throw new Error(`Error al obtener todos los centros: ${error.message}`);
    }
  }

  /**
   * Obtiene un centro específico por su ID
   * @param {number} id - ID del centro
   * @returns {Promise<Object|null>} El centro encontrado o null si no existe
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getById(id) {
    try {
      return await super.getById(this.#nameTable, id);
    } catch (error) {
      throw new Error(`Error al obtener el centro con ID ${id}: ${error.message}`);
    }
  }

  /**
   * Crea un nuevo centro en la base de datos
   * @param {Object} centro - Objeto con los datos del tipo {nombre, direccion}
   * @returns {Promise<Object|null>} El centro creado con su ID, o null si falló
   * @throws {Error} Si ocurre un error en la inserción
   */
  async create(centro) {
    try {
      const idCreado = await super.create(this.#nameTable, centro);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear el centro: ${error.message}`);
    }
  }

  /**
   * Actualiza un centro existente
   * @param {number} id - ID del centro a actualizar
   * @param {Object} centro - Objeto con los nuevos datos del tipo
   * @returns {Promise<Object|null>} El centro actualizado, o null si falló
   * @throws {Error} Si ocurre un error en la actualización
   */
  async update(id, centro) {
    try {
      if (await super.update(this.#nameTable, id, centro)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al actualizar el centro con ID ${id}: ${error.message}`);
    }
  }

  /**
   * Elimina un centro de la base de datos
   * @param {number} id - ID del centro a eliminar
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no
   * @throws {Error} Si ocurre un error en la eliminación
   */
  async delete(id) {
    try {
      return await super.delete(this.#nameTable, id);
    } catch (error) {
      throw new Error(`Error al eliminar el centro con ID ${id}: ${error.message}`);
    }
  }
}

export default Centro;
