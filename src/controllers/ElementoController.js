import ResponseProvider from "../providers/ResponseProvider.js";
import ElementoService from "../services/ElementoService.js";

class ElementoController {

  // Obtener todos los elementos
  static getAllElementos = async (req, res) => {
    try {
      const response = await ElementoService.getAllElementos();
      // Validamos si no hay elementos
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);

    } catch (error) {
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener todos los elementos
  static getAllElementosMe = async (req, res) => {
    const { id } = req.user;
    try {
      const response = await ElementoService.getAllElementos();
      // Validamos si no hay elementos
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);

    } catch (error) {
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener un elemento por su ID
  static getElementoById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el elemento por su ID
      const response = await ElementoService.getElementoById(id);
      // Validamos si no hay elemento
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

  // Obtener un elemento por su ID
  static getElementoByIdMe = async (req, res) => {
    const { elementoId } = req.params;
    const { id } = req.user;
    try {
      // Llamamos al servicio para obtener el elemento por su ID
      const response = await ElementoService.getElementoById(elementoId, id);
      // Validamos si no hay elemento
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

  // Crear un nuevo elemento
  static createElemento = async (req, res) => {
    const elemento = req.body;
    try {
      // Llamamos el método crear del modelo
      const response = await ElementoService.createElemento(elemento);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el elemento creado
      return ResponseProvider.success(res, response.data, response.message, 201);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Crear un nuevo elemento
  static createElementoMe = async (req, res) => {
    const elemento = req.body;
    const {id} = req.user;
    try {
      // Llamamos el método crear del modelo
      const response = await ElementoService.createElemento(elemento, id);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el elemento creado
      return ResponseProvider.success(res, response.data, response.message, 201);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar un elemento
  static updateElemento = async (req, res) => {
    const { id } = req.params;
    const elemento = req.body;
    try {            
      // Llamamos al método actualizar del modelo
      const response = await ElementoService.updateElemento(id, elemento);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }      

      // Retornamos el elemento actualizado
      return ResponseProvider.success(res, response.data, response.message, 200);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
  // Actualizar un elemento
  static updateEstado = async (req, res) => {
    const { id, estado } = req.params;    
    try {            
      // Llamamos al método actualizar del modelo
      const response = await ElementoService.updateElemento(id, {activo: Boolean(estado)});
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }      

      // Retornamos el elemento actualizado
      return ResponseProvider.success(res, response.data, response.message, 200);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar un elemento
  static updateElementoMe = async (req, res) => {
    const { elementoId } = req.params;
    const elemento = req.body;
    const { id } = req.user;
    try {
      // Llamamos al método actualizar del modelo
      const response = await ElementoService.updateElemento(elementoId, elemento, id);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Retornamos el elemento actualizado
      return ResponseProvider.success(res, response.data, response.message, 200);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
  // Actualizar un elemento
  static updateEstadoMe = async (req, res) => {
    const { elementoId, estado } = req.params;    
    const { id } = req.user;
    try {
      // Llamamos al método actualizar del modelo
      const response = await ElementoService.updateElemento(elementoId, {activo: Boolean(estado)}, id);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Retornamos el elemento actualizado
      return ResponseProvider.success(res, response.data, response.message, 200);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar un elemento
  static deleteElemento = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el elemento por su ID
      const response = await ElementoService.deleteElemento(id);
      // Validamos si no se pudo eliminar el elemento
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el elemento eliminado
      return ResponseProvider.success(res, response.data, response.message ,response.code);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  }

  // Obtener todos los elementos por id de inventario
  static getElementosByInventarioId = async (req, res) => {
    const { inventarioId } = req.params;
    try {
      const response = await ElementoService.getElementosByInventarioId(inventarioId);
      // Validamos si no hay elementos
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);

    } catch (error) {
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
  // Obtener todos los elementos por id de inventario
  static getElementosByInventarioIdMe = async (req, res) => {
    const { inventarioId } = req.params;
    const { id } = req.user;    
    try {
      const response = await ElementoService.getElementosByInventarioId(inventarioId, id);
      // Validamos si no hay elementos
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

export default ElementoController;