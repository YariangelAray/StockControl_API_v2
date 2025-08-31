import connection from '../utils/connection.js';
import Modelo from './Modelo.js';

class Genero extends Modelo {

  #nameTable = 'generos';
  /**
   * Obtiene todos los generos de la base de datos
   * @returns {Promise<Array>} Lista de todos los generos
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAll() {
    try {
      return await super.getAll(this.#nameTable);
    } catch (error) {
      throw new Error(`Error al obtener todos los generos: ${error.message}`);
    }
  }

  /**
   * Obtiene un genero específico por su ID
   * @param {number} id - ID del genero
   * @returns {Promise<Object|null>} El genero encontrado o null si no existe
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getById(id) {
    try {
      return await super.getById(this.#nameTable, id);
    } catch (error) {
      throw new Error(`Error al obtener el genero con ID ${id}: ${error.message}`);
    }
  }

  /**
   * Crea un nuevo genero en la base de datos
   * @param {Object} genero - Objeto con los datos del genero {nombre}
   * @returns {Promise<Object|null>} El genero creado con su ID, o null si falló
   * @throws {Error} Si ocurre un error en la inserción
   */
  async create(genero) {
    try {
      const idCreado = await super.create(this.#nameTable, genero);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear el genero: ${error.message}`);
    }
  }

  /**
   * Actualiza un genero existente
   * @param {number} id - ID del genero a actualizar
   * @param {Object} genero - Objeto con los nuevos datos del genero
   * @returns {Promise<Object|null>} El genero actualizado, o null si falló
   * @throws {Error} Si ocurre un error en la actualización
   */
  async update(id, genero) {
    try {
      if (await super.update(this.#nameTable, id, genero)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al actualizar el genero con ID ${id}: ${error.message}`);
    }
  }

  /**
   * Elimina un genero de la base de datos
   * @param {number} id - ID del genero a eliminar
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no
   * @throws {Error} Si ocurre un error en la eliminación
   */
  async delete(id) {
    try {
      return await super.delete(this.#nameTable, id);
    } catch (error) {
      throw new Error(`Error al eliminar el genero con ID ${id}: ${error.message}`);
    }
  }
}

export default Genero;
