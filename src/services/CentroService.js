import Ambiente from "../models/Ambiente.js";
import Centro from "../models/Centro.js";

class CentroService {

  static objCentro = new Centro();
  static objAmbiente = new Ambiente();

  static async getAllCentros() {
    try {

      // Llamamos el método listar
      const centros = await this.objCentro.getAll();

      // Validamos si no hay centros
      if (!centros) {
        return { error: true, code: 404, message: "No hay centros registrados" };
      }
      // Retornamos los centros obtenidos
      return {
        error: false, code: 200, message: "Centros obtenidos correctamente",
        data: centros
      };

    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: `Error al obtener los centros: ${error.message}` };
    }
  }

  static async getCentroById(id) {
    try {

      // Llamamos el método consultar por ID
      const centro = await this.objCentro.getById(id);
      // Validamos si no hay centro
      if (!centro) {
        return { error: true, code: 404, message: "Centro no encontrado" };
      }
      // Retornamos el centro obtenido
      return {
        error: false, code: 200, message: "Centro obtenido correctamente",
        data: centro
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al obtener el centro: ${error.message}` };
    }
  }

  static async createCentro(centro) {
    try {
      // Llamamos el método crear
      const centroCreado = await this.objCentro.create(centro);
      // Validamos si no se pudo crear el centro
      if (centroCreado === null) {
        return { error: true, code: 400, message: "Error al crear el centro" };
      }
      // Retornamos el centro creado
      return {
        error: false, code: 201, message: "Centro creado correctamente",
        data: centroCreado
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al crear el centro: ${error.message}` };
    }
  }

  static async updateCentro(id, centro) {
    try {

      // Llamamos el método consultar por ID
      const existente = await this.objCentro.getById(id);
      // Validamos si el centro existe
      if (!existente) {
        return { error: true, code: 404, message: "Centro no encontrado" };
      }

      // Llamamos el método actualizar
      const centroActualizado = await this.objCentro.update(id, centro);
      // Validamos si no se pudo actualizar el centro
      if (centroActualizado === null) {
        return { error: true, code: 400, message: "Error al actualizar el centro" };
      }
      // Retornamos el centro actualizado
      return {
        error: false, code: 200, message: "Centro actualizado correctamente",
        data: centroActualizado
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al actualizar el centro: ${error.message}` };
    }
  }

  static async deleteCentro(id) {
    try {

      // Llamamos el método consultar por ID
      const centro = await this.objCentro.getById(id);
      // Validamos si el centro existe
      if (!centro) {
        return { error: true, code: 404, message: "Centro no encontrado" };
      }

      const elementosCentro = await this.objAmbiente.getAllByCentroId(id);
      // Validamos si no hay elementos
      if (elementosCentro && elementosCentro.length > 0) {
        return { error: true, code: 409, message: "No se puede eliminar el centro porque tiene elementos asociados" };
      }

      // Llamamos el método eliminar
      const centroEliminado = await this.objCentro.delete(id);
      // Validamos si no se pudo eliminar el centro
      if (!centroEliminado) {
        return { error: true, code: 400, message: "Error al eliminar el centro" };
      }

      // Retornamos el centro eliminado
      return { error: false, code: 200, message: "Centro eliminado correctamente" };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al eliminar el centro: ${error.message}` };
    }
  }
}

export default CentroService;