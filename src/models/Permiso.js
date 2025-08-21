import connection from '../utils/db.js';
import Modelo from './Modelo.js';

class Permiso extends Modelo {
  /**
   * Obtiene todos los permisos de la base de datos
   * @returns {Promise<Array>} Lista de todos los permisos
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAll() {
    try {
      return await super.getAll('permisos');
    } catch (error) {
      throw new Error(`Error al obtener todos los permisos: ${error.message}`);
    }
  }

  /**
   * Obtiene un permiso específico por su ID
   * @param {number} id - ID del permiso
   * @returns {Promise<Object|null>} El permiso encontrado o null si no existe
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getById(id) {
    try {
      return await super.getById('permisos', id);
    } catch (error) {
      throw new Error(`Error al obtener el permiso con ID ${id}: ${error.message}`);
    }
  }

  /**
   * Crea un nuevo permiso en la base de datos
   * @param {Object} permiso - Objeto con los datos del tipo {nombre, descripcion}
   * @returns {Promise<Object|null>} El permiso creado con su ID, o null si falló
   * @throws {Error} Si ocurre un error en la inserción
   */
  async create(permiso) {
    try {
      const idCreado = await super.create('permisos', permiso);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear el permiso: ${error.message}`);
    }
  }

  /**
   * Actualiza un permiso existente
   * @param {number} id - ID del permiso a actualizar
   * @param {Object} permiso - Objeto con los nuevos datos del tipo
   * @returns {Promise<Object|null>} El permiso actualizado, o null si falló
   * @throws {Error} Si ocurre un error en la actualización
   */
  async update(id, permiso) {
    try {
      if (await super.update('permisos', id, permiso)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al actualizar el permiso con ID ${id}: ${error.message}`);
    }
  }

  /**
   * Elimina un permiso de la base de datos
   * @param {number} id - ID del permiso a eliminar
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no
   * @throws {Error} Si ocurre un error en la eliminación
   */
  async delete(id) {
    try {
      return await super.delete('permisos', id);
    } catch (error) {
      throw new Error(`Error al eliminar el permiso con ID ${id}: ${error.message}`);
    }
  }
}

export default Permiso;
