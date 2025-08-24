import { ResponseProvider } from "../providers/ResponseProvider.js";
import InventarioService from "../services/InventarioService.js";

class InventarioController {

  // Obtener todos los inventarios
  static getAllInventarios = async (req, res) => {
    try {
      const response = await InventarioService.getAllInventarios();
      // Validamos si no hay inventarios
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);

    } catch (error) {
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener un inventario por su ID
  static getInventarioById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el inventario por su ID
      const response = await InventarioService.getInventarioById(id);
      // Validamos si no hay inventario
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

  // Crear un nuevo inventario
  static createInventario = async (req, res) => {
    const inventario = req.body;
    try {
      // Llamamos el método crear del modelo
      const response = await InventarioService.createInventario(inventario);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el inventario creado
      return ResponseProvider.success(res, response.data, response.message, 201);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar un inventario
  static updateInventario = async (req, res) => {
    const { id } = req.params;
    const inventario = req.body;
    try {            
      // Llamamos al método actualizar del modelo
      const response = await InventarioService.updateInventario(id, inventario);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }      

      // Retornamos el inventario actualizado
      return ResponseProvider.success(res, response.data, response.message, 200);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar un inventario
  static deleteInventario = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el inventario por su ID
      const response = await InventarioService.deleteInventario(id);
      // Validamos si no se pudo eliminar el inventario
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el inventario eliminado
      return ResponseProvider.success(res, response.data, response.message ,response.code);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  }

  // Obtener todos los inventarios por id de usuario
  static getInventariosByUsuarioId = async (req, res) => {
    const { usuarioId } = req.params;
    try {
      const response = await InventarioService.getInventariosByUsuarioId(usuarioId);
      // Validamos si no hay inventarios
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);

    } catch (error) {
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener todos los ambientes cubiertos por el inventario
  static getAmbientesCubiertos = async (req, res) => {
    const { id } = req.params;    
    try {
      const response = await InventarioService.getAmbientesCubiertos(id);
      // Validamos si no hay ambientes
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

export default InventarioController;