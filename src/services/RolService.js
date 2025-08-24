import PermisoRol from "../models/PermisoRol.js";
import RolUsuario from "../models/RolUsuario.js";
import Rol from "../models/Rol.js";
import Permiso from "../models/Permiso.js";

class RolService {

  static objRol = new Rol();
  static objPermiso = new Permiso();
  static objPermisoRol = new PermisoRol();
  static objRolUsuario = new RolUsuario();

  static async getAllRoles() {
    try {

      // Llamamos el método listar
      const roles = await this.objRol.getAll();

      // Validamos si no hay roles
      if (!roles || roles.length === 0) {
        return { error: true, code: 404, message: "No hay roles registrados" };
      }
      // Retornamos los roles obtenidos
      return {
        error: false, code: 200, message: "Roles obtenidos correctamente",
        data: await this.#complementarRoles(roles)
      };

    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getRolById(id) {
    try {

      // Llamamos el método consultar por ID
      const rol = await this.objRol.getById(id);
      // Validamos si no hay rol
      if (!rol) {
        return { error: true, code: 404, message: "Rol no encontrado" };
      }
      // Retornamos el rol obtenido
      return {
        error: false, code: 200, message: "Rol obtenido correctamente",
        data: await this.#complementarRol(rol)
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createRol(rol) {
    try {
      // Llamamos el método crear
      const rolCreado = await this.objRol.create(rol);
      // Validamos si no se pudo crear el rol
      if (rolCreado === null) {
        return { error: true, code: 400, message: "Error al crear el rol" };
      }
      // Retornamos el rol creado
      return {
        error: false, code: 201, message: "Rol creado correctamente",
        data: await this.#complementarRol(rolCreado)
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message};
    }
  }

  static async updateRol(id, rol) {
    try {

      // Llamamos el método consultar por ID
      const existente = await this.objRol.getById(id);
      // Validamos si el rol existe
      if (!existente) {
        return { error: true, code: 404, message: "Rol no encontrado" };
      }

      // Llamamos el método actualizar
      const rolActualizado = await this.objRol.update(id, rol);
      // Validamos si no se pudo actualizar el rol
      if (rolActualizado === null) {
        return { error: true, code: 400, message: "Error al actualizar el rol" };
      }
      // Retornamos el rol actualizado
      return {
        error: false, code: 200, message: "Rol actualizado correctamente",
        data: await this.#complementarRol(rolActualizado)
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message};
    }
  }

  static async deleteRol(id) {
    try {

      // Llamamos el método consultar por ID
      const rol = await this.objRol.getById(id);
      // Validamos si el rol existe
      if (!rol) {
        return { error: true, code: 404, message: "Rol no encontrado" };
      }

      const rolesPermisoRol = await this.objPermisoRol.getAllByRolId(id);
      // Validamos si no hay roles relacionados a un rol
      if (rolesPermisoRol && rolesPermisoRol.length > 0) {
        return { error: true, code: 409, message: "No se puede eliminar el rol porque tiene permisos asociados" };
      }
      const rolesRolUsuario = await this.objRolUsuario.getAllByRolId(id);
      // Validamos si no hay roles relacionados a un rol
      if (rolesRolUsuario && rolesRolUsuario.length > 0) {
        return { error: true, code: 409, message: "No se puede eliminar el rol porque tiene usuarios asociados" };
      }

      // Llamamos el método eliminar
      const rolEliminado = await this.objRol.delete(id);
      // Validamos si no se pudo eliminar el rol
      if (!rolEliminado) {
        return { error: true, code: 400, message: "Error al eliminar el rol" };
      }

      // Retornamos el rol eliminado
      return { error: false, code: 200, message: "Rol eliminado correctamente" };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message};
    }
  }

  static async #complementarRoles(roles) {
    return Promise.all(await roles.map(async rol => await this.#complementarRol(rol)))
  }

  static async #complementarRol(rol) {
    const permisosRol = await Promise.all(
      (await this.objPermisoRol.getAllByRolId(rol.id)).map(async permisoRol => {
        const permiso = await this.objPermiso.getById(permisoRol.permiso_id);
        return permiso;
      })
    );

    rol.permisos = permisosRol;
    return rol;
  }
}

export default RolService;