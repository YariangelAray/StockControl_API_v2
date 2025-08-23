import { ResponseProvider } from "../providers/ResponseProvider.js";
import TipoElementoService from "../services/TipoElementoService.js";

class TipoElementoController {

  // Obtener todos los tipos de tipos de elementos
  static getAllTiposElementos = async (req, res) => {
    try {
      const response = await TipoElementoService.getAllTiposElementos();
      // Validamos si no hay tipos de tipos de elementos
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);

    } catch (error) {
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener un tipo de elemento por su ID
  static getTipoElementoById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el tipo de elemento por su ID
      const response = await TipoElementoService.getTipoElementoById(id);
      // Validamos si no hay tipo de elemento
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Crear un nuevo tipo de elemento
  static createTipoElemento = async (req, res) => {
    const tipoElemento = req.body;
    try {
      // Llamamos el método crear del modelo
      const response = await TipoElementoService.createTipoElemento(tipoElemento);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el tipo de elemento creado
      return ResponseProvider.success(res, response.data, response.message, 201);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar un tipo de elemento
  static updateTipoElemento = async (req, res) => {
    const { id } = req.params;
    const tipoElemento = req.body;
    try {            
      // Llamamos al método actualizar del modelo
      const response = await TipoElementoService.updateTipoElemento(id, tipoElemento);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }      

      // Retornamos el tipo de elemento actualizado
      return ResponseProvider.success(res, response.data, response.message, 200);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar un tipo de elemento
  static deleteTipoElemento = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el tipo de elemento por su ID
      const response = await TipoElementoService.deleteTipoElemento(id);
      // Validamos si no se pudo eliminar el tipo de elemento
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el tipo de elemento eliminado
      return ResponseProvider.success(res, response.data, response.message ,response.code);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  }

  // Obtiene todos los tipos de elementos con la cantidad de elementos que hay en un inventario específico.
  static getTiposElementosByInventarioId = async (req, res) => {
    const { inventarioId } = req.params;
    try {
      const response = await TipoElementoService.getTiposElementosByInventarioId(inventarioId);
      // Validamos si no hay tipos de elementos
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);

    } catch (error) {
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
}

export default TipoElementoController;