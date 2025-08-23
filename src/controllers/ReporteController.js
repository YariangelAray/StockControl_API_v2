import { ResponseProvider } from "../providers/ResponseProvider.js";
import ReporteService from "../services/ReporteService.js";

class ReporteController {

  // Obtener todos los reportes
  static getAllReportes = async (req, res) => {
    try {
      const response = await ReporteService.getAllReportes();
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

  // Obtener un reporte por su ID
  static getReporteById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el reporte por su ID
      const response = await ReporteService.getReporteById(id);
      // Validamos si no hay reporte
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

  // Crear un nuevo reporte
  static createReporte = async (req, res) => {
    const reporte = req.body;
    try {
      // Llamamos el método crear del modelo
      const response = await ReporteService.createReporte(reporte);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el reporte creado
      return ResponseProvider.success(res, response.data, response.message, 201);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar un reporte
  static updateReporte = async (req, res) => {
    const { id } = req.params;
    const reporte = req.body;
    try {            
      // Llamamos al método actualizar del modelo
      const response = await ReporteService.updateReporte(id, reporte);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }      

      // Retornamos el reporte actualizado
      return ResponseProvider.success(res, response.data, response.message, 200);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar un reporte
  static deleteReporte = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el reporte por su ID
      const response = await ReporteService.deleteReporte(id);
      // Validamos si no se pudo eliminar el reporte
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el reporte eliminado
      return ResponseProvider.success(res, response.data, response.message ,response.code);
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  }

  // Obtener todos los reportes por id de inventario
  static getReportesByInventarioId = async (req, res) => {
    const { inventarioId } = req.params;
    try {
      const response = await ReporteService.getReportesByInventarioId(inventarioId);
      // Validamos si no hay reportes
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

export default ReporteController;