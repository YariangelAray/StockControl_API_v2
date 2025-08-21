// import Categoria from "../models/Categoria.js";
import Elemento from "../models/Elemento.js";

class ElementoService {

  static objElemento = new Elemento();

  static async getAllElementos() {
    try {

      // Llamamos el método listar
      const elementos = await this.objElemento.getAll();

      // Validamos si no hay elementos
      if (!elementos) {
        return {error: true, code: 404, message: "No hay elementos registrados"};
      }
      // Retornamos los elementos obtenidos
      return {error: false, code: 200, message: "Elementos obtenidos correctamente", data: elementos};

    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: `Error al obtener los elementos: ${error.message}` };
    }
  }

  static async getElementoById(id) {
    try {

      // Llamamos el método consultar por ID
      const elemento = await this.objElemento.getById(id);
      // Validamos si no hay elemento
      if (!elemento) {
        return {error: true, code: 404, message: "Elemento no encontrado"};
      }
      // Retornamos el elemento obtenido
      return {error: false, code: 200, message: "Elemento obtenido correctamente", data: elemento};
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al obtener el elemento: ${error.message}` };
    }
  }

  static async createElemento(elemento) {
    try {
      // Llamamos el método crear
      const elementoCreado = await this.objElemento.create(elemento);
      // Validamos si no se pudo crear el elemento
      if (elementoCreado === null) {
        return {error: true, code: 400, message: "Error al crear el elemento"};
      }
      // Retornamos el elemento creado
      return {error: false, code: 201, message: "Elemento creado correctamente", data: elementoCreado};
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al crear el elemento: ${error.message}` };
    }
  }

  static async updateElemento(id, elemento) {
    try {

      // Llamamos el método consultar por ID
      const existente = await this.objElemento.getById(id);
      // Validamos si el elemento existe
      if (!existente) {
        return {error: true, code: 404, message: "Elemento no encontrado"};
      }

      // Llamamos el método actualizar
      const elementoActualizado = await this.objElemento.update(id, elemento);
      // Validamos si no se pudo actualizar el elemento
      if (elementoActualizado === null) {
        return {error: true, code: 400, message: "Error al actualizar el elemento"};
      }
      // Retornamos el elemento actualizado
      return {error: false, code: 200, message: "Elemento actualizado correctamente", data: elementoActualizado};
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al actualizar el elemento: ${error.message}` };
    }
  }

  static async deleteElemento(id) {
    try {

      // Llamamos el método consultar por ID
      const elemento = await this.objElemento.getById(id);
      // Validamos si el elemento existe
      if (!elemento) {
        return {error: true, code: 404, message: "Elemento no encontrado"};
      }

      // Llamamos el método eliminar
      const elementoEliminado = await this.objElemento.delete(id);
      // Validamos si no se pudo eliminar el elemento
      if (!elementoEliminado) {
        return {error: true, code: 400, message: "Error al eliminar el elemento"};
      }

      // Retornamos el elemento eliminado
      return {error: false, code: 200, message: "Elemento eliminado correctamente"};
    } catch (error) {
      // Retornamos un error en caso de excepción
      return {error: true, code: 500, message: `Error al eliminar el elemento: ${error.message}`};
    }
  }
}

export default ElementoService;