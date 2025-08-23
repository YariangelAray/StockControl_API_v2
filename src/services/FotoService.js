import Foto from "../models/Foto.js";
import Reporte from "../models/Reporte.js";
import fs from "fs";
import path from "path"

class FotoService {

  static objFoto = new Foto();
  static objReporte = new Reporte();

  static async getAllFotos() {
    try {
      // Llamamos el método listar
      const fotos = await this.objFoto.getAll();

      // Validamos si no hay fotos
      if (!fotos || fotos.length === 0)
        return { error: true, code: 404, message: "No hay fotos registradas" };

      // Retornamos las fotos obtenidas
      return { error: false, code: 200, message: "Fotos obtenidas correctamente", data: fotos };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: `Error al obtener las fotos: ${error.message}` };
    }
  }

  static async getFotoById(id) {
    try {
      // Llamamos el método consultar por ID
      const foto = await this.objFoto.getById(id);
      // Validamos si no hay foto
      if (!foto)
        return { error: true, code: 404, message: "Foto no encontrada" };

      // Retornamos la foto obtenida
      return { error: false, code: 200, message: "Foto obtenida correctamente", data: foto };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al obtener la foto: ${error.message}` };
    }
  }

  static async createFoto(reporteId, archivo) {
    try {
      
      if (!archivo) {
        return { error: true, code: 400, message: "No se recibió ninguna foto" };
      }
      
      if (reporteId) {
        const reporteExistente = this.objReporte.getById(reporteId);
        if (!reporteExistente)
          return { error: true, code: 404, message: "El reporte especificado no existe." };
      }

      // Construimos la URL de la foto
      const url = `/fotos_reportes/${archivo.filename}`; 

      // Llamamos el método crear
      const fotoCreada = await this.objFoto.create({ url, reporteId });

      // Validamos si no se pudo crear la foto
      if (!fotoCreada){
        // Eliminamos el archivo si hubo error
        const ruta = path.join("public", "fotos_reportes", archivo.filename);
        if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
        return { error: true, code: 400, message: "Error al crear la foto" };
      }

      // Retornamos la foto creada
      return { error: false, code: 201, message: "Foto creada correctamente", data: fotoCreada };
    } catch (error) {
      // Eliminamos el archivo si hubo error
      const ruta = path.join("public", "fotos_reportes", archivo.filename);
      if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
      
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al crear la foto: ${error.message}` };
    }
  }

  static async updateFoto(id, foto, archivo) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objFoto.getById(id);
      // Validamos si la foto existe
      if (!existente) {
        return { error: true, code: 404, message: "Foto no encontrada" };
      }

      if (foto.reporte_id) {
        const reporteExistente = this.objReporte.getById(foto.reporte_id);
        if (!reporteExistente)
          return { error: true, code: 404, message: "El reporte especificado no existe." };
      }


      let nuevaUrl;
      if (archivo){
        nuevaUrl = `/fotos_reportes/${archivo.filename}`;
      }

      // Llamamos el método actualizar
      const fotoActualizada = await this.objFoto.update(id, { url: nuevaUrl ?? existente.url , reporte_id: foto.reporte_id ?? existente.reporte_id });
      // Validamos si no se pudo actualizar la foto
      if (!fotoActualizada)
        return { error: true, code: 400, message: "Error al actualizar la foto" };

       // Eliminamos el archivo anterior del disco
      const rutaAnterior = path.join("public", "fotos_reportes", path.basename(existente.url));
      if (fs.existsSync(rutaAnterior)) fs.unlinkSync(rutaAnterior);
      
      // Retornamos la foto actualizada
      return { error: false, code: 200, message: "Foto actualizada correctamente", data: fotoActualizada };
    } catch (error) {
      // Eliminamos el archivo si hubo error
      const ruta = path.join("public", "fotos_reportes", archivo.filename);
      if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al actualizar la foto: ${error.message}` };
    }
  }

  static async deleteFoto(id) {
    try {
      // Llamamos el método consultar por ID
      const foto = await this.objFoto.getById(id);
      // Validamos si la foto existe
      if (!foto)
        return { error: true, code: 404, message: "Foto no encontrada" };

      // Llamamos el método eliminar
      const fotoEliminada = await this.objFoto.delete(id);
      // Validamos si no se pudo eliminar la foto
      if (!fotoEliminada)
        return { error: true, code: 400, message: "Error al eliminar la foto" };

      // Eliminamos el archivo del disco
      const ruta = path.join("public", "fotos_reportes", path.basename(foto.url));
      if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
      
      // Retornamos la foto eliminada
      return { error: false, code: 200, message: "Foto eliminada correctamente" };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al eliminar la foto: ${error.message}` };
    }
  }

  // static async getFotosByReporteId(reporteId) {
  //   try {

  //     const reporteExistente = this.objReporte.getById(reporteId);
  //     if (!reporteExistente)
  //       return { error: true, code: 404, message: "El reporte especificado no existe." };

  //     // Llamamos el método para obtener fotos por reporte_id
  //     const fotos = await this.objFoto.getAllByReporteId(reporteId);
  //     // Validamos si no hay fotos
  //     if (!fotos || fotos.length === 0)
  //       return { error: true, code: 404, message: "No hay fotos registradas para este reporte" };

  //     // Retornamos las fotos obtenidas
  //     return { error: false, code: 200, message: "Fotos obtenidas correctamente", data: fotos };
  //   } catch (error) {
  //     // Retornamos un error en caso de excepción
  //     return { error: true, code: 500, message: `Error al obtener las fotos del reporte con ID ${reporteId}: ${error.message}` };
  //   }
  // }
}

export default FotoService;
