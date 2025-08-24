import TipoDocumento from "../models/TipoDocumento.js";
import Usuario from "../models/Usuario.js";

class TipoDocumentoService {

  static objTipoDocumento = new TipoDocumento();
  static objUsuario = new Usuario();

  static async getAllTiposDocumentos() {
    try {
      // Llamamos el método listar
      const tiposDocumentos = await this.objTipoDocumento.getAll();

      // Validamos si no hay tipos de documentos
      if (!tiposDocumentos || tiposDocumentos.length === 0)
        return { error: true, code: 404, message: "No hay tipos de documentos registradas" };

      // Retornamos las tipos de documentos obtenidas
      return {
        error: false, code: 200, message: "Tipos de documentos obtenidos correctamente",
        data: tiposDocumentos
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getTipoDocumentoById(id) {
    try {
      // Llamamos el método consultar por ID
      const tipoDocumento = await this.objTipoDocumento.getById(id);
      // Validamos si no hay tipoDocumento
      if (!tipoDocumento)
        return { error: true, code: 404, message: "Tipo de documento no encontrado" };

      // Retornamos la tipoDocumento obtenida
      return {
        error: false, code: 200, message: "Tipo de documento obtenido correctamente",
        data: tipoDocumento
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createTipoDocumento(tipoDocumento) {
    try {

      // Llamamos el método crear
      const tipoDocumentoCreado = await this.objTipoDocumento.create(tipoDocumento);
      // Validamos si no se pudo crear el tipo de documento
      if (tipoDocumentoCreado === null)
        return { error: true, code: 400, message: "Error al crear el tipo de documento" };

      // Retornamos el tipo de documento creado
      return {
        error: false, code: 201, message: "Tipo de documento creado correctamente",
        data: tipoDocumentoCreado
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateTipoDocumento(id, tipoDocumento) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objTipoDocumento.getById(id);
      // Validamos si el tipo de documento existe
      if (!existente) {
        return { error: true, code: 404, message: "Tipo de documento no encontrado" };
      }

      // Llamamos el método actualizar
      const tipoDocumentoActualizado = await this.objTipoDocumento.update(id, tipoDocumento);
      // Validamos si no se pudo actualizar el tipo de documento
      if (tipoDocumentoActualizado === null)
        return { error: true, code: 400, message: "Error al actualizar el tipo de documento" };

      // Retornamos el tipo de documento actualizado
      return {
        error: false, code: 200, message: "Tipo de documento actualizado correctamente",
        data: tipoDocumentoActualizado
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteTipoDocumento(id) {
    try {
      // Llamamos el método consultar por ID
      const tipoDocumento = await this.objTipoDocumento.getById(id);
      // Validamos si el tipo de documento existe
      if (!tipoDocumento)
        return { error: true, code: 404, message: "Tipo de documento no encontrado" };

      const usuariosTipo = await this.objUsuario.getAllByTipoDocumentoId(id);
      // Validamos si no hay usuarios
      if (usuariosTipo && usuariosTipo.length > 0) {
        return { error: true, code: 409, message: "No se puede eliminar el tipo de documento porque tiene usuarios asociados" };
      }

      // Llamamos el método eliminar
      const tipoDocumentoEliminado = await this.objTipoDocumento.delete(id);
      // Validamos si no se pudo eliminar el tipo de documento
      if (!tipoDocumentoEliminado)
        return { error: true, code: 400, message: "Error al eliminar el tipo de documento" };


      // Retornamos el tipo de documento eliminado
      return { error: false, code: 200, message: "Tipo de documento eliminado correctamente" };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message:error.message };
    }
  }
}

export default TipoDocumentoService;
