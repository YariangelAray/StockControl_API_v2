import connection from '../utils/db.js';
import Modelo from './Modelo.js';

class RolUsuario extends Modelo {

  #nameTable = 'roles_usuarios';

  /**
   * Obtiene todas las relaciones rol-usuario de la base de datos
   * @returns {Promise<Array>} Lista de todas las relaciones rol-usuario
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAll() {
    try {
      return await super.getAll(this.#nameTable);
    } catch (error) {
      throw new Error(`Error al obtener las relaciones rol-usuario: ${error.message}`);
    }
  }

  /**
   * Obtiene una relacion rol-usuario específica por su ID
   * @param {number} id - ID de la relacion rol-usuario
   * @returns {Promise<Object|null>} La relacion rol-usuario encontrada o null si no existe
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getById(id) {
    try {
      return await super.getById(this.#nameTable, id);
    } catch (error) {
      throw new Error(`Error al obtener la relacion rol-usuario con ID ${id}: ${error.message}`);
    }
  }

  /**
   * Obtiene todas las relaciones rol-usuario asociadas a un rol
   * @param {number} rolId - ID del rol
   * @returns {Promise<Array>} Lista de relaciones rol-usuario del rol
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAllByRolId(rolId) {
    try {
      return await super.getByField(this.#nameTable, 'rol_id', rolId);
    } catch (error) {
      throw new Error(`Error al obtener la relaciones rol-usuario por rol_id ${rolId}: ${error.message}`);
    }
  }

  /**
   * Obtiene todas las relaciones rol-usuario asociadas a un usuario
   * @param {number} usuarioId - ID del usuario
   * @returns {Promise<Array>} Lista de relaciones rol-usuario del usuario
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAllByUsuarioId(usuarioId) {
    try {
      return await super.getByField(this.#nameTable, 'usuario_id', usuarioId);
    } catch (error) {
      throw new Error(`Error al obtener la relaciones rol-usuario por usuario_id ${usuarioId}: ${error.message}`);
    }
  }

  /**
   * Crea una nueva relacion rol-usuario en la base de datos
   * @param {Object} rolUsuario - Objeto con los datos de la relacion {rol_id, usuario_id}
   * @returns {Promise<Object|null>} La relacion creada con su ID, o null si falló
   * @throws {Error} Si ocurre un error en la inserción
   */
  async create(rolUsuario) {
    try {
      const idCreado = await super.create(this.#nameTable, rolUsuario);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear la relacion rol-usuario: ${error.message}`);
    }
  }

  /**
   * Actualiza una relacion existente
   * @param {number} id - ID de la relacion a actualizar
   * @param {Object} rolUsuario - Objeto con los nuevos datos de la relacion
   * @returns {Promise<Object|null>} La relacion actualizada, o null si falló
   * @throws {Error} Si ocurre un error en la actualización
   */
  async update(id, rolUsuario) {
    try {
      if (await super.update(this.#nameTable, id, rolUsuario)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al actualizar la relacion rol-usuario con ID ${id}: ${error.message}`);
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
      return await super.delete(this.#nameTable, id);
    } catch (error) {
      throw new Error(`Error al eliminar la relacion rol-usuario con ID ${id}: ${error.message}`);
    }
  }
}

export default RolUsuario;
