import Ficha from "../models/Ficha.js";
import ProgramaFormacion from "../models/ProgramaFormacion.js";

class ProgramaFormacionService {

  static objPrograma = new ProgramaFormacion();
  static objFicha = new Ficha();

  static async getAllProgramas() {
    try {

      // Llamamos el método listar
      const programas = await this.objPrograma.getAll();

      // Validamos si no hay programas de formación
      if (!programas || programas.length === 0) {
        return { error: true, code: 404, message: "No hay programas de formación registrados" };
      }
      // Retornamos los programas de formación obtenidos
      return {
        error: false, code: 200, message: "Programas de formación obtenidos correctamente",
        data: await this.#complementarProgramas(programas)
      };

    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getProgramaById(id) {
    try {

      // Llamamos el método consultar por ID
      const programa = await this.objPrograma.getById(id);
      // Validamos si no hay programa de formación
      if (!programa) {
        return { error: true, code: 404, message: "Programa de formación no encontrado" };
      }
      // Retornamos el programa de formación obtenido
      return {
        error: false, code: 200, message: "Programa de formación obtenido correctamente",
        data: await this.#complementarPrograma(programa)
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createPrograma(programa) {
    try {

      // Llamamos el método crear
      const programaCreado = await this.objPrograma.create(programa);
      // Validamos si no se pudo crear el programa de formación
      if (programaCreado === null) {
        return { error: true, code: 400, message: "Error al crear el programa de formación" };
      }
      // Retornamos el programa de formación creado
      return {
        error: false, code: 201, message: "Programa de formación creado correctamente",
        data: await this.#complementarPrograma(programaCreado)
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al crear el programa de formación: ${error.message}` };
    }
  }

  static async updatePrograma(id, programa) {
    try {

      // Llamamos el método consultar por ID
      const existente = await this.objPrograma.getById(id);
      // Validamos si el programa de formación existe
      if (!existente) {
        return { error: true, code: 404, message: "Programa de formación no encontrado" };
      }

      // Llamamos el método actualizar
      const programaActualizado = await this.objPrograma.update(id, programa);
      // Validamos si no se pudo actualizar el programa de formación
      if (programaActualizado === null) {
        return { error: true, code: 400, message: "Error al actualizar el programa de formación" };
      }
      // Retornamos el programa de formación actualizado
      return {
        error: false, code: 200, message: "Programa de formación actualizado correctamente",
        data: await this.#complementarPrograma(programaActualizado)
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message};
    }
  }

  static async deletePrograma(id) {
    try {

      // Llamamos el método consultar por ID
      const programa = await this.objPrograma.getById(id);
      // Validamos si el programa de formación existe
      if (!programa) {
        return { error: true, code: 404, message: "Programa de formación no encontrado" };
      }

      const fichasPrograma = await this.objFicha.getAllByProgramaId(id);
      // Validamos si no hay fichas
      if (fichasPrograma && fichasPrograma.length > 0) {
        return { error: true, code: 409, message: "No se puede eliminar el programa de formación porque tiene fichas asociadas" };
      }

      // Llamamos el método eliminar
      const programaEliminado = await this.objPrograma.delete(id);
      // Validamos si no se pudo eliminar el programa de formación
      if (!programaEliminado) {
        return { error: true, code: 400, message: "Error al eliminar el programa de formación" };
      }

      // Retornamos el programa de formación eliminado
      return { error: false, code: 200, message: "Programa de formación eliminado correctamente" };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message:error.message };
    }
  }

  static async #complementarProgramas(programas) {
    return Promise.all(await programas.map(async programa => await this.#complementarPrograma(programa)));
  }

  static async #complementarPrograma(programa) {
    programa.fichas = await this.objFicha.getAllByProgramaId(programa.id);
    return programa;
  }
}

export default ProgramaFormacionService;