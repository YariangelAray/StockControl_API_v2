import RolUsuario from "../models/RolUsuario.js";
import Rol from "../models/Rol.js";
import Usuario from "../models/Usuario.js";



class RolUsuarioService {

  static objRolUsuario = new RolUsuario();
  static objRol = new Rol();
  static objUsuario = new Usuario();

  static SUPERADMIN_USER_ID = 1;
  static SUPERADMIN_ROLE_ID = 1;

  static async getAllRolesUsuarios() {
    try {

      // Llamamos el método listar
      const rolesUsuarios = await this.objRolUsuario.getAll();

      // Validamos si no hay relaciones
      if (!rolesUsuarios || rolesUsuarios.length === 0) {
        return { error: true, code: 404, message: "No hay relaciones rol-usuario registradas" };
      }

      // Retornamos las relaciones obtenidas
      return {
        error: false, code: 200, message: "Relaciones rol-usuario obtenidas correctamente",
        data: rolesUsuarios
      };

    } catch (error) {

      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getRolUsuarioById(id) {
    try {

      // Llamamos el método consultar por ID
      const rolUsuario = await this.objRolUsuario.getById(id);
      // Validamos si no hay relacion
      if (!rolUsuario) {
        return { error: true, code: 404, message: "Relación rol-usuario no encontrada" };
      }
      // Retornamos la relación obtenida
      return {
        error: false, code: 200, message: "Relación rol-usuario obtenida correctamente",
        data: rolUsuario
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createRolUsuario(rolUsuario) {
    try {

      const error = await this.#validarForaneas(rolUsuario);
      if (error) return error;

      const errorDuplicado = await this.#validarDuplicado(rolUsuario);
      if (errorDuplicado) return errorDuplicado;

      if (rolUsuario.rol_id == this.SUPERADMIN_ROLE_ID && rolUsuario.usuario_id != this.SUPERADMIN_USER_ID) {
        return { error: true, code: 403, message: "El rol de superadministrador no puede ser asignado a otro usuario." };
      }

      // Llamamos el método crear
      const rolUsuarioCreado = await this.objRolUsuario.create(rolUsuario);
      // Validamos si no se pudo crear el rolUsuario
      if (rolUsuarioCreado === null) {
        return { error: true, code: 400, message: "Error al crear la relación rol-usuario" };
      }
      // Retornamos la relación rol-usuario creado
      return {
        error: false, code: 201, message: "Relación rol-usuario creada correctamente",
        data: rolUsuarioCreado
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateRolUsuario(id, rolUsuario) {
    try {

      // Llamamos el método consultar por ID
      const existente = await this.objRolUsuario.getById(id);
      // Validamos si la relación existe
      if (!existente) {
        return { error: true, code: 404, message: "Relación rol-usuario no encontrada" };
      }

      const error = await this.#validarForaneas(rolUsuario);
      if (error) return error;

      const errorDuplicado = await this.#validarDuplicado(rolUsuario, id);
      if (errorDuplicado) return errorDuplicado;

      if (existente.rol_id == this.SUPERADMIN_ROLE_ID && existente.usuario_id == this.SUPERADMIN_USER_ID) {
        return { error: true, code: 403, message: "La relación de superadministrador no puede ser modificada." };
      }
      // Reglas especiales para el rol de superadministrador
      if (rolUsuario.rol_id == this.SUPERADMIN_ROLE_ID && rolUsuario.usuario_id != this.SUPERADMIN_USER_ID) {
        return { error: true, code: 403, message: "No se puede reasignar el rol de superadministrador a otro usuario." };
      }


      // Llamamos el método actualizar
      const rolUsuarioActualizado = await this.objRolUsuario.update(id, rolUsuario);
      // Validamos si no se pudo actualizar la relación
      if (rolUsuarioActualizado === null) {
        return { error: true, code: 400, message: "Error al actualizar la relación rol-usuario" };
      }
      // Retornamos la relación actualizada
      return {
        error: false, code: 200, message: "Relación rol-usuario actualizada correctamente",
        data: rolUsuarioActualizado
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteRolUsuario(id) {
    try {

      // Llamamos el método consultar por ID
      const rolUsuario = await this.objRolUsuario.getById(id);
      // Validamos si la relación existe
      if (!rolUsuario) {
        return { error: true, code: 404, message: "Relación rol-usuario no encontrada" };
      }
      
      if (rolUsuario.rol_id == this.SUPERADMIN_ROLE_ID && rolUsuario.usuario_id == this.SUPERADMIN_USER_ID) {
        return { error: true, code: 403, message: "La relación de superadministrador no puede ser eliminada." };
      }
      
      const relacionesUsuario = await this.objRolUsuario.getAllByUsuarioId(rolUsuario.usuario_id);
      if (relacionesUsuario.length === 1) {
        return { error: true, code: 400, message: "No se puede eliminar la relación porque el usuario debe tener al menos un rol asignado." };
      }      

      // Llamamos el método eliminar
      const rolUsuarioEliminado = await this.objRolUsuario.delete(id);
      // Validamos si no se pudo eliminar la relación
      if (!rolUsuarioEliminado) {
        return { error: true, code: 400, message: "Error al eliminar la relación rol-usuario" };
      }

      // Retornamos la relación eliminada
      return { error: false, code: 200, message: "Relación rol-usuario eliminada correctamente" };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getAllRolesUsuariosByUsuarioId(id) {
    try {

      // Llamamos el método listar
      const rolesUsuarios = await this.objRolUsuario.getAllByUsuarioId(id);

      // Validamos si no hay relaciones
      if (!rolesUsuarios || rolesUsuarios.length === 0) {
        return { error: true, code: 404, message: `No hay relaciones rol-usuario por el usuario con ID ${id}`  };
      }

      // Retornamos las relaciones obtenidas
      return {
        error: false, code: 200, message: `Relaciones rol-usuario de el usuario con ID ${id} obtenidas correctamente`,
        data: rolesUsuarios
      };

    } catch (error) {

      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async #validarForaneas({ rol_id, usuario_id }) {
    if (rol_id) {
      const rolExistente = await this.objRol.getById(rol_id);
      if (!rolExistente)
        return { error: true, code: 404, message: "El rol especificado no existe." };
    }
    if (usuario_id) {
      const usuarioExistente = await this.objUsuario.getById(usuario_id);
      if (!usuarioExistente)
        return { error: true, code: 404, message: "El usuario especificado no existe." };
    }
    return null;
  }

  static async #validarDuplicado(rolUsuario, excludeId = null) {
    const relacionesUsuario = await this.objRolUsuario.getAllByUsuarioId(rolUsuario.usuario_id);

    const existe = relacionesUsuario.some(rel => rel.rol_id == rolUsuario.rol_id &&
      (excludeId ? rel.id != excludeId : true)); // excluye el mismo ID si estamos en update

    if (existe) {
      return { error: true, code: 409, message: "El usuario ya tiene asignado este rol." };
    }
    return null;
  }
}

export default RolUsuarioService;