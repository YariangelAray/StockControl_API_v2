import { ResponseProvider } from "../providers/ResponseProvider.js";
import FichaService from "../services/FichaService.js";

class FichaController {

  // Obtener todas las fichas
  static getAllFichas = async (req, res) => {
    try {
      const response = await FichaService.getAllFichas();
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

  // Obtener una ficha por su ID
  static getFichaById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener la ficha por su ID
      const response = await FichaService.getFichaById(id);
      // Validamos si no hay ficha
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

  // Crear una nueva ficha
  static createFicha = async (req, res) => {
    const ficha = req.body;
    try {
      // Llamamos el método crear del modelo
      const response = await FichaService.createFicha(ficha);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el ficha creado
      return ResponseProvider.success(res, response.data, response.message, 201);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar una ficha
  static updateFicha = async (req, res) => {
    const { id } = req.params;
    const ficha = req.body;
    try {            
      // Llamamos al método actualizar del modelo
      const response = await FichaService.updateFicha(id, ficha);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }      

      // Retornamos el ficha actualizado
      return ResponseProvider.success(res, response.data, response.message, 200);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar una ficha
  static deleteFicha = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar la ficha por su ID
      const response = await FichaService.deleteFicha(id);
      // Validamos si no se pudo eliminar la ficha
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
            
      return ResponseProvider.success(res, response.data, response.message ,response.code);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  }
}

export default FichaController;