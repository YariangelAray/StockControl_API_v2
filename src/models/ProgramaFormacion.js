import connection from '../utils/connection.js';
import Modelo from './Modelo.js';

class ProgramaFormacion extends Modelo {

  #nameTable = 'programas_formacion';

  /**
   * Obtiene todos los programas de formación de la base de datos
   * @returns {Promise<Array>} Lista de todos los programas de formación
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAll() {
    try {
      return await super.getAll(this.#nameTable);
    } catch (error) {
      throw new Error(`Error al obtener todos los programas de formación: ${error.message}`);
    }
  }

  /**
   * Obtiene un programa de formación específico por su ID
   * @param {number} id - ID del programa de formación
   * @returns {Promise<Object|null>} El programa de formación encontrado o null si no existe
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getById(id) {
    try {
      return await super.getById(this.#nameTable, id);
    } catch (error) {
      throw new Error(`Error al obtener el programa de formación con ID ${id}: ${error.message}`);
    }
  }

  /**
   * Crea un nuevo programa de formación en la base de datos
   * @param {Object} programaFormacion - Objeto con los datos del tipo {nombre}
   * @returns {Promise<Object|null>} El programa de formación creado con su ID, o null si falló
   * @throws {Error} Si ocurre un error en la inserción
   */
  async create(programaFormacion) {
    try {
      const idCreado = await super.create(this.#nameTable, programaFormacion);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear el programa de formación: ${error.message}`);
    }
  }

  /**
   * Actualiza un programa de formación existente
   * @param {number} id - ID del programa de formación a actualizar
   * @param {Object} programaFormacion - Objeto con los nuevos datos del tipo
   * @returns {Promise<Object|null>} El programa de formación actualizado, o null si falló
   * @throws {Error} Si ocurre un error en la actualización
   */
  async update(id, programaFormacion) {
    try {
      if (await super.update(this.#nameTable, id, programaFormacion)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al actualizar el programa de formación con ID ${id}: ${error.message}`);
    }
  }

  /**
   * Elimina un programa de formación de la base de datos
   * @param {number} id - ID del programa de formación a eliminar
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no
   * @throws {Error} Si ocurre un error en la eliminación
   */
  async delete(id) {
    try {
      return await super.delete(this.#nameTable, id);
    } catch (error) {
      throw new Error(`Error al eliminar el programa de formación con ID ${id}: ${error.message}`);
    }
  }
}

export default ProgramaFormacion;
