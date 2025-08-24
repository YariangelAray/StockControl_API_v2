import PermisoRol from "../models/PermisoRol.js";
import Permiso from "../models/Permiso.js";
import Rol from "../models/Rol.js";

class PermisoRolService {

  static objPermisoRol = new PermisoRol();
  static objPermiso = new Permiso();
  static objRol = new Rol();
  
  static async getAllPermisosRoles() {
    try {

      // Llamamos el método listar
      const permisosRoles = await this.objPermisoRol.getAll();

      // Validamos si no hay relaciones
      if (!permisosRoles || permisosRoles.length === 0) {
        return { error: true, code: 404, message: "No hay relaciones permiso-rol registradas" };
      }

      // Retornamos las relaciones obtenidas
      return {
        error: false, code: 200, message: "Relaciones permiso-rol obtenidas correctamente",
        data: permisosRoles
      };

    } catch (error) {

      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getPermisoRolById(id) {
    try {

      // Llamamos el método consultar por ID
      const permisoRol = await this.objPermisoRol.getById(id);
      // Validamos si no hay relacion
      if (!permisoRol) {
        return { error: true, code: 404, message: "Relación permiso-rol no encontrada" };
      }
      // Retornamos la relación obtenida
      return {
        error: false, code: 200, message: "Relación permiso-rol obtenida correctamente",
        data: permisoRol
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createPermisoRol(permisoRol) {
    try {

      const error = await this.#validarForaneas(permisoRol);
      if (error) return error;

      const errorDuplicado = await this.#validarDuplicado(permisoRol);            
      if (errorDuplicado) return errorDuplicado;

      // Llamamos el método crear
      const permisoRolCreado = await this.objPermisoRol.create(permisoRol);
      // Validamos si no se pudo crear el permisoRol
      if (permisoRolCreado === null) {
        return { error: true, code: 400, message: "Error al crear la relación permiso-rol" };
      }
      // Retornamos la relación permiso-rol creado
      return {
        error: false, code: 201, message: "Relación permiso-rol creada correctamente",
        data: permisoRolCreado
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updatePermisoRol(id, permisoRol) {
    try {

      // Llamamos el método consultar por ID
      const existente = await this.objPermisoRol.getById(id);
      // Validamos si la relación existe
      if (!existente) {
        return { error: true, code: 404, message: "Relación permiso-rol no encontrada" };
      }

      const error = await this.#validarForaneas(permisoRol);
      if (error) return error;

      const errorDuplicado = await this.#validarDuplicado(permisoRol, id);
      if (errorDuplicado) return errorDuplicado;

      // Llamamos el método actualizar
      const permisoRolActualizado = await this.objPermisoRol.update(id, permisoRol);
      // Validamos si no se pudo actualizar la relación
      if (permisoRolActualizado === null) {
        return { error: true, code: 400, message: "Error al actualizar la relación permiso-rol" };
      }
      // Retornamos la relación actualizada
      return {
        error: false, code: 200, message: "Relación permiso-rol actualizada correctamente",
        data: permisoRolActualizado
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deletePermisoRol(id) {
    try {

      // Llamamos el método consultar por ID
      const permisoRol = await this.objPermisoRol.getById(id);
      // Validamos si la relación existe
      if (!permisoRol) {
        return { error: true, code: 404, message: "Relación permiso-rol no encontrada" };
      }

      // Llamamos el método eliminar
      const permisoRolEliminado = await this.objPermisoRol.delete(id);
      // Validamos si no se pudo eliminar la relación
      if (!permisoRolEliminado) {
        return { error: true, code: 400, message: "Error al eliminar la relación permiso-rol" };
      }

      // Retornamos la relación eliminada
      return { error: false, code: 200, message: "Relación permiso-rol eliminada correctamente" };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async #validarForaneas({ permiso_id, rol_id }) {
    if (permiso_id) {
      const permisoExistente = await this.objPermiso.getById(permiso_id);
      if (!permisoExistente) {
        return { error: true, code: 404, message: "El permiso especificado no existe." };
      }
    }

    if (rol_id) {
      const rolExistente = await this.objRol.getById(rol_id);
      if (!rolExistente) {
        return { error: true, code: 404, message: "El rol especificado no existe." };
      }
    }

    return null; // si no hay error
  }

  
  static async #validarDuplicado(permisoRol, excludeId = null) {
    const relacionesRol = await this.objPermisoRol.getAllByRolId(permisoRol.rol_id);    
    
    const existe = relacionesRol.some(rel => rel.permiso_id == permisoRol.permiso_id &&
      (excludeId ? rel.id != excludeId : true)); // excluye el mismo ID si estamos en update

    if (existe) {
      return { error: true, code: 409, message: "El rol ya tiene asignado este permiso." };
    }
    return null;
  }
}

export default PermisoRolService;