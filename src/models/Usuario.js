import Modelo from './Modelo.js';

class Usuario extends Modelo {

  #nameTable = 'usuarios';

  /**
   * Método para obtener los usuarios almacenados en la base de datos
   *
   * @returns {QueryResult} Arreglo de usuarios obtenidos de la base de datos
   */
  async getAll() {
    try {
      return await super.getAll(this.#nameTable);
    } catch (error) {
      throw new Error(`Error al obtener todos los usuarios: ${error.message}`);
    }
  }

  /**
   * Método para obtener un usuario por su id
   *
   * @param {Number} id Identificador del usuario
   * @returns {Object} Objeto usuario
   */
  async getById(id) {
    try {
      return await super.getById(this.#nameTable, id);
    } catch (error) {
      throw new Error(`Error al obtener el usuario con ID ${id}: ${error.message}`);
    }
  }
  /**
   * Método para obtener un usuario por su documento
   *
   * @param {Number} documento Documento del usuario
   * @returns {Object} Objeto usuario
   */
  async getByDocumento(documento) {
    try {
      return (await super.getByField(this.#nameTable, 'documento', documento))[0];
    } catch (error) {
      throw new Error(`Error al obtener el usuario con documento ${documento}: ${error.message}`);
    }
  }
  /**
   * Método para obtener un usuario por su correo
   *
   * @param {Number} correo Correo del usuario
   * @returns {Object} Objeto usuario
   */
  async getByCorreo(correo) {
    try {
      return (await super.getByField(this.#nameTable, 'correo', correo))[0];
    } catch (error) {
      throw new Error(`Error al obtener el usuario con correo ${correo}: ${error.message}`);
    }
  }

  /**
   * Método para obtener usuarios por usuario_documento_id
   *
   * @param {Number} usuarioDocumentoId Identificador del usuario de usuario
   * @returns {Array} Arreglo de usuarios
   */
  async getAllByTipoDocumentoId(tipoDocumentoId) {
    try {
      return await this.getByField(this.#nameTable, 'tipo_documento_id', tipoDocumentoId);
    } catch (error) {
      throw new Error(`Error al obtener usuarios por tipo_documento_id ${tipoDocumentoId}: ${error.message}`);
    }
  }

  /**
   * Método para obtener usuarios por genero_id
   *
   * @param {Number} generoId Identificador del genero
   * @returns {Array} Arreglo de usuarios
   */
  async getAllByGeneroId(generoId) {
    try {
      return await this.getByField(this.#nameTable, 'genero_id', generoId);
    } catch (error) {
      throw new Error(`Error al obtener usuarios por genero_id ${generoId}: ${error.message}`);
    }
  }

  /**
   * Método para obtener usuarios por ficha_id
   *
   * @param {Number} fichaId Identificador del ficha
   * @returns {Array} Arreglo de usuarios
   */
  async getAllByFichaId(fichaId) {
    try {
      return await this.getByField(this.#nameTable, 'ficha_id', fichaId);
    } catch (error) {
      throw new Error(`Error al obtener usuarios por ficha_id ${fichaId}: ${error.message}`);
    }
  }

  /**
   * Crea un nuevo usuario en la base de datos
   * @param {Object} usuario - Objeto con los datos del usuario {nombres, apellidos, tipo_documento_id, documento, genero_id, telefono, correo, ficha_id, contrasena}
   * @returns {Promise<Object|null>} El usuario creado con su ID, o null si falló
   * @throws {Error} Si ocurre un error en la inserción
   */
  async create(usuario) {
    try {
      const idCreado = await super.create(this.#nameTable, usuario);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  }

  /**
   * Actualiza un usuario existente
   * @param {number} id - ID del usuario a actualizar
   * @param {Object} usuario - Objeto con los nuevos datos del usuario
   * @returns {Promise<Object|null>} El usuario actualizado, o null si falló
   * @throws {Error} Si ocurre un error en la actualización
   */
  async update(id, usuario) {
    try {
      if (await super.update(this.#nameTable, id, usuario)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al actualizar el usuario con ID ${id}: ${error.message}`);
    }
  }

  /**
   * Elimina un usuario de la base de datos
   * @param {number} id - ID del usuario a eliminar
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no
   * @throws {Error} Si ocurre un error en la eliminación
   */
  async delete(id) {
    try {
      return await super.delete(this.#nameTable, id);
    } catch (error) {
      throw new Error(`Error al eliminar el usuario con ID ${id}: ${error.message}`);
    }
  }
}

export default Usuario;