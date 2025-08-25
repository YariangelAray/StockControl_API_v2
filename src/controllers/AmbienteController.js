import ResponseProvider from "../providers/ResponseProvider.js";
import AmbienteService from "../services/AmbienteService.js";

class AmbienteController {

  // Obtener todos los ambientes
  static getAllAmbientes = async (req, res) => {
    try {
      const response = await AmbienteService.getAllAmbientes();
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

  // Obtener un ambiente por su ID
  static getAmbienteById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el ambiente por su ID
      const response = await AmbienteService.getAmbienteById(id);
      // Validamos si no hay ambiente
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

  // Crear un nuevo ambiente
  static createAmbiente = async (req, res) => {
    const ambiente = req.body;
    try {
      // Llamamos el método crear del modelo
      const response = await AmbienteService.createAmbiente(ambiente);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el ambiente creado
      return ResponseProvider.success(res, response.data, response.message, 201);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar un ambiente
  static updateAmbiente = async (req, res) => {
    const { id } = req.params;
    const ambiente = req.body;
    try {            
      // Llamamos al método actualizar del modelo
      const response = await AmbienteService.updateAmbiente(id, ambiente);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }      

      // Retornamos el ambiente actualizado
      return ResponseProvider.success(res, response.data, response.message, 200);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar un ambiente
  static deleteAmbiente = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el ambiente por su ID
      const response = await AmbienteService.deleteAmbiente(id);
      // Validamos si no se pudo eliminar el ambiente
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el ambiente eliminado
      return ResponseProvider.success(res, response.data, response.message ,response.code);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  }
}

export default AmbienteController;