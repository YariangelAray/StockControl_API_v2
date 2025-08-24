import Elemento from "../models/Elemento.js";
import Estado from "../models/Estado.js";

class EstadoService {

  static objEstado = new Estado();
  static objElemento = new Elemento();

  static async getAllEstados() {
    try {

      // Llamamos el método listar
      const estados = await this.objEstado.getAll();

      // Validamos si no hay estados
      if (!estados || estados.length === 0) {
        return { error: true, code: 404, message: "No hay estados registrados" };
      }
      // Retornamos los estados obtenidos
      return {
        error: false, code: 200, message: "Estados obtenidos correctamente",
        data: estados
      };

    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getEstadoById(id) {
    try {

      // Llamamos el método consultar por ID
      const estado = await this.objEstado.getById(id);
      // Validamos si no hay estado
      if (!estado) {
        return { error: true, code: 404, message: "Estado no encontrado" };
      }
      // Retornamos el estado obtenido
      return {
        error: false, code: 200, message: "Estado obtenido correctamente",
        data: estado
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message:error.message };
    }
  }

  static async createEstado(estado) {
    try {
      // Llamamos el método crear
      const estadoCreado = await this.objEstado.create(estado);
      // Validamos si no se pudo crear el estado
      if (estadoCreado === null) {
        return { error: true, code: 400, message: "Error al crear el estado" };
      }
      // Retornamos el estado creado
      return {
        error: false, code: 201, message: "Estado creado correctamente",
        data: estadoCreado
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateEstado(id, estado) {
    try {

      // Llamamos el método consultar por ID
      const existente = await this.objEstado.getById(id);
      // Validamos si el estado existe
      if (!existente) {
        return { error: true, code: 404, message: "Estado no encontrado" };
      }

      // Llamamos el método actualizar
      const estadoActualizado = await this.objEstado.update(id, estado);
      // Validamos si no se pudo actualizar el estado
      if (estadoActualizado === null) {
        return { error: true, code: 400, message: "Error al actualizar el estado" };
      }
      // Retornamos el estado actualizado
      return {
        error: false, code: 200, message: "Estado actualizado correctamente",
        data: estadoActualizado
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteEstado(id) {
    try {

      // Llamamos el método consultar por ID
      const estado = await this.objEstado.getById(id);
      // Validamos si el estado existe
      if (!estado) {
        return { error: true, code: 404, message: "Estado no encontrado" };
      }

      const elementosEstado = await this.objElemento.getAllByEstadoId(id);
      // Validamos si no hay elementos
      if (elementosEstado && elementosEstado.length > 0) {
        return { error: true, code: 409, message: "No se puede eliminar el estado porque tiene elementos asociados" };
      }

      // Llamamos el método eliminar
      const estadoEliminado = await this.objEstado.delete(id);
      // Validamos si no se pudo eliminar el estado
      if (!estadoEliminado) {
        return { error: true, code: 400, message: "Error al eliminar el estado" };
      }

      // Retornamos el estado eliminado
      return { error: false, code: 200, message: "Estado eliminado correctamente" };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default EstadoService;