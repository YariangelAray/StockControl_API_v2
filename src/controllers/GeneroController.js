import { ResponseProvider } from "../providers/ResponseProvider.js";
import GeneroService from "../services/GeneroService.js";

class GeneroController {

  // Obtener todos los generos
  static getAllGeneros = async (req, res) => {
    try {
      const response = await GeneroService.getAllGeneros();
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

  // Obtener un genero por su ID
  static getGeneroById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el genero por su ID
      const response = await GeneroService.getGeneroById(id);
      // Validamos si no hay genero
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

  // Crear un nuevo genero
  static createGenero = async (req, res) => {
    const genero = req.body;
    try {
      // Llamamos el método crear del modelo
      const response = await GeneroService.createGenero(genero);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el genero creado
      return ResponseProvider.success(res, response.data, response.message, 201);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar un genero
  static updateGenero = async (req, res) => {
    const { id } = req.params;
    const genero = req.body;
    try {            
      // Llamamos al método actualizar del modelo
      const response = await GeneroService.updateGenero(id, genero);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }      

      // Retornamos el genero actualizado
      return ResponseProvider.success(res, response.data, response.message, 200);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar un genero
  static deleteGenero = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el genero por su ID
      const response = await GeneroService.deleteGenero(id);
      // Validamos si no se pudo eliminar el genero
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el genero eliminado
      return ResponseProvider.success(res, response.data, response.message ,response.code);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  }
}

export default GeneroController;