import Modelo from './Modelo.js';

class Foto extends Modelo {

  #nameTable = 'fotos';
  /**
   * Método para obtener todas las fotos almacenadas en la base de datos
   * @returns {Promise<Array>} Array de fotos obtenidas de la base de datos
   * @throws {Error} Si ocurre un error al consultar la base de datos
   */
  async getAll() {
    try {
      return await super.getAll(this.#nameTable);
    } catch (error) {
      throw new Error(`Error al obtener todas las fotos: ${error.message}`);
    }
  }

  /**
   * Método para obtener una foto por su ID
   * @param {number} id Identificador único de la foto
   * @returns {Promise<Object|null>} Objeto foto si existe, null si no se encuentra
   * @throws {Error} Si ocurre un error al consultar la base de datos
   */
  async getById(id) {
    try {
      return await super.getById(this.#nameTable, id);
    } catch (error) {
      throw new Error(`Error al obtener la foto con ID ${id}: ${error.message}`);
    }
  }

  /**
   * Método para obtener fotos asociadas a un reporte específico
   * @param {number} reporteId ID del reporte al que están asociadas las fotos
   * @returns {Promise<Array>} Array de fotos asociadas al reporte
   * @throws {Error} Si ocurre un error al consultar la base de datos
   */
  async getAllByReporteId(reporteId) {
    try {
      return await super.getByField(this.#nameTable, 'reporte_id', reporteId);
    } catch (error) {
      throw new Error(`Error al obtener fotos por reporte_id ${reporteId}: ${error.message}`);
    }
  }

  /**
   * Método para crear una nueva foto en la base de datos
   * @param {Object} foto Objeto con los datos de la foto {url, reporte_id}
   * @returns {Promise<Object|null>} Objeto foto creado con su ID, null si falla
   * @throws {Error} Si ocurre un error al insertar en la base de datos
   */
  async create(foto) {
    try {
      const idCreado = await super.create(this.#nameTable, foto);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear la foto: ${error.message}`);
    }
  }

  /**
   * Método para actualizar los datos de una foto existente
   * @param {number} id ID de la foto a actualizar
   * @param {Object} foto Objeto con los nuevos datos de la foto
   * @returns {Promise<Object|null>} Objeto foto actualizado, null si falla
   * @throws {Error} Si ocurre un error al actualizar en la base de datos
   */
  async update(id, foto) {
    try {
      if (await super.update(this.#nameTable, id, foto)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al actualizar la foto con ID ${id}: ${error.message}`);
    }
  }

  /**
   * Método para eliminar una foto de la base de datos
   * @param {number} id ID de la foto a eliminar
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no
   * @throws {Error} Si ocurre un error al eliminar de la base de datos
   */
  async delete(id) {
    try {
      return await super.delete(this.#nameTable, id);
    } catch (error) {
      throw new Error(`Error al eliminar la foto con ID ${id}: ${error.message}`);
    }
  }
}

export default Foto;