import Elemento from "../models/Elemento.js";
import Ambiente from "../models/Ambiente.js";

class AmbienteService {

  static objAmbiente = new Ambiente();
  static objElemento = new Elemento();

  static async getAllAmbientes() {
    try {

      // Llamamos el método listar
      const ambientes = await this.objAmbiente.getAll();

      // Validamos si no hay ambientes
      if (!ambientes) {
        return { error: true, code: 404, message: "No hay ambientes registrados" };
      }
      // Retornamos los ambientes obtenidos
      return {
        error: false, code: 200, message: "Ambientes obtenidos correctamente",
        data: ambientes
      };

    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: `Error al obtener los ambientes: ${error.message}` };
    }
  }

  static async getAmbienteById(id) {
    try {

      // Llamamos el método consultar por ID
      const ambiente = await this.objAmbiente.getById(id);
      // Validamos si no hay ambiente
      if (!ambiente) {
        return { error: true, code: 404, message: "Ambiente no encontrado" };
      }
      // Retornamos el ambiente obtenido
      return {
        error: false, code: 200, message: "Ambiente obtenido correctamente",
        data: ambiente
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al obtener el ambiente: ${error.message}` };
    }
  }

  static async createAmbiente(ambiente) {
    try {

      if (ambiente.centro_id) {
        const centroExistente = this.objCentro.getById(ambiente.centro_id);
        if (!centroExistente)
          return { error: true, code: 404, message: "El centro especificado no existe." };
      }

      // Llamamos el método crear
      const ambienteCreado = await this.objAmbiente.create(ambiente);
      // Validamos si no se pudo crear el ambiente
      if (ambienteCreado === null) {
        return { error: true, code: 400, message: "Error al crear el ambiente" };
      }
      // Retornamos el ambiente creado
      return {
        error: false, code: 201, message: "Ambiente creado correctamente",
        data: ambienteCreado
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al crear el ambiente: ${error.message}` };
    }
  }

  static async updateAmbiente(id, ambiente) {
    try {

      // Llamamos el método consultar por ID
      const existente = await this.objAmbiente.getById(id);
      // Validamos si el ambiente existe
      if (!existente) {
        return { error: true, code: 404, message: "Ambiente no encontrado" };
      }

      if (ambiente.centro_id) {
        const centroExistente = this.objCentro.getById(ambiente.centro_id);
        if (!centroExistente)
          return { error: true, code: 404, message: "El centro especificado no existe." };
      }

      // Llamamos el método actualizar
      const ambienteActualizado = await this.objAmbiente.update(id, ambiente);
      // Validamos si no se pudo actualizar el ambiente
      if (!ambienteActualizado) {
        return { error: true, code: 400, message: "Error al actualizar el ambiente" };
      }
      // Retornamos el ambiente actualizado
      return {
        error: false, code: 200, message: "Ambiente actualizado correctamente",
        data: ambienteActualizado
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al actualizar el ambiente: ${error.message}` };
    }
  }

  static async deleteAmbiente(id) {
    try {

      // Llamamos el método consultar por ID
      const ambiente = await this.objAmbiente.getById(id);
      // Validamos si el ambiente existe
      if (!ambiente) {
        return { error: true, code: 404, message: "Ambiente no encontrado" };
      }

      const elementosAmbiente = await this.objElemento.getAllByAmbienteId(id);
      // Validamos si no hay elementos
      if (elementosAmbiente && elementosAmbiente.length > 0) {
        return { error: true, code: 409, message: "No se puede eliminar el ambiente porque tiene elementos asociados" };
      }

      // Llamamos el método eliminar
      const ambienteEliminado = await this.objAmbiente.delete(id);
      // Validamos si no se pudo eliminar el ambiente
      if (!ambienteEliminado) {
        return { error: true, code: 400, message: "Error al eliminar el ambiente" };
      }

      // Retornamos el ambiente eliminado
      return { error: false, code: 200, message: "Ambiente eliminado correctamente" };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al eliminar el ambiente: ${error.message}` };
    }
  }
}

export default AmbienteService;