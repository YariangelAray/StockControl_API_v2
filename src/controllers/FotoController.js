import { ResponseProvider } from "../providers/ResponseProvider.js";
import FotoService from "../services/FotoService.js";

class FotoController {

  // Subir una foto
  static subirFoto = async (req, res) => {
    const { reporte_id } = req.body;
    const archivo = req.file;
    if (!archivo) {
      return ResponseProvider.error(res, "No se recibió ninguna foto", 400);
    }

    try {
      const url = `/fotos_reportes/${archivo.filename}`;
      const response = await FotoService.createFoto({ url, reporte_id });

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(res, response.data, "Foto subida correctamente", 201);
    } catch (error) {
      return ResponseProvider.error(res, "Error interno al subir la foto", 500);
    }
  }  
}

export default FotoController;