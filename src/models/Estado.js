import connection from '../utils/db.js';
import Modelo from './Modelo.js';

class Estado extends Modelo {
  /**
   * Obtiene todos los estados de la base de datos
   * @returns {Promise<Array>} Lista de todos los estados
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAll() {
    try {
      return await super.getAll('estados');
    } catch (error) {
      throw new Error(`Error al obtener todos los estados: ${error.message}`);
    }
  }

  /**
   * Obtiene un estado específico por su ID
   * @param {number} id - ID del estado
   * @returns {Promise<Object|null>} El estado encontrado o null si no existe
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getById(id) {
    try {
      return await super.getById('estados', id);
    } catch (error) {
      throw new Error(`Error al obtener el estado con ID ${id}: ${error.message}`);
    }
  }

  /**
   * Crea un nuevo estado en la base de datos
   * @param {Object} estado - Objeto con los datos del estado {nombre}
   * @returns {Promise<Object|null>} El estado creado con su ID, o null si falló
   * @throws {Error} Si ocurre un error en la inserción
   */
  async create(estado) {
    try {
      const idCreado = await super.create('estados', estado);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear el estado: ${error.message}`);
    }
  }

  /**
   * Actualiza un estado existente
   * @param {number} id - ID del estado a actualizar
   * @param {Object} estado - Objeto con los nuevos datos del estado
   * @returns {Promise<Object|null>} El estado actualizado, o null si falló
   * @throws {Error} Si ocurre un error en la actualización
   */
  async update(id, estado) {
    try {
      if (await super.update('estados', id, estado)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al actualizar el estado con ID ${id}: ${error.message}`);
    }
  }

  /**
   * Elimina un estado de la base de datos
   * @param {number} id - ID del estado a eliminar
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no
   * @throws {Error} Si ocurre un error en la eliminación
   */
  async delete(id) {
    try {
      return await super.delete('estados', id);
    } catch (error) {
      throw new Error(`Error al eliminar el estado con ID ${id}: ${error.message}`);
    }
  }
}

export default Estado;
