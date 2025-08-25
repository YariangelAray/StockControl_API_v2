import ResponseProvider from "../providers/ResponseProvider.js";
import CentroService from "../services/CentroService.js";

class CentroController {

  // Obtener todos los centros
  static getAllCentros = async (req, res) => {
    try {
      const response = await CentroService.getAllCentros();
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

  // Obtener un centro por su ID
  static getCentroById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el centro por su ID
      const response = await CentroService.getCentroById(id);
      // Validamos si no hay centro
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

  // Crear un nuevo centro
  static createCentro = async (req, res) => {
    const centro = req.body;
    try {
      // Llamamos el método crear del modelo
      const response = await CentroService.createCentro(centro);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el centro creado
      return ResponseProvider.success(res, response.data, response.message, 201);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar un centro
  static updateCentro = async (req, res) => {
    const { id } = req.params;
    const centro = req.body;
    try {            
      // Llamamos al método actualizar del modelo
      const response = await CentroService.updateCentro(id, centro);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }      

      // Retornamos el centro actualizado
      return ResponseProvider.success(res, response.data, response.message, 200);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar un centro
  static deleteCentro = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el centro por su ID
      const response = await CentroService.deleteCentro(id);
      // Validamos si no se pudo eliminar el centro
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el centro eliminado
      return ResponseProvider.success(res, response.data, response.message ,response.code);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  }
}

export default CentroController;