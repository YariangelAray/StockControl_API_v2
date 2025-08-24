import connection from '../utils/db.js';
import Modelo from './Modelo.js';

class PermisoRol extends Modelo {
  /**
   * Obtiene todas las relaciones permiso-rol de la base de datos
   * @returns {Promise<Array>} Lista de todas las relaciones permiso-rol
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAll() {
    try {
      return await super.getAll('permisos_roles');
    } catch (error) {
      throw new Error(`Error al obtener las relaciones permiso-rol: ${error.message}`);
    }
  }

  /**
   * Obtiene una relación permiso-rol específica por su ID
   * @param {number} id - ID de la relación permiso-rol
   * @returns {Promise<Object|null>} La relación permiso-rol encontrada o null si no existe
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getById(id) {
    try {
      return await super.getById('permisos_roles', id);
    } catch (error) {
      throw new Error(`Error al obtener la relación permiso-rol con ID ${id}: ${error.message}`);
    }
  }
  
  /**
   * Obtiene todas las relaciones permiso-rol asociadas a un permiso
   * @param {number} permisoId - ID del permiso
   * @returns {Promise<Array>} Lista de relaciones permiso-rol del permiso
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAllByPermisoId(permisoId) {
    try {
      return await super.getByField('permisos_roles', 'permiso_id', permisoId);
    } catch (error) {
      throw new Error(`Error al obtener la relaciones permiso-rol por permiso_id ${permisoId}: ${error.message}`);
    }
  }
  
  /**
   * Obtiene todas las relaciones permiso-rol asociadas a un rol
   * @param {number} rolId - ID del rol
   * @returns {Promise<Array>} Lista de relaciones permiso-rol del rol
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAllByRolId(rolId) {
    try {
      return await super.getByField('permisos_roles', 'rol_id', rolId);
    } catch (error) {
      throw new Error(`Error al obtener la relaciones permiso-rol por rol_id ${rolId}: ${error.message}`);
    }
  }

  /**
   * Crea una nueva relación permiso-rol en la base de datos
   * @param {Object} permisoRol - Objeto con los datos de la relación {rol_id, permiso_id}
   * @returns {Promise<Object|null>} La relación creada con su ID, o null si falló
   * @throws {Error} Si ocurre un error en la inserción
   */
  async create(permisoRol) {
    try {
      const idCreado = await super.create('permisos_roles', permisoRol);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear la relación permiso-rol: ${error.message}`);
    }
  }

  /**
   * Actualiza una relación existente
   * @param {number} id - ID de la relación a actualizar
   * @param {Object} permisoRol - Objeto con los nuevos datos de la relación
   * @returns {Promise<Object|null>} La relación actualizada, o null si falló
   * @throws {Error} Si ocurre un error en la actualización
   */
  async update(id, permisoRol) {
    try {
      if (await super.update('permisos_roles', id, permisoRol)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al actualizar la relación permiso-rol con ID ${id}: ${error.message}`);
    }
  }

  /**
   * Elimina una relacion de la base de datos
   * @param {number} id - ID de la relacion a eliminar
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no
   * @throws {Error} Si ocurre un error en la eliminación
   */
  async delete(id) {
    try {
      return await super.delete('permisos_roles', id);
    } catch (error) {
      throw new Error(`Error al eliminar la relacion permiso-rol con ID ${id}: ${error.message}`);
    }
  }
}

export default PermisoRol;
