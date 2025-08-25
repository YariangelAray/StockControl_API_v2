import ResponseProvider from "../providers/ResponseProvider.js";
import PermisoRolService from "../services/PermisoRolService.js";

class PermisoRolController {

  // Obtener todos las relaciones permiso-rol
  static getAllPermisosRoles = async (req, res) => {
    try {
      const response = await PermisoRolService.getAllPermisosRoles();
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

  // Obtener una relación permiso-rol por su ID
  static getPermisoRolById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener la relación permiso-rol por su ID
      const response = await PermisoRolService.getPermisoRolById(id);
      // Validamos si no hay una relación permiso-rol
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

  // Crear una nueva relación permiso-rol
  static createPermisoRol = async (req, res) => {
    const permisoRol = req.body;
    try {
      // Llamamos el método crear del modelo
      const response = await PermisoRolService.createPermisoRol(permisoRol);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos la relación permiso-rol creada
      return ResponseProvider.success(res, response.data, response.message, 201);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar una relacion permiso-rol
  static updatePermisoRol = async (req, res) => {
    const { id } = req.params;
    const permisoRol = req.body;
    try {
      // Llamamos al método actualizar del modelo
      const response = await PermisoRolService.updatePermisoRol(id, permisoRol);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }      

      // Retornamos la relación permiso-rol actualizada
      return ResponseProvider.success(res, response.data, response.message, 200);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar una relación permiso-rol
  static deletePermisoRol = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar la relación permiso-rol por su ID
      const response = await PermisoRolService.deletePermisoRol(id);
      // Validamos si no se pudo eliminar la relación permiso-rol
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

export default PermisoRolController;