import ResponseProvider from "../providers/ResponseProvider.js";
import ProgramaFormacionService from "../services/ProgramaFormacionService.js";

class ProgramaFormacionController {

  // Obtener todos los programas de formación
  static getAllProgramas = async (req, res) => {
    try {
      const response = await ProgramaFormacionService.getAllProgramas();
      // Validamos si no hay programas de formación
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);

    } catch (error) {
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener un programa de formación por su ID
  static getProgramaFormacionById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el programa de formación por su ID
      const response = await ProgramaFormacionService.getProgramaById(id);
      // Validamos si no hay programa de formación
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

  // Crear un nuevo programa de formación
  static createProgramaFormacion = async (req, res) => {
    const programa = req.body;
    try {
      // Llamamos el método crear del modelo
      const response = await ProgramaFormacionService.createPrograma(programa);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el programa de formación creado
      return ResponseProvider.success(res, response.data, response.message, 201);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar un programa de formación
  static updateProgramaFormacion = async (req, res) => {
    const { id } = req.params;
    const programa = req.body;
    try {            
      // Llamamos al método actualizar del modelo
      const response = await ProgramaFormacionService.updatePrograma(id, programa);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }      

      // Retornamos el programa de formación actualizado
      return ResponseProvider.success(res, response.data, response.message, 200);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar un programa de formación
  static deleteProgramaFormacion = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el programa de formación por su ID
      const response = await ProgramaFormacionService.deletePrograma(id);
      // Validamos si no se pudo eliminar el programa de formación
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el programa de formación eliminado
      return ResponseProvider.success(res, response.data, response.message ,response.code);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  }
}

export default ProgramaFormacionController;