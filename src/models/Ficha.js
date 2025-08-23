import Modelo from './Modelo.js';

class Ficha extends Modelo {
  /**
   * Método para obtener todas las fichas almacenadas en la base de datos
   * @returns {Promise<Array>} Array de fichas obtenidas de la base de datos
   * @throws {Error} Si ocurre un error al consultar la base de datos
   */
  async getAll() {
    try {
      return await super.getAll('fichas');
    } catch (error) {
      throw new Error(`Error al obtener todas las fichas: ${error.message}`);
    }
  }

  /**
   * Método para obtener una ficha por su ID
   * @param {number} id Identificador único de la ficha
   * @returns {Promise<Object|null>} Objeto ficha si existe, null si no se encuentra
   * @throws {Error} Si ocurre un error al consultar la base de datos
   */
  async getById(id) {
    try {
      return await super.getById('fichas', id);
    } catch (error) {
      throw new Error(`Error al obtener la ficha con ID ${id}: ${error.message}`);
    }
  }

  /**
   * Método para obtener fichas asociadas a un programa específico
   * @param {number} programaId ID del programa al que están asociadas las fichas
   * @returns {Promise<Array>} Array de fichas asociadas al programa
   * @throws {Error} Si ocurre un error al consultar la base de datos
   */
  async getAllByProgramaId(programaId) {
    try {
      return await super.getByField('fichas', 'programa_id', programaId);
    } catch (error) {
      throw new Error(`Error al obtener fichas por programa_id ${programaId}: ${error.message}`);
    }
  }

  /**
   * Método para obtener una ficha por su número de ficha
   * @param {number} ficha Número de la ficha
   * @returns {Promise<Object|null>} Objeto ficha si existe, null si no se encuentra
   * @throws {Error} Si ocurre un error al consultar la base de datos
   */
  async getByFicha(ficha) {
    try {
      return await super.getByField('fichas', 'ficha', ficha);
    } catch (error) {
      throw new Error(`Error al obtener la ficha ${ficha}: ${error.message}`);
    }
  }

  /**
   * Método para crear una nueva ficha en la base de datos
   * @param {Object} ficha Objeto con los datos de la ficha {ficha, programa_id}
   * @returns {Promise<Object|null>} Objeto ficha creado con su ID, null si falla
   * @throws {Error} Si ocurre un error al insertar en la base de datos
   */
  async create(ficha) {
    try {
      const idCreado = await super.create('fichas', ficha);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear la ficha: ${error.message}`);
    }
  }

  /**
   * Método para actualizar los datos de una ficha existente
   * @param {number} id ID de la ficha a actualizar
   * @param {Object} ficha Objeto con los nuevos datos de la ficha
   * @returns {Promise<Object|null>} Objeto ficha actualizado, null si falla
   * @throws {Error} Si ocurre un error al actualizar en la base de datos
   */
  async update(id, ficha) {
    try {
      if (await super.update('fichas', id, ficha)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al actualizar la ficha con ID ${id}: ${error.message}`);
    }
  }

  /**
   * Método para eliminar una ficha de la base de datos
   * @param {number} id ID de la ficha a eliminar
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no
   * @throws {Error} Si ocurre un error al eliminar de la base de datos
   */
  async delete(id) {
    try {
      return await super.delete('fichas', id);
    } catch (error) {
      throw new Error(`Error al eliminar la ficha con ID ${id}: ${error.message}`);
    }
  }
}

export default Ficha;