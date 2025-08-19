// import Categoria from "../models/Categoria.js";
import Elemento from "../models/Elemento.js";

class ElementoService {

  static objElemento = new Elemento();

  static async getElementos() {
    try {
      // Creamos la instancia del modelo elemento
      // const objElemento = new Elemento();

      // Llamamos el método listar
      const elementos = await objElemento.getAll();

      // Validamos si no hay elementos
      if (elementos.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay elementos registrados",
        };
      }
      // Retornamos los elementos obtenidos
      return {
        error: false,
        code: 200,
        message: "Elementos obtenidos correctamente",
        data: elementos,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return {
        error: true,
        code: 500,
        message: "Error al obtener los elementos",
      };
    }
  }

  static async getElementoById(id) {
    try {
      // Creamos la instancia del modelo elemento
      // const objElemento = new Elemento();

      // Llamamos el método consultar por ID
      const elemento = await objElemento.getById(id);
      // Validamos si no hay elemento
      if (elemento.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Elemento no encontrado",
        };
      }
      // Retornamos el elemento obtenido
      return {
        error: false,
        code: 200,
        message: "Elemento obtenido correctamente",
        data: elemento,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return {
        error: true,
        code: 500,
        message: "Error al obtener el elemento",
      };
    }
  }

  // static async createElemento(nombre, descripcion, precio, categoria_id) {
  //   try {
  //     // Validamos que el id de la categoría este registrado
  //     const OBJCategoria = new Categoria();
  //     // Consultamos la categoría por ID
  //     const categoria = await OBJCategoria.getById(categoria_id);
  //     // Validamos si no hay categoría
  //     if (categoria.length === 0) {
  //       return {
  //         error: true,
  //         code: 404,
  //         message: "El id de la categoría no existe",
  //       };
  //     }
  //     // Creamos la instancia del modelo elemento
  //     // const objElemento = new Elemento();

  //     // Llamamos el método crear
  //     const elementoCreado = await objElemento.create(
  //       nombre,
  //       descripcion,
  //       precio,
  //       categoria_id
  //     );
  //     // Retornamos el elemento creado
  //     return {
  //       error: false,
  //       code: 201,
  //       message: "Elemento creado correctamente",
  //       data: elementoCreado,
  //     };
  //   } catch (error) {
  //     // Retornamos un error en caso de excepción
  //     return {
  //       error: true,
  //       code: 500,
  //       message: "Error al crear el elemento",
  //     };
  //   }
  // }

  // static async updateElemento(id, campos) {
  //   try {
  //     // Creamos la instancia del modelo elemento
  //     // const objElemento = new Elemento();

  //     // Llamamos el método actualizar
  //     const elementoActualizado = await objElemento.update(id, campos);
  //     // Validamos si no se pudo actualizar el elemento
  //     if (elementoActualizado === null) {
  //       return {
  //         error: true,
  //         code: 400,
  //         message: "Error al actualizar el elemento",
  //       };
  //     }
  //     // Retornamos el elemento actualizado
  //     return {
  //       error: false,
  //       code: 200,
  //       message: "Elemento actualizado correctamente",
  //       data: elementoActualizado,
  //     };
  //   } catch (error) {
  //     // Retornamos un error en caso de excepción
  //     return {
  //       error: true,
  //       code: 500,
  //       message: "Error al actualizar el elemento",
  //     };
  //   }
  // }

  // static async deleteElemento(id) {
  //   try {
  //     // Creamos la instancia del modelo elemento
  //     // const objElemento = new Elemento();

  //     // Llamamos el método eliminar
  //     const elementoEliminado = await objElemento.delete(id);
  //     // Validamos si no se pudo eliminar el elemento
  //     if (elementoEliminado === null) {
  //       return {
  //         error: true,
  //         code: 400,
  //         message: "Error al eliminar el elemento",
  //       };
  //     }
  //     // Retornamos el elemento eliminado
  //     return {
  //       error: false,
  //       code: 200,
  //       message: "Elemento eliminado correctamente",
  //       data: elementoEliminado,
  //     };
  //   } catch (error) {
  //     // Retornamos un error en caso de excepción
  //     return {
  //       error: true,
  //       code: 500,
  //       message: "Error al eliminar el elemento",
  //     };
  //   }
  // }
}

export default ElementoService;