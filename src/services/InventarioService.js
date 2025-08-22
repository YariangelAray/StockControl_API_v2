import Inventario from "../models/Inventario.js";
import Elemento from "../models/Elemento.js";
import Usuario from "../models/Usuario.js";
import RolUsuario from "../models/RolUsuario.js";

class InventarioService {
  
  static objInventario = new Inventario();
  static objUsuario = new Usuario();
  static objElemento = new Elemento();
  static objRolUsuario = new RolUsuario();

  static async getAllInventarios() {
    try {

      // Llamamos el método listar
      const inventarios = await this.objInventario.getAll();

      // Validamos si no hay inventarios
      if (!inventarios) {
        return { error: true, code: 404, message: "No hay inventarios registrados" };
      }
      // Retornamos los inventarios obtenidos
      return {
        error: false, code: 200, message: "Inventarios obtenidos correctamente",
        data: await this.complementarInventarios(inventarios)
      };

    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: `Error al obtener los inventarios: ${error.message}` };
    }
  }

  static async getInventarioById(id) {
    try {

      // Llamamos el método consultar por ID
      const inventario = await this.objInventario.getById(id);
      // Validamos si no hay inventario
      if (!inventario) {
        return { error: true, code: 404, message: "Inventario no encontrado" };
      }
      // Retornamos el inventario obtenido
      return {
        error: false, code: 200, message: "Inventario obtenido correctamente",
        data: await this.complementarInventario(inventario)
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al obtener el inventario: ${error.message}` };
    }
  }

  static async createInventario(inventario) {
    try {

      if (inventario.usuario_admin_id) {
        const usuarioExistente = this.objUsuario.getById(inventario.usuario_admin_id);
        if (!usuarioExistente)
          return { error: true, code: 404, message: "El usuario especificado no existe." };

        const rolUsuario = this.objRolUsuario.getAllByUsuarioId(inventario.usuario_admin_id);
        if (!(await rolUsuario).some(ru => ru.rol_id === 2))
          return { error: true, code: 404, message: "El usuario especificado no tiene el rol administrativo. Solo un usuario administrativo puede estar asociado a un inventario." };
      }

      // Llamamos el método crear
      const inventarioCreado = await this.objInventario.create(inventario);
      // Validamos si no se pudo crear el inventario
      if (inventarioCreado === null) {
        return { error: true, code: 400, message: "Error al crear el inventario" };
      }
      // Retornamos el inventario creado
      return {
        error: false, code: 201, message: "Inventario creado correctamente",
        data: await this.complementarInventario(inventarioCreado)
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al crear el inventario: ${error.message}` };
    }
  }

  static async updateInventario(id, inventario) {
    try {

      // Llamamos el método consultar por ID
      const existente = await this.objInventario.getById(id);
      // Validamos si el inventario existe
      if (!existente) {
        return { error: true, code: 404, message: "Inventario no encontrado" };
      }

      if (inventario.usuario_admin_id) {
        const usuarioExistente = this.objUsuario.getById(inventario.usuario_admin_id);
        if (!usuarioExistente)
          return { error: true, code: 404, message: "El usuario especificado no existe." };

        const rolUsuario = this.objRolUsuario.getAllByUsuarioId(inventario.usuario_admin_id);
        if (!(await rolUsuario).some(ru => ru.rol_id === 2))
          return { error: true, code: 404, message: "El usuario especificado no tiene el rol administrativo. Solo un usuario administrativo puede estar asociado a un inventario." };
      }

      // Llamamos el método actualizar
      const inventarioActualizado = await this.objInventario.update(id, inventario);
      // Validamos si no se pudo actualizar el inventario
      if (inventarioActualizado === null) {
        return { error: true, code: 400, message: "Error al actualizar el inventario" };
      }
      // Retornamos el inventario actualizado
      return {
        error: false, code: 200, message: "Inventario actualizado correctamente",
        data: await this.complementarInventario(inventarioActualizado)
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al actualizar el inventario: ${error.message}` };
    }
  }

  static async deleteInventario(id) {
    try {

      // Llamamos el método consultar por ID
      const inventario = await this.objInventario.getById(id);
      // Validamos si el inventario existe
      if (!inventario) {
        return { error: true, code: 404, message: "Inventario no encontrado" };
      }

      const elementosInventario = await this.objElemento.getAllByInventarioId(id);
      // Validamos si no hay elementos
      if (elementosInventario && elementosInventario.length > 0) {
        return { error: true, code: 409, message: "No se puede eliminar el inventario porque tiene elementos asociados" };
      }

      // Llamamos el método eliminar
      const inventarioEliminado = await this.objInventario.delete(id);
      // Validamos si no se pudo eliminar el inventario
      if (!inventarioEliminado) {
        return { error: true, code: 400, message: "Error al eliminar el inventario" };
      }

      // Retornamos el inventario eliminado
      return { error: false, code: 200, message: "Inventario eliminado correctamente" };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al eliminar el inventario: ${error.message}` };
    }
  }

  static async getInventariosByUsuarioId(usuarioId) {
    try {

      const usuarioExistente = this.objUsuario.getById(usuarioId);
      if (!usuarioExistente)
        return { error: true, code: 404, message: "El usuario especificado no existe." };

      // Llamamos el método para obtener inventarios por usuario
      const inventarios = await this.objInventario.getByAllUsuarioAdminId(usuarioId);
      // Validamos si no hay inventarios
      if (!inventarios || inventarios.length === 0)
        return { error: true, code: 404, message: "No hay inventarios registrados para este usuario" };

      // Retornamos los inventarios obtenidas
      return {
        error: false, code: 200, message: "Inventarios obtenidos correctamente",
        data: await this.complementarInventarios(inventarios)
      };

    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al obtener los inventarios del usuario administrativo con ID ${usuarioId}: ${error.message}` };
    }
  }

  static async getAmbientesByInventarioId(inventarioId) {
    try {

      // Llamamos el método consultar por ID
      const inventario = await this.objInventario.getById(inventarioId);
      // Validamos si no hay inventario
      if (!inventario) {
        return { error: true, code: 404, message: "Inventario no encontrado" };
      }

      // Llamamos el método para obtener los ambientes cubiertos por el inventario
      const ambientes = await this.objInventario.getAmbientesCubiertos(inventarioId);
      // Validamos si no hay inventarios
      if (!ambientes || ambientes.length === 0)
        return { error: true, code: 404, message: "No hay ambientes cubiertos por este inventario" };

      // Retornamos los inventarios obtenidas
      return {
        error: false, code: 200, message: "Ambientes cubiertos obtenidos correctamente",
        data: ambientes
      };

    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: `Error al obtener los ambientes cubiertos por el inventario con ID ${inventarioId}: ${error.message}` };
    }
  }

  static async complementarInventarios(inventarios) {
    return Promise.all(await inventarios.map(async inventario => await this.complementarInventario(inventario)));
  }
  
  static async complementarInventario(inventario) {
    const elementos = await this.objElemento.getAllByInventarioId(inventario.id);
    
    const totalMonetario = elementos.reduce(
      (total, { valor_monetario }) => total + valor_monetario, 0
    );

    inventario.valor_monetario = totalMonetario;
    inventario.cantidad_elementos = (elementos || []).length;
    inventario.ambientes_cubiertos = (await this.objInventario.getAmbientesCubiertos(inventario.id) || []).length;

    return inventario;
  }
}

export default InventarioService;