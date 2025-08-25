import ResponseProvider from "../providers/ResponseProvider.js";
import EstadoService from "../services/EstadoService.js";

class EstadoController {

  // Obtener todos los estados
  static getAllEstados = async (req, res) => {
    try {
      const response = await EstadoService.getAllEstados();
      // Validamos si hay un error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);

    } catch (error) {
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener un estado por su ID
  static getEstadoById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el estado por su ID
      const response = await EstadoService.getEstadoById(id);
      // Validamos si no hay estado
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

  // Crear un nuevo estado
  static createEstado = async (req, res) => {
    const estado = req.body;
    try {
      // Llamamos el método crear del modelo
      const response = await EstadoService.createEstado(estado);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el estado creado
      return ResponseProvider.success(res, response.data, response.message, 201);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar un estado
  static updateEstado = async (req, res) => {
    const { id } = req.params;
    const estado = req.body;
    try {            
      // Llamamos al método actualizar del modelo
      const response = await EstadoService.updateEstado(id, estado);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }      

      // Retornamos el estado actualizado
      return ResponseProvider.success(res, response.data, response.message, 200);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar un estado
  static deleteEstado = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el estado por su ID
      const response = await EstadoService.deleteEstado(id);
      // Validamos si no se pudo eliminar el estado
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el estado eliminado
      return ResponseProvider.success(res, response.data, response.message ,response.code);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  }
}

export default EstadoController;