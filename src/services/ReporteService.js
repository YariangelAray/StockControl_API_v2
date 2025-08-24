import Elemento from "../models/Elemento.js";
import Foto from "../models/Foto.js";
import Inventario from "../models/Inventario.js";
import Reporte from "../models/Reporte.js";
import Usuario from "../models/Usuario.js";

class ReporteService {

  static objReporte = new Reporte();
  static objUsuario = new Usuario();
  static objElemento = new Elemento();
  static objInventario = new Inventario();
  static objFoto = new Foto();

  static async getAllReportes() {
    try {

      // Llamamos el método listar
      const reportes = await this.objReporte.getAll();

      // Validamos si no hay reportes
      if (!reportes || reportes.length === 0) {
        return { error: true, code: 404, message: "No hay reportes registrados" };
      }
      // Retornamos los reportes obtenidos
      return {
        error: false, code: 200, message: "Reportes obtenidos correctamente",
        data: await this.#complementarReportes(reportes)
      };

    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getReporteById(id) {
    try {

      // Llamamos el método consultar por ID
      const reporte = await this.objReporte.getById(id);
      // Validamos si no hay reporte
      if (!reporte) {
        return { error: true, code: 404, message: "Reporte no encontrado" };
      }
      // Retornamos el reporte obtenido
      return {
        error: false, code: 200, message: "Reporte obtenido correctamente",
        data: await this.#complementarReporte(reporte)
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createReporte(reporte) {
    try {
      const error = await this.#validarForaneas(reporte);
      if (error) return error;

      // Llamamos el método crear
      const reporteCreado = await this.objReporte.create(reporte);
      // Validamos si no se pudo crear el reporte
      if (reporteCreado === null) {
        return { error: true, code: 400, message: "Error al crear el reporte" };
      }
      // Retornamos el reporte creado
      return {
        error: false, code: 201, message: "Reporte creado correctamente",
        data: await this.#complementarReporte(reporteCreado)
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message:error.message };
    }
  }

  static async updateReporte(id, reporte) {
    try {
      
      // Llamamos el método consultar por ID
      const existente = await this.objReporte.getById(id);
      // Validamos si el reporte existe
      if (!existente) {
        return { error: true, code: 404, message: "Reporte no encontrado" };
      }

      const error = await this.#validarForaneas(reporte);
      if (error) return error;

      // Llamamos el método actualizar
      const reporteActualizado = await this.objReporte.update(id, reporte);
      // Validamos si no se pudo actualizar el reporte
      if (reporteActualizado === null) {
        return { error: true, code: 400, message: "Error al actualizar el reporte" };
      }
      // Retornamos el reporte actualizado
      return {
        error: false, code: 200, message: "Reporte actualizado correctamente",
        data: await this.#complementarReporte(reporteActualizado)
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteReporte(id) {
    try {

      // Llamamos el método consultar por ID
      const reporte = await this.objReporte.getById(id);
      // Validamos si el reporte existe
      if (!reporte) {
        return { error: true, code: 404, message: "Reporte no encontrado" };
      }

      const fotosReporte = await this.objFoto.getAllByReporteId(id);
      // Validamos si no hay fotos
      if (fotosReporte && fotosReporte.length > 0) {
        return { error: true, code: 409, message: "No se puede eliminar el reporte porque tiene fotos asociadas" };
      }

      // Llamamos el método eliminar
      const reporteEliminado = await this.objReporte.delete(id);
      // Validamos si no se pudo eliminar el reporte
      if (!reporteEliminado) {
        return { error: true, code: 400, message: "Error al eliminar el reporte" };
      }

      // Retornamos el reporte eliminado
      return { error: false, code: 200, message: "Reporte eliminado correctamente" };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getReportesByInventarioId(inventarioId) {
    try {

      const inventarioExistente = this.objInventario.getById(inventarioId);
      if (!inventarioExistente)
        return { error: true, code: 404, message: "El inventario especificado no existe." };

      // Llamamos el método para obtener reportes por inventario
      const reportes = await this.objReporte.getAllByInventarioId(inventarioId);
      // Validamos si no hay reportes
      if (!reportes || reportes.length === 0)
        return { error: true, code: 404, message: "No hay reportes registrados para este inventario" };

      // Retornamos los reportes obtenidas
      return {
        error: false, code: 200, message: "Reportes obtenidos correctamente",
        data: await this.#complementarReportes(reportes)
      };

    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async #complementarReportes(reportes) {
    return Promise.all(await reportes.map(async reporte => await this.#complementarReporte(reporte)));
  }
  
  static async #complementarReporte(reporte) {
    const usuario = await this.objUsuario.getById(reporte.usuario_id);
    const elemento = await this.objElemento.getById(reporte.elemento_id);

    reporte.usuario = usuario.nombres.split(" ")[0] + " " + usuario.apellidos.split(" ")[0];
    reporte.elemento = { id: elemento.id, placa: elemento.placa };
    reporte.fotos = await this.objFoto.getAllByReporteId(reporte.id);

    return reporte;
  }

  static async #validarForaneas({usuario_id, elemento_id}) {
    if (usuario_id) {
      const usuarioExistente = await this.objUsuario.getById(usuario_id);
      if (!usuarioExistente)
        return { error: true, code: 404, message: "El usuario especificado no existe." };
    }

    if (elemento_id) {
      const elementoExistente = await this.objElemento.getById(elemento_id);
      if (!elementoExistente)
        return { error: true, code: 404, message: "El elemento especificado no existe." };
    }

    return null;
  }
}

export default ReporteService;