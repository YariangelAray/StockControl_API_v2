import ResponseProvider from "../providers/ResponseProvider.js";
import PermisoService from "../services/PermisoService.js";

class PermisoController {

  // Obtener todos los permisos
  static getAllPermisos = async (req, res) => {
    try {
      const response = await PermisoService.getAllPermisos();
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

  // Obtener un permiso por su ID
  static getPermisoById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el permiso por su ID
      const response = await PermisoService.getPermisoById(id);
      // Validamos si no hay permiso
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

  // Crear un nuevo permiso
  static createPermiso = async (req, res) => {
    const permiso = req.body;
    try {
      // Llamamos el método crear del modelo
      const response = await PermisoService.createPermiso(permiso);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el permiso creado
      return ResponseProvider.success(res, response.data, response.message, 201);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar un permiso
  static updatePermiso = async (req, res) => {
    const { id } = req.params;
    const permiso = req.body;
    try {            
      // Llamamos al método actualizar del modelo
      const response = await PermisoService.updatePermiso(id, permiso);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }      

      // Retornamos el permiso actualizado
      return ResponseProvider.success(res, response.data, response.message, 200);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar un permiso
  static deletePermiso = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el permiso por su ID
      const response = await PermisoService.deletePermiso(id);
      // Validamos si no se pudo eliminar el permiso
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el permiso eliminado
      return ResponseProvider.success(res, response.data, response.message ,response.code);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  }
}

export default PermisoController;