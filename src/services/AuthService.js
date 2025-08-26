// Importa librerías necesarias para autenticación y encriptación
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

// Importa modelos y servicios relacionados con usuarios, roles y permisos
import Usuario from "../models/Usuario.js";
import UsuarioService from "./UsuarioService.js";
import RolUsuarioService from "./RolUsuarioService.js";
import RolUsuario from "../models/RolUsuario.js";
import PermisoRol from "../models/PermisoRol.js";
import Permiso from "../models/Permiso.js";
import Rol from "../models/Rol.js";

// Carga variables de entorno desde el archivo .env
dotenv.config();

class AuthService {

    // Claves secretas y tiempos de expiración para los tokens
    static secretKey = process.env.ACCESS_TOKEN_SECRET;
    static refreshSecretKey = process.env.REFRESH_TOKEN_SECRET;
    static tokenExpiration = process.env.TOKEN_EXPIRATION;
    static refreshExpiration = process.env.REFRESH_EXPIRATION;

    // Umbral para decidir si se debe renovar el refresh token
    static refreshTreshold = parseInt(process.env.REFRESH_TOKEN_THRESHOLD, 10);

    // Renueva el access token y opcionalmente el refresh token si está por expirar
    static async refresh(user, refreshTokenTimeLeft) {
        try {
            // Genera nuevo access token
            const newToken = await this.#genToken(user);
            let refreshToken = null;

            // Si el tiempo restante del refresh token es menor al umbral, se genera uno nuevo
            if (refreshTokenTimeLeft < this.refreshTreshold) {
                refreshToken = await this.#genRefreshToken(user);
            }

            // Retorna los tokens generados
            return {
                error: false,
                code: 200,
                message: "Sesión renovada correctamente",
                data: {
                    token: newToken,
                    refreshToken
                }
            };
        } catch (error) {
            console.error("Error en AuthService.refresh:", error);
            return { error: true, code: 500, message: "Error al renovar sesión" };
        }
    }

    // Cierra la sesión del usuario (limpieza lógica, no invalida tokens)
    static async logout() {
        try {
            return {
                error: false,
                code: 200,
                message: "Sesión cerrada con éxito"
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al cerrar sesión"
            };
        }
    }

    // Registra un nuevo usuario y lo autentica automáticamente
    static async register(usuario) {
        try {
            const rol = 3; // ID del rol por defecto para nuevos usuarios

            // Crea el usuario en la base de datos
            const responseUsuario = await UsuarioService.createUsuario(usuario);
            if (responseUsuario.error) return responseUsuario;

            const usuarioCreado = responseUsuario.data;

            // Asocia el rol al nuevo usuario
            const responseRolUsuario = await RolUsuarioService.createRolUsuario({
                rol_id: rol,
                usuario_id: usuarioCreado.id
            });
            if (responseRolUsuario.error) return responseRolUsuario;

            // Configura los datos del usuario para el token y frontend
            const usuarioCookie = await this.configurarUsuario(usuarioCreado);

            // Genera tokens de autenticación
          const token = await this.#genToken(usuarioCreado.id);
          const refreshToken = await this.#genRefreshToken(usuarioCreado.id);

            // Retorna tokens y datos del usuario
            return {
                error: false,
                code: 201,
                message: "Usuario creado y autenticado",
                data: {
                    token,
                    refreshToken,
                    usuarioCookie
                }
            };
        } catch (error) {
            console.error("Error en AuthService.register:", error);
            return { error: true, code: 500, message: "Error al crear el usuario" };
        }
    }

    // Valida credenciales y genera tokens si el login es exitoso
    static async login(datosLogin) {
        try {
            const usuario = new Usuario();

            // Busca el usuario por documento
            const existente = await usuario.getByDocumento(datosLogin.documento);

            // Verifica existencia y estado activo
            if (!existente || !existente.activo) {
                return { error: true, code: 404, message: "El usuario no se encontró o se encuentra inactivo" };
            }

            // Compara la contraseña ingresada con la almacenada
            const contrasenaValida = await bcrypt.compare(datosLogin.contrasena, existente.contrasena);
            if (!contrasenaValida) {
                return { error: true, code: 401, message: "La contraseña es incorrecta." };
            }

            // Configura los datos del usuario para el token y frontend
            const usuarioCookie = await this.configurarUsuario(existente);

            // Genera tokens de autenticación
          const token = await this.#genToken(existente.id);
          const refreshToken = await this.#genRefreshToken(existente.id);

            // Retorna tokens y datos del usuario
            return {
                error: false,
                code: 200,
                message: "Inicio de sesión exitoso",
                data: {
                    token,
                    refreshToken,
                    usuarioCookie
                }
            };
        } catch (error) {
            console.error("Error en AuthService.login:", error);
            return { error: true, code: 500, message: "Error al iniciar sesión" };
        }
    }

    // Genera un access token con los datos del usuario
    static async #genToken(userId) {
        const expiration = String(this.tokenExpiration).trim();
        return await jwt.sign({ id: userId }, this.secretKey, { expiresIn: expiration });
    }

    // Genera un refresh token con los datos del usuario
    static async #genRefreshToken(userId) {
        const expiration = String(this.refreshExpiration).trim();
        return await jwt.sign({ id: userId }, this.refreshSecretKey, { expiresIn: expiration });
    }

    // Configura los datos del usuario para incluir roles y permisos
    static async configurarUsuario(usuario) {
        const usuarioToken = {};

        // Construye nombre corto para mostrar en frontend
        usuarioToken.nombre_corto = `${usuario.nombres.split(" ")[0]} ${usuario.apellidos.split(" ")[0]}`;
        usuarioToken.nombres = usuario.nombres;
        usuarioToken.apellidos = usuario.apellidos;

        // Instancia modelos para obtener roles y permisos
        const rolUsuario = new RolUsuario();
        const permisoRol = new PermisoRol();
        const permiso = new Permiso();
        const rol = new Rol();

        // Obtiene todos los roles asociados al usuario
        const rolesUsuario = await rolUsuario.getAllByUsuarioId(usuario.id);
        const roles = await Promise.all(
            rolesUsuario.map(async (ru) => {
                const rolInfo = await rol.getById(ru.rol_id);
                return rolInfo ? { id: ru.rol_id, nombre: rolInfo.nombre } : null;
            })
        );

        // Filtra roles válidos
        usuarioToken.roles = roles.filter(rol => rol);

        // Obtiene todos los permisos asociados a los roles del usuario
        const permisos = await Promise.all(
            usuarioToken.roles.map(async ({ id }) => {
                const relaciones = await permisoRol.getAllByRolId(id);

                return await Promise.all(relaciones.map(async rel => {
                    const permisoInfo = await permiso.getById(rel.permiso_id);
                    return permisoInfo ? permisoInfo.nombre : null;
                }))
            })
        );

        // Elimina permisos nulos y evita duplicados
        usuarioToken.permisos = [...new Set(permisos.flat().filter(permiso => permiso))];

        return usuarioToken;
    }
}

// Exporta el servicio para ser utilizado por el controlador
export default AuthService;
