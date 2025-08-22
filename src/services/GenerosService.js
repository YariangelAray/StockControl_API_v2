import Usuario from "../models/Usuario.js";
import Genero from "../models/Genero.js";

class GeneroService {

  static objGenero = new Genero();
  static objUsuario = new Usuario();

  static async getAllGeneros() {
    try {

      // Llamamos el método listar
      const generos = await this.objGenero.getAll();

      // Validamos si no hay generos
      if (!generos) {
        return { error: true, code: 404, message: "No hay generos registrados" };
      }
      // Retornamos los generos obtenidos
      return {
        error: false, code: 200, message: "Generos obtenidos correctamente",
        data: generos
      };

    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: `Error al obtener los generos: ${error.message}` };
    }
  }

  static async getGeneroById(id) {
    try {

      // Llamamos el método consultar por ID
      const genero = await this.objGenero.getById(id);
      // Validamos si no hay genero
      if (!genero) {
        return { error: true, code: 404, message: "Genero no encontrado" };
      }
      // Retornamos el genero obtenido
      return {
        error: false, code: 200, message: "Genero obtenido correctamente",
        data: genero
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al obtener el genero: ${error.message}` };
    }
  }

  static async createGenero(genero) {
    try {
      // Llamamos el método crear
      const generoCreado = await this.objGenero.create(genero);
      // Validamos si no se pudo crear el genero
      if (generoCreado === null) {
        return { error: true, code: 400, message: "Error al crear el genero" };
      }
      // Retornamos el genero creado
      return {
        error: false, code: 201, message: "Genero creado correctamente",
        data: generoCreado
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al crear el genero: ${error.message}` };
    }
  }

  static async updateGenero(id, genero) {
    try {

      // Llamamos el método consultar por ID
      const existente = await this.objGenero.getById(id);
      // Validamos si el genero existe
      if (!existente) {
        return { error: true, code: 404, message: "Genero no encontrado" };
      }

      // Llamamos el método actualizar
      const generoActualizado = await this.objGenero.update(id, genero);
      // Validamos si no se pudo actualizar el genero
      if (generoActualizado === null) {
        return { error: true, code: 400, message: "Error al actualizar el genero" };
      }
      // Retornamos el genero actualizado
      return {
        error: false, code: 200, message: "Genero actualizado correctamente",
        data: generoActualizado
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al actualizar el genero: ${error.message}` };
    }
  }

  static async deleteGenero(id) {
    try {

      // Llamamos el método consultar por ID
      const genero = await this.objGenero.getById(id);
      // Validamos si el genero existe
      if (!genero) {
        return { error: true, code: 404, message: "Genero no encontrado" };
      }

      const usuariosGenero = await this.objUsuario.getAllByGeneroId(id);
      // Validamos si no hay usuarios
      if (usuariosGenero && usuariosGenero.length > 0) {
        return { error: true, code: 409, message: "No se puede eliminar el genero porque tiene usuarios asociados" };
      }

      // Llamamos el método eliminar
      const generoEliminado = await this.objGenero.delete(id);
      // Validamos si no se pudo eliminar el genero
      if (!generoEliminado) {
        return { error: true, code: 400, message: "Error al eliminar el genero" };
      }

      // Retornamos el genero eliminado
      return { error: false, code: 200, message: "Genero eliminado correctamente" };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al eliminar el genero: ${error.message}` };
    }
  }
}

export default GeneroService;