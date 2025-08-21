import Modelo from './Modelo.js';

class Elemento extends Modelo {

  /**
   * Método para obtener los elementos almacenados en la base de datos
   *
   * @returns {QueryResult} Areglo de elementos obtenidos de la base de datos
   */
  async getAll() {
    try {
      return await super.getAll('elementos');
    } catch (error) {
      throw new Error(`Error al obtener todos los elementos: ${error.message}`);
    }
  }

  /**
   * Método para obtener un elemento por su id
   *
   * @param {Number} id Identificador del elemento
   * @returns {Object} Objeto elemento
   */
  async getById(id) {
    try {
      return await super.getById('elementos', id);
    } catch (error) {
      throw new Error(`Error al obtener el elemento con ID ${id}: ${error.message}`);
    }
  }
  /**
   * Método para obtener un elemento por su placa
   *
   * @param {Number} placa Placa del elemento
   * @returns {Object} Objeto elemento
   */
  async getByPlaca(placa) {
    try {
      return (await super.getByField('elementos', 'placa', placa))[0];
    } catch (error) {
      throw new Error(`Error al obtener el elemento con placa ${placa}: ${error.message}`);
    }
  }
  /**
   * Método para obtener un elemento por su serial
   *
   * @param {Number} serial Serial del elemento
   * @returns {Object} Objeto elemento
   */
  async getBySerial(serial) {
    try {
      return (await super.getByField('elementos', 'serial', serial))[0];
    } catch (error) {
      throw new Error(`Error al obtener el elemento con serial ${serial}: ${error.message}`);
    }
  }

  /**
   * Método para obtener elementos por tipo_elemento_id
   *
   * @param {Number} tipoElementoId Identificador del tipo de elemento
   * @returns {Array} Arreglo de elementos
   */
  async getAllByTipoElementoId(tipoElementoId) {
    try {
      return await this.getByField('elementos', 'tipo_elemento_id', tipoElementoId);
    } catch (error) {
      throw new Error(`Error al obtener elementos por tipo_elemento_id ${tipoElementoId}: ${error.message}`);
    }
  }

  /**
   * Método para obtener elementos por estado_id
   *
   * @param {Number} estadoId Identificador del estado
   * @returns {Array} Arreglo de elementos
   */
  async getAllByEstadoId(estadoId) {
    try {
      return await this.getByField('elementos', 'estado_id', estadoId);
    } catch (error) {
      throw new Error(`Error al obtener elementos por estado_id ${estadoId}: ${error.message}`);
    }
  }

  /**
   * Método para obtener elementos por ambiente_id
   *
   * @param {Number} ambienteId Identificador del ambiente
   * @returns {Array} Arreglo de elementos
   */
  async getAllByAmbienteId(ambienteId) {
    try {
      return await this.getByField('elementos', 'ambiente_id', ambienteId);
    } catch (error) {
      throw new Error(`Error al obtener elementos por ambiente_id ${ambienteId}: ${error.message}`);
    }
  }

  /**
   * Método para obtener elementos por inventario_id
   *
   * @param {Number} inventarioId Identificador del inventario
   * @returns {Array} Arreglo de elementos
   */
  async getAllByInventarioId(inventarioId) {
    try {
      return await this.getByField('elementos', 'inventario_id', inventarioId);
    } catch (error) {
      throw new Error(`Error al obtener elementos por inventario_id ${inventarioId}: ${error.message}`);
    }
  }

  /**
   * Método para crear un nuevo elemento
   *
   * @returns {Object} Objeto elemento
   */
  async create(elemento) {
    try {
      const idCreado = await super.create('elementos', elemento);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear el elemento: ${error.message}`);
    }
  }

  /**
   * Método para actualizar un elemento
   *
   * @param {Number} id Identificador del elemento
   * @returns {Object} Objeto elemento actualizado
   */
  async update(id, elemento) {
    try {
      if (await super.update('elementos', id, elemento)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al actualizar el elemento con ID ${id}: ${error.message}`);
    }
  }

  /**
   * Método para eliminar un elemento
   * @param {Number} id identificador del elemento
   * @returns {String} Mensaje de respuesta
   */
  async delete(id) {
    try {
      return await super.delete('elementos', id);
    } catch (error) {
      throw new Error(`Error al eliminar el elemento con ID ${id}: ${error.message}`);
    }
  }
}

export default Elemento;