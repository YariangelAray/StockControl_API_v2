import connection from '../utils/connection.js';
import Modelo from './Modelo.js';

class Ambiente extends Modelo {
  
  #nameTable = 'ambientes';

  /**
   * Obtiene todos los ambientes de la base de datos
   * @returns {Promise<Array>} Lista de todos los ambientes
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAll() {
    try {
      return await super.getAll(this.#nameTable);
    } catch (error) {
      throw new Error(`Error al obtener todos los ambientes: ${error.message}`);
    }
  }

  /**
   * Obtiene un ambiente específico por su ID
   * @param {number} id - ID del ambiente
   * @returns {Promise<Object|null>} El ambiente encontrado o null si no existe
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getById(id) {
    try {
      return await super.getById(this.#nameTable, id);
    } catch (error) {
      throw new Error(`Error al obtener el ambiente con ID ${id}: ${error.message}`);
    }
  }

  /**
   * Obtiene todos los ambientes asociados a un centro
   * @param {number} centroId - ID del centro
   * @returns {Promise<Array>} Lista de ambientes del centro
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAllByCentroId(centroId) {
    try {
      return await super.getByField(this.#nameTable, 'centro_id', centroId);
    } catch (error) {
      throw new Error(`Error al obtener ambientes por centro_id ${centroId}: ${error.message}`);
    }
  }

  /**
   * Crea un nuevo ambiente en la base de datos
   * @param {Object} ambiente - Objeto con los datos del ambiente {nombre, centro_id, mapa}
   * @returns {Promise<Object|null>} El ambiente creado con su ID, o null si falló
   * @throws {Error} Si ocurre un error en la inserción
   */
  async create(ambiente) {
    try {
      const idCreado = await super.create(this.#nameTable, ambiente);
      if (idCreado) {        
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear el ambiente: ${error.message}`);
    }
  }

  /**
   * Actualiza un ambiente existente
   * @param {number} id - ID del ambiente a actualizar
   * @param {Object} ambiente - Objeto con los nuevos datos del ambiente
   * @returns {Promise<Object|null>} El ambiente actualizado, o null si falló
   * @throws {Error} Si ocurre un error en la actualización
   */
  async update(id, ambiente) {
    try {
      if (await super.update(this.#nameTable, id, ambiente)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al actualizar el ambiente con ID ${id}: ${error.message}`);
    }
  }

  /**
   * Elimina un ambiente de la base de datos
   * @param {number} id - ID del ambiente a eliminar
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no
   * @throws {Error} Si ocurre un error en la eliminación
   */
  async delete(id) {
    try {
      return await super.delete(this.#nameTable, id);
    } catch (error) {
      throw new Error(`Error al eliminar el ambiente con ID ${id}: ${error.message}`);
    }
  }
}

export default Ambiente;
