import connection from '../utils/db.js';
import Modelo from './Modelo.js';

class TipoElemento extends Modelo {

  #nameTable = 'tipos_Elementos';

  /**
   * Obtiene todos los tipos de elemento de la base de datos
   * @returns {Promise<Array>} Lista de todos los tipos de elemento
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAll() {
    try {
      return await super.getAll(this.#nameTable);
    } catch (error) {
      throw new Error(`Error al obtener todos los tipos de elemento: ${error.message}`);
    }
  }

  /**
   * Obtiene un tipo de elemento específico por su ID
   * @param {number} id - ID del tipo de elemento
   * @returns {Promise<Object|null>} El tipo de elemento encontrado o null si no existe
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getById(id) {
    try {
      return await super.getById(this.#nameTable, id);
    } catch (error) {
      throw new Error(`Error al obtener el tipo de elemento con ID ${id}: ${error.message}`);
    }
  }

  /**
   * Obtiene un tipo de elemento por su consecutivo
   * @param {number} consecutivo - Número consecutivo del tipo de elemento
   * @returns {Promise<Object|null>} El tipo de elemento encontrado o null si no existe
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getByConsecutivo(consecutivo) {
    try {
      return (await super.getByField(this.#nameTable, 'consecutivo', consecutivo))[0];
    } catch (error) {
      throw new Error(`Error al obtener el tipo de elemento por consecutivo ${consecutivo}: ${error.message}`);
    }
  }

  /**
   * Crea un nuevo tipo de elemento en la base de datos
   * @param {Object} tipoElemento - Objeto con los datos del tipo {nombre, consecutivo, descripcion, marca, modelo, atributos}
   * @returns {Promise<Object|null>} El tipo de elemento creado con su ID, o null si falló
   * @throws {Error} Si ocurre un error en la inserción
   */
  async create(tipoElemento) {
    try {
      const idCreado = await super.create(this.#nameTable, tipoElemento);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear el tipo de elemento: ${error.message}`);
    }
  }

  /**
   * Actualiza un tipo de elemento existente
   * @param {number} id - ID del tipo de elemento a actualizar
   * @param {Object} tipoElemento - Objeto con los nuevos datos del tipo
   * @returns {Promise<Object|null>} El tipo de elemento actualizado, o null si falló
   * @throws {Error} Si ocurre un error en la actualización
   */
  async update(id, tipoElemento) {
    try {
      if (await super.update(this.#nameTable, id, tipoElemento)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al actualizar el tipo de elemento con ID ${id}: ${error.message}`);
    }
  }

  /**
   * Elimina un tipo de elemento de la base de datos
   * @param {number} id - ID del tipo de elemento a eliminar
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no
   * @throws {Error} Si ocurre un error en la eliminación
   */
  async delete(id) {
    try {
      return await super.delete(this.#nameTable, id);
    } catch (error) {
      throw new Error(`Error al eliminar el tipo de elemento con ID ${id}: ${error.message}`);
    }
  }
}

export default TipoElemento;
