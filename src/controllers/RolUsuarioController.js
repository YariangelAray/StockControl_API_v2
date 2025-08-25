import ResponseProvider from "../providers/ResponseProvider.js";
import RolUsuarioService from "../services/RolUsuarioService.js";

class RolUsuarioController {

  // Obtener todos las relaciones rol-usuario
  static getAllRolesUsuarios = async (req, res) => {
    try {
      const response = await RolUsuarioService.getAllRolesUsuarios();
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

  // Obtener una relación rol-usuario por su ID
  static getRolUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener la relación rol-usuario por su ID
      const response = await RolUsuarioService.getRolUsuarioById(id);
      // Validamos si no hay una relación rol-usuario
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

  // Crear una nueva relación rol-usuario
  static createRolUsuario = async (req, res) => {
    const rolUsuario = req.body;
    try {
      // Llamamos el método crear del modelo
      const response = await RolUsuarioService.createRolUsuario(rolUsuario);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos la relación rol-usuario creada
      return ResponseProvider.success(res, response.data, response.message, 201);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar una relacion rol-usuario
  static updateRolUsuario = async (req, res) => {
    const { id } = req.params;
    const rolUsuario = req.body;
    try {
      // Llamamos al método actualizar del modelo
      const response = await RolUsuarioService.updateRolUsuario(id, rolUsuario);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }      

      // Retornamos la relación rol-usuario actualizada
      return ResponseProvider.success(res, response.data, response.message, 200);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar una relación rol-usuario
  static deleteRolUsuario = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar la relación rol-usuario por su ID
      const response = await RolUsuarioService.deleteRolUsuario(id);
      // Validamos si no se pudo eliminar la relación rol-usuario
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

export default RolUsuarioController;