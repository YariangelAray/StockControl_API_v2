import { ResponseProvider } from "../providers/ResponseProvider.js";
import UsuarioService from "../services/UsuarioService.js";

class UsuarioController {

  // Obtener todos los usuarios
  static getAllUsuarios = async (req, res) => {
    try {
      const response = await UsuarioService.getAllUsuarios();
      // Validamos si no hay usuarios
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);

    } catch (error) {
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener un usuario por su ID
  static getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el usuario por su ID
      const response = await UsuarioService.getUsuarioById(id);
      // Validamos si no hay usuario
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

  // Crear un nuevo usuario
  static createUsuario = async (req, res) => {
    const usuario = req.body;
    try {
      // Llamamos el método crear del modelo
      const response = await UsuarioService.createUsuario(usuario);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el usuario creado
      return ResponseProvider.success(res, response.data, response.message, 201);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar un usuario
  static updateUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = req.body;
    try {            
      // Llamamos al método actualizar del modelo
      const response = await UsuarioService.updateUsuario(id, usuario);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }      

      // Retornamos el usuario actualizado
      return ResponseProvider.success(res, response.data, response.message, 200);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar un usuario
  static deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el usuario por su ID
      const response = await UsuarioService.deleteUsuario(id);
      // Validamos si no se pudo eliminar el usuario
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el usuario eliminado
      return ResponseProvider.success(res, response.data, response.message ,response.code);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  }

  // Obtener todos los usuarios administrativos
  static getUsuariosAdministrativos = async (req, res) => {    
    try {
      const response = await UsuarioService.getUsuariosAdministrativos();
      // Validamos si no hay usuarios
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);

    } catch (error) {
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar la contraseña de un usuario
  static updateContrasena = async (req, res) => {
    const { id } = req.params;
    const contrasenas = req.body;
    try {
      const response = await UsuarioService.updateContrasena(id, contrasenas);
      // Validamos si no hay usuarios
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

export default UsuarioController;