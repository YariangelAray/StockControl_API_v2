import Usuario from "../models/Usuario.js";
import Ficha from "../models/Ficha.js";
import ProgramaFormacion from "../models/ProgramaFormacion.js";

class FichaService {

  static objFicha = new Ficha();
  static objUsuario = new Usuario();
  static objPrograma = new ProgramaFormacion();

  static async getAllFichas() {
    try {

      // Llamamos el método listar
      const fichas = await this.objFicha.getAll();

      // Validamos si no hay fichas
      if (!fichas) {
        return { error: true, code: 404, message: "No hay fichas registradas" };
      }
      // Retornamos las fichas obtenidas
      return {
        error: false, code: 200, message: "Fichas obtenidas correctamente",
        data: fichas
      };

    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: `Error al obtener las fichas: ${error.message}` };
    }
  }

  static async getFichaById(id) {
    try {

      // Llamamos el método consultar por ID
      const ficha = await this.objFicha.getById(id);
      // Validamos si no hay ficha
      if (!ficha) {
        return { error: true, code: 404, message: "Ficha no encontrada" };
      }
      // Retornamos la ficha obtenida
      return {
        error: false, code: 200, message: "Ficha obtenida correctamente",
        data: ficha
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al obtener la ficha: ${error.message}` };
    }
  }

  static async createFicha(ficha) {
    try {

      if (ficha.programa_id) {
        const programaExistente = this.objPrograma.getById(ficha.programa_id);
        if (!programaExistente)
          return { error: true, code: 404, message: "El programa especificado no existe." };
      }

      // Llamamos el método crear
      const fichaCreado = await this.objFicha.create(ficha);
      // Validamos si no se pudo crear la ficha
      if (fichaCreado === null) {
        return { error: true, code: 400, message: "Error al crear la ficha" };
      }
      // Retornamos la ficha creada
      return {
        error: false, code: 201, message: "Ficha creada correctamente",
        data: fichaCreado
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al crear la ficha: ${error.message}` };
    }
  }

  static async updateFicha(id, ficha) {
    try {

      // Llamamos el método consultar por ID
      const existente = await this.objFicha.getById(id);
      // Validamos si la ficha existe
      if (!existente) {
        return { error: true, code: 404, message: "Ficha no encontrada" };
      }

      if (ficha.programa_id) {
        const programaExistente = this.objPrograma.getById(ficha.programa_id);
        if (!programaExistente)
          return { error: true, code: 404, message: "El programa especificado no existe." };
      }

      // Llamamos el método actualizar
      const fichaActualizado = await this.objFicha.update(id, ficha);
      // Validamos si no se pudo actualizar la ficha
      if (fichaActualizado === null) {
        return { error: true, code: 400, message: "Error al actualizar la ficha" };
      }
      // Retornamos la ficha actualizado
      return {
        error: false, code: 200, message: "Ficha actualizada correctamente",
        data: fichaActualizado
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al actualizar la ficha: ${error.message}` };
    }
  }

  static async deleteFicha(id) {
    try {

      // Llamamos el método consultar por ID
      const ficha = await this.objFicha.getById(id);
      // Validamos si la ficha existe
      if (!ficha) {
        return { error: true, code: 404, message: "Ficha no encontrada" };
      }

      const usuariosFicha = await this.objUsuario.getAllByFichaId(id);
      // Validamos si no hay usuarios
      if (usuariosFicha && usuariosFicha.length > 0) {
        return { error: true, code: 409, message: "No se puede eliminar la ficha porque tiene usuarios asociados" };
      }

      // Llamamos el método eliminar
      const fichaEliminado = await this.objFicha.delete(id);
      // Validamos si no se pudo eliminar la ficha
      if (!fichaEliminado) {
        return { error: true, code: 400, message: "Error al eliminar la ficha" };
      }

      // Retornamos la ficha eliminada
      return { error: false, code: 200, message: "Ficha eliminada correctamente" };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al eliminar la ficha: ${error.message}` };
    }
  }
}

export default FichaService;