import Foto from "../models/Foto.js";

class FotoService {
  static objFoto = new Foto();

  static async getAllFotos() {
    try {
      // Llamamos el método listar
      const fotos = await this.objFoto.getAll();

      // Validamos si no hay fotos
      if (!fotos || fotos.length === 0) {
        return { error: true, code: 404, message: "No hay fotos registradas" };
      }
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
      if (!foto) {
        return { error: true, code: 404, message: "Foto no encontrada" };
      }
      // Retornamos la foto obtenida
      return { error: false, code: 200, message: "Foto obtenida correctamente", data: foto };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al obtener la foto: ${error.message}` };
    }
  }

  static async createFoto(foto) {
    try {
      // Llamamos el método crear
      const fotoCreada = await this.objFoto.create(foto);
      // Validamos si no se pudo crear la foto
      if (fotoCreada === null) {
        return { error: true, code: 400, message: "Error al crear la foto" };
      }
      // Retornamos la foto creada
      return { error: false, code: 201, message: "Foto creada correctamente", data: fotoCreada };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al crear la foto: ${error.message}` };
    }
  }

  static async updateFoto(id, foto) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objFoto.getById(id);
      // Validamos si la foto existe
      if (!existente) {
        return { error: true, code: 404, message: "Foto no encontrada" };
      }

      // Llamamos el método actualizar
      const fotoActualizada = await this.objFoto.update(id, foto);
      // Validamos si no se pudo actualizar la foto
      if (fotoActualizada === null) {
        return { error: true, code: 400, message: "Error al actualizar la foto" };
      }
      // Retornamos la foto actualizada
      return { error: false, code: 200, message: "Foto actualizada correctamente", data: fotoActualizada };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al actualizar la foto: ${error.message}` };
    }
  }

  static async deleteFoto(id) {
    try {
      // Llamamos el método consultar por ID
      const foto = await this.objFoto.getById(id);
      // Validamos si la foto existe
      if (!foto) {
        return { error: true, code: 404, message: "Foto no encontrada" };
      }

      // Llamamos el método eliminar
      const fotoEliminada = await this.objFoto.delete(id);
      // Validamos si no se pudo eliminar la foto
      if (!fotoEliminada) {
        return { error: true, code: 400, message: "Error al eliminar la foto" };
      }

      // Retornamos la foto eliminada
      return { error: false, code: 200, message: "Foto eliminada correctamente" };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al eliminar la foto: ${error.message}` };
    }
  }

  static async getFotosByReporteId(reporteId) {
    try {
      // Llamamos el método para obtener fotos por reporte_id
      const fotos = await this.objFoto.getByReporteId(reporteId);
      // Validamos si no hay fotos
      if (!fotos || fotos.length === 0) {
        return { error: true, code: 404, message: "No hay fotos registradas para este reporte" };
      }
      // Retornamos las fotos obtenidas
      return { error: false, code: 200, message: "Fotos obtenidas correctamente", data: fotos };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al obtener fotos por reporte_id ${reporteId}: ${error.message}` };
    }
  }
}

export default FotoService;
