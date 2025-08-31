import ResponseProvider from "../providers/ResponseProvider.js";
import FotoService from "../services/FotoService.js";

class FotoController {

  // Obtener todas las fotos
  static getAllFotos = async (req, res) => {
    try {
      const response = await FotoService.getAllFotos();
      // Validamos si no hay fotos
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);

    } catch (error) {
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener una foto por su ID
  static getFotoById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener la foto por su ID
      const response = await FotoService.getFotoById(id);
      // Validamos si no hay foto
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

  // Subir una foto
  static subirFoto = async (req, res) => {
    const { reporte_id } = req.body;
    const archivo = req.file;

    try {
      const response = await FotoService.createFoto(reporte_id, archivo);

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(res, response.data, response.message, 201);
    } catch (error) {
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  }

  static updateFoto = async (req, res) => {
    const { id } = req.params;
    const { reporte_id } = req.body;
    const archivo = req.file;

    try {
      const response = await FotoService.updateFoto(id, reporte_id, archivo);

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(res, response.data, response.message, 200);
    } catch (error) {
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  }

  static deleteFoto = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await FotoService.deleteFoto(id);

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(res, null, "Foto eliminada correctamente", 200);
    } catch (error) {
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  }

  // Obtener todas las fotos
  static getAllFotosMe = async (req, res) => {
    const { id } = req.user;
    try {
      const response = await FotoService.getAllFotos(id);
      // Validamos si no hay fotos
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);

    } catch (error) {
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener una foto por su ID
  static getFotoByIdMe = async (req, res) => {
    const { fotoId } = req.params;
    const { id } = req.user;
    try {
      // Llamamos al servicio para obtener la foto por su ID
      const response = await FotoService.getFotoById(fotoId, id);
      // Validamos si no hay foto
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

  // Subir una foto
  static subirFotoMe = async (req, res) => {
    const { reporte_id } = req.body;
    const archivo = req.file;
    const { id } = req.user;
    
    try {
      const response = await FotoService.createFoto(reporte_id, archivo, id);

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(res, response.data, response.message, 201);
    } catch (error) {
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  }
}

export default FotoController;