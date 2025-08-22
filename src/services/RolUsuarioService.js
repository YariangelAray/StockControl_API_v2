import RolUsuario from "../models/RolUsuario.js";
import Rol from "../models/Rol.js";
import Usuario from "../models/Usuario.js";

class RolUsuarioService {

  static objRolUsuario = new RolUsuario();
  static objRol = new Rol();
  static objUsuario = new Usuario();
  
  static async getAllRolesUsuarios() {
    try {

      // Llamamos el método listar
      const rolesUsuarios = await this.objRolUsuario.getAll();

      // Validamos si no hay relaciones
      if (!rolesUsuarios) {
        return { error: true, code: 404, message: "No hay relaciones rol-usuario registradas" };
      }

      // Retornamos las relaciones obtenidas
      return {
        error: false, code: 200, message: "Relaciones rol-usuario obtenidas correctamente",
        data: rolesUsuarios
      };

    } catch (error) {

      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al obtener las relaciones rol-usuario: ${error.message}` };
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
      return { error: true, code: 500, message: `Error al obtener la relación rol-usuario: ${error.message}` };
    }
  }

  static async createRolUsuario(rolUsuario) {
    try {

      if (rolUsuario.rol_id) {
        const rolExistente = this.objRol.getById(rolUsuario.rol_id);
        if (!rolExistente)
          return { error: true, code: 404, message: "El rol especificado no existe." };
      }
      if (rolUsuario.usuario_id) {
        const usuarioExistente = this.objUsuario.getById(rolUsuario.usuario_id);
        if (!usuarioExistente)
          return { error: true, code: 404, message: "El usuario especificado no existe." };
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
      return { error: true, code: 500, message: `Error al crear la relación rol-usuario: ${error.message}` };
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

      if (rolUsuario.rol_id) {
        const rolExistente = this.objRol.getById(rolUsuario.rol_id);
        if (!rolExistente)
          return { error: true, code: 404, message: "El rol especificado no existe." };
      }
      if (rolUsuario.usuario_id) {
        const usuarioExistente = this.objUsuario.getById(rolUsuario.usuario_id);
        if (!usuarioExistente)
          return { error: true, code: 404, message: "El usuario especificado no existe." };
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
      return { error: true, code: 500, message: `Error al actualizar la relación rol-usuario: ${error.message}` };
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
      return { error: true, code: 500, message: `Error al eliminar la relación: ${error.message}` };
    }
  }
}

export default RolUsuarioService;