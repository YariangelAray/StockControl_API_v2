import Usuario from "../models/Usuario.js";
import TipoDocumento from "../models/TipoDocumento.js";
import Genero from "../models/Genero.js";
import Ambiente from "../models/Ambiente.js";
import RolUsuario from "../models/RolUsuario.js";
import Rol from "../models/Rol.js";
import Inventario from "../models/Inventario.js";
import Reporte from "../models/Reporte.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

class UsuarioService {

  static objUsuario = new Usuario();
  static objTipoDocumento = new TipoDocumento();
  static objGenero = new Genero();
  static objAmbiente = new Ambiente();
  static objRolUsuario = new RolUsuario();
  static objRol = new Rol();
  static objInventario = new Inventario();
  static objReporte = new Reporte();

  static async getAllUsuarios() {
    try {

      // Llamamos el método listar
      let usuarios = await this.objUsuario.getAll();

      // Validamos si no hay usuarios
      if (!usuarios || usuarios.length === 0) {
        return { error: true, code: 404, message: "No hay usuarios registrados" };
      }


      const usuariosFiltrados = [];

      for (const usuario of usuarios) {
        const roles = (await this.objRolUsuario.getAllByUsuarioId(usuario.id))
          .map(rolUsuario => rolUsuario.rol_id);

        if (!roles.includes(1)) {
          usuariosFiltrados.push(usuario);
        }
      }

      // Retornamos los usuarios obtenidos
      return {
        error: false, code: 200, message: "Usuarios obtenidos correctamente",
        data: await this.#configurarUsuarios(usuariosFiltrados)
      };

    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getUsuarioById(id) {
    try {

      // Llamamos el método consultar por ID
      const usuario = await this.objUsuario.getById(id);
      // Validamos si no hay usuario
      if (!usuario) {
        return { error: true, code: 404, message: "Usuario no encontrado" };
      }
      // Retornamos el usuario obtenido
      return {
        error: false, code: 200, message: "Usuario obtenido correctamente",
        data: await this.#configurarUsuario(usuario)
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createUsuario(usuario) {
    try {

      const error = await this.#validarForaneas(usuario);
      if (error) return error;

      if (await this.objUsuario.getByDocumento(usuario.documento))
        return { error: true, code: 409, message: "El número de documento especificado ya fue registrado." };

      if (await this.objUsuario.getByCorreo(usuario.correo))
        return { error: true, code: 409, message: "El correo especificado ya fue registrado." };


      if (usuario.contrasena) {
        usuario.contrasena = await bcrypt.hash(usuario.contrasena, saltRounds);
      } else {
        usuario.contrasena = usuario.documento;
      }
      // Llamamos el método crear
      const usuarioCreado = await this.objUsuario.create(usuario);
      // Validamos si no se pudo crear el usuario
      if (usuarioCreado === null) {
        return { error: true, code: 400, message: "Error al crear el usuario" };
      }
      // Retornamos el usuario creado
      return {
        error: false, code: 201, message: "Usuario creado correctamente",
        data: usuarioCreado
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateUsuario(id, usuario) {
    try {

      // Llamamos el método consultar por ID
      const existente = await this.objUsuario.getById(id);
      // Validamos si el usuario existe
      if (!existente) {
        return { error: true, code: 404, message: "Usuario no encontrado" };
      }

      const error = await this.#validarForaneas(usuario);
      if (error) return error;

      const existenteDocumento = await this.objUsuario.getByDocumento(usuario.documento);
      if (existenteDocumento && usuario.documento != existente.documento) {
        return { error: true, code: 409, message: "El número de documento especificado ya fue registrado." };
      }

      const existenteCorreo = await this.objUsuario.getByCorreo(usuario.correo);
      if (existenteCorreo && existenteCorreo.id != id) {
        return { error: true, code: 409, message: "El correo especificado ya fue registrado." };
      }

      if (usuario.contrasena) {
        return { error: true, code: 409, message: "La contraseña del usuario no se puede actualizar por este método." };
      }

      // Llamamos el método actualizar
      const usuarioActualizado = await this.objUsuario.update(id, usuario);
      // Validamos si no se pudo actualizar el usuario
      if (usuarioActualizado === null) {
        return { error: true, code: 400, message: "Error al actualizar el usuario" };
      }
      // Retornamos el usuario actualizado
      return {
        error: false, code: 200, message: "Usuario actualizado correctamente",
        data: await this.#configurarUsuario(usuarioActualizado)
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteUsuario(id) {
    try {

      // Llamamos el método consultar por ID
      const usuario = await this.objUsuario.getById(id);
      // Validamos si el usuario existe
      if (!usuario) {
        return { error: true, code: 404, message: "Usuario no encontrado" };
      }

      const roles = (await this.objRolUsuario.getAllByUsuarioId(id)).map(rolUsuario => rolUsuario.rol_id);

      const inventariosUsuario = await this.objInventario.getAllByUsuarioAdminId(id);
      // Validamos si no hay inventarios 
      if (inventariosUsuario && inventariosUsuario.length > 0 && roles.includes(2)) {
        return { error: true, code: 409, message: "No se puede eliminar al usuario administrativo porque tiene inventarios asociados" };
      }
      const reportesUsuario = await this.objReporte.getAllByUsuarioId(id);
      // Validamos si no hay reportes
      if (reportesUsuario && reportesUsuario.length > 0) {
        return { error: true, code: 409, message: "No se puede eliminar al usuario porque tiene reportes asociados" };
      }
      // Validamos si no sea el superadministrador
      if (roles.includes(1)) {
        return { error: true, code: 409, message: "No se puede eliminar al superadministrador" };
      }

      // eliminamos la relación con roles
      const relacionesRoles = await this.objRolUsuario.getAllByUsuarioId(id);
      const relacionesEliminadas = await relacionesRoles.every(async rr => await this.objRolUsuario.delete(rr.id));

      // Llamamos el método eliminar
      const usuarioEliminado = await this.objUsuario.delete(id);

      // Validamos si no se pudo eliminar el usuario
      if (!usuarioEliminado || !relacionesEliminadas) {
        return { error: true, code: 400, message: "Error al eliminar el usuario" };
      }

      // Retornamos el usuario eliminado
      return { error: false, code: 200, message: "Usuario eliminado correctamente" };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getUsuariosAdministrativos() {
    try {

      // Llamamos el método listar
      const usuarios = await this.objUsuario.getAll();
      // Validamos si no hay usuarios
      if (!usuarios || usuarios.length === 0) {
        return { error: true, code: 404, message: "No hay usuarios registrados" };
      }

      const usuariosAdmin = (await Promise.all(
        usuarios.map(async (usuario) => {
          const rolesUsuario = await this.objRolUsuario.getAllByUsuarioId(usuario.id);
          return rolesUsuario.some((rolUsuario) => rolUsuario.rol_id === 2) ? usuario : null;
        })
      )).filter(usuario => usuario);


      // Retornamos los usuarios obtenidos
      return {
        error: false, code: 200, message: `Usuarios administrativos obtenidos correctamente`,
        data: usuariosAdmin.map(usuario => ({
          id: usuario.id,
          documento: usuario.documento,
          nombre: usuario.nombres.split(" ")[0] + " " + usuario.apellidos.split(" ")[0]
        }))
      };

    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateContrasena(id, contrasenas) {
    try {

      // Llamamos el método consultar por ID
      const existente = await this.objUsuario.getById(id);
      // Validamos si el usuario existe
      if (!existente) {
        return { error: true, code: 404, message: "Usuario no encontrado" };
      }

      if (!await bcrypt.compare(contrasenas.contrasena_actual, existente.contrasena)) {
        return { error: true, code: 401, message: "La contraseña actual es incorrecta." };
      }

      const nuevaContrasena = await bcrypt.hash(contrasenas.contrasena_nueva, saltRounds);
      const response = await this.objUsuario.update(id, { contrasena: nuevaContrasena });

      if (response.error) {
        return { error: true, code: response.code, message: response.message };
      }
      return { error: false, code: 200, message: "Contraseña actualizada correctamente" };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }
  static async updateContrasenaRestaurar(id) {
    try {

      // Llamamos el método consultar por ID
      const existente = await this.objUsuario.getById(id);
      // Validamos si el usuario existe
      if (!existente) {
        return { error: true, code: 404, message: "Usuario no encontrado" };
      }
      
      const hash = await bcrypt.hash(existente.documento, saltRounds);
      const response = await this.objUsuario.update(id, { contrasena: hash });

      if (response.error) {
        return { error: true, code: response.code, message: response.message };
      }
      return { error: false, code: 200, message: "Contraseña actualizada correctamente" };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  static async #configurarUsuarios(usuarios) {
    return Promise.all(await usuarios.map(async usuario => await this.#configurarUsuario(usuario)))
  }

  static async #configurarUsuario(usuario) {
    const rolesUsuario = await Promise.all(
      (await this.objRolUsuario.getAllByUsuarioId(usuario.id)).map(async rolUsuario => {
        const rol = await this.objRol.getById(rolUsuario.rol_id);
        return rol;
      })
    );

    usuario.roles = rolesUsuario;
    delete usuario.contrasena;
    return usuario;
  }

  static async #validarForaneas({ tipo_documento_id, genero_id, ficha_id }) {
    if (tipo_documento_id) {
      const tipoExistente = await this.objTipoDocumento.getById(tipo_documento_id);
      if (!tipoExistente)
        return { error: true, code: 404, message: "El tipo de documento especificado no existe." };
    }
    if (genero_id) {
      const generoExistente = await this.objGenero.getById(genero_id);
      if (!generoExistente)
        return { error: true, code: 404, message: "El genero especificado no existe." };
    }
    if (ficha_id) {
      const fichaExistente = await this.objAmbiente.getById(ficha_id);
      if (!fichaExistente)
        return { error: true, code: 404, message: "La ficha especificada no existe." };
    }

    return null; // No hay errores de validación
  }
  // static async #configurarUsuarios(usuarios) {
  //   return Promise.all(await usuarios.map(async usuario => await this.#configurarUsuario(usuario)))
  // }

  // static async #configurarUsuario(usuario) {
  //   const rolesUsuario = await Promise.all(
  //     (await this.objRolUsuario.getAllByUsuarioId(usuario.id)).map(async rolUsuario => {
  //       const rol = await this.objRol.getById(rolUsuario.rol_id);
  //       return rol;
  //     })
  //   );

  //   usuario.roles = rolesUsuario;
  //   return usuario;
  // }
}

export default UsuarioService;