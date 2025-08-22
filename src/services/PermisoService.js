import RolUsuario from "../models/RolUsuario.js";
import Permiso from "../models/Permiso.js";

class PermisoService {

  static objPermiso = new Permiso();
  static objRolUsuario = new RolUsuario();

  static async getAllPermisos() {
    try {

      // Llamamos el método listar
      const permisos = await this.objPermiso.getAll();

      // Validamos si no hay permisos
      if (!permisos) {
        return { error: true, code: 404, message: "No hay permisos registrados" };
      }
      // Retornamos los permisos obtenidos
      return {
        error: false, code: 200, message: "Permisos obtenidos correctamente",
        data: permisos
      };

    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: `Error al obtener los permisos: ${error.message}` };
    }
  }

  static async getPermisoById(id) {
    try {

      // Llamamos el método consultar por ID
      const permiso = await this.objPermiso.getById(id);
      // Validamos si no hay permiso
      if (!permiso) {
        return { error: true, code: 404, message: "Permiso no encontrado" };
      }
      // Retornamos el permiso obtenido
      return {
        error: false, code: 200, message: "Permiso obtenido correctamente",
        data: permiso
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al obtener el permiso: ${error.message}` };
    }
  }

  static async createPermiso(permiso) {
    try {
      // Llamamos el método crear
      const permisoCreado = await this.objPermiso.create(permiso);
      // Validamos si no se pudo crear el permiso
      if (permisoCreado === null) {
        return { error: true, code: 400, message: "Error al crear el permiso" };
      }
      // Retornamos el permiso creado
      return {
        error: false, code: 201, message: "Permiso creado correctamente",
        data: permisoCreado
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al crear el permiso: ${error.message}` };
    }
  }

  static async updatePermiso(id, permiso) {
    try {

      // Llamamos el método consultar por ID
      const existente = await this.objPermiso.getById(id);
      // Validamos si el permiso existe
      if (!existente) {
        return { error: true, code: 404, message: "Permiso no encontrado" };
      }

      // Llamamos el método actualizar
      const permisoActualizado = await this.objPermiso.update(id, permiso);
      // Validamos si no se pudo actualizar el permiso
      if (permisoActualizado === null) {
        return { error: true, code: 400, message: "Error al actualizar el permiso" };
      }
      // Retornamos el permiso actualizado
      return {
        error: false, code: 200, message: "Permiso actualizado correctamente",
        data: permisoActualizado
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al actualizar el permiso: ${error.message}` };
    }
  }

  static async deletePermiso(id) {
    try {

      // Llamamos el método consultar por ID
      const permiso = await this.objPermiso.getById(id);
      // Validamos si el permiso existe
      if (!permiso) {
        return { error: true, code: 404, message: "Permiso no encontrado" };
      }

      const rolUsuarioPermiso = await this.objRolUsuario.get(id);
      // Validamos si no hay ambientes
      if (ambientesPermiso && ambientesPermiso.length > 0) {
        return { error: true, code: 409, message: "No se puede eliminar el permiso porque tiene ambientes asociados" };
      }

      // Llamamos el método eliminar
      const permisoEliminado = await this.objPermiso.delete(id);
      // Validamos si no se pudo eliminar el permiso
      if (!permisoEliminado) {
        return { error: true, code: 400, message: "Error al eliminar el permiso" };
      }

      // Retornamos el permiso eliminado
      return { error: false, code: 200, message: "Permiso eliminado correctamente" };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al eliminar el permiso: ${error.message}` };
    }
  }
}

export default PermisoService;