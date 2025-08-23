import { ResponseProvider } from "../providers/ResponseProvider.js";
import RolService from "../services/RolService.js";

class RolController {

  // Obtener todos los roles
  static getAllRoles = async (req, res) => {
    try {
      const response = await RolService.getAllRoles();
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

  // Obtener un rol por su ID
  static getRolById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el rol por su ID
      const response = await RolService.getRolById(id);
      // Validamos si no hay rol
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

  // Crear un nuevo rol
  static createRol = async (req, res) => {
    const rol = req.body;
    try {
      // Llamamos el método crear del modelo
      const response = await RolService.createRol(rol);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el rol creado
      return ResponseProvider.success(res, response.data, response.message, 201);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar un rol
  static updateRol = async (req, res) => {
    const { id } = req.params;
    const rol = req.body;
    try {            
      // Llamamos al método actualizar del modelo
      const response = await RolService.updateRol(id, rol);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }      

      // Retornamos el rol actualizado
      return ResponseProvider.success(res, response.data, response.message, 200);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar un rol
  static deleteRol = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el rol por su ID
      const response = await RolService.deleteRol(id);
      // Validamos si no se pudo eliminar el rol
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el rol eliminado
      return ResponseProvider.success(res, response.data, response.message ,response.code);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  }
}

export default RolController;