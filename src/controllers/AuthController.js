// Importa el proveedor de respuestas estandarizadas para manejar respuestas HTTP
import ResponseProvider from "../providers/ResponseProvider.js";

// Importa el servicio de autenticación que contiene la lógica de negocio
import AuthService from "../services/AuthService.js";

// Controlador que gestiona las rutas relacionadas con autenticación
class AuthController {

    // Método para renovar el access token usando el refresh token
    static refresh = async (req, res) => {
        // Extrae el usuario decodificado y el tiempo restante del refresh token
        const { user, refreshTokenTimeLeft } = req;

        try {
            // Llama al servicio para generar nuevos tokens si es necesario
            const response = await AuthService.refresh(user, refreshTokenTimeLeft);

            // Si hubo error en el servicio, responde con error
            if (response.error) {
                return ResponseProvider.error(res, response.message, response.code);
            }

            // Extrae los tokens generados desde la respuesta del servicio
            const { token, refreshToken } = response.data;

            // Guarda el nuevo access token en una cookie httpOnly
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'Lax'
            });

            // Si se generó un nuevo refresh token, también se guarda en cookie
            if (refreshToken) {
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'Lax'
                });
            }

            // Envía respuesta exitosa sin datos, ya que los tokens van en cookies
            return ResponseProvider.success(res, undefined, response.message, response.code);
        } catch (error) {
            // Captura errores inesperados y responde con error interno
            console.error("Error en controlador refresh:", error);
            return ResponseProvider.error(res, "Error interno en el servidor", 500);
        }
    };

    // Método para cerrar sesión del usuario
    static logout = async (req, res) => {
        try {
            // Llama al servicio para realizar limpieza lógica (si aplica)
            const response = await AuthService.logout();

            // Elimina las cookies relacionadas con la sesión
            res.clearCookie('token');
            res.clearCookie('refreshToken');
            res.clearCookie('usuario');

            // Si hubo error en el servicio, responde con error
            if (response.error) {
                return ResponseProvider.error(res, response.message, response.code);
            }

            // Respuesta exitosa indicando que la sesión fue cerrada
            return ResponseProvider.success(res, undefined, response.message, response.code);
        } catch (error) {
            // Captura errores inesperados y responde con error interno
            console.error("Error en controlador logout:", error);
            return ResponseProvider.error(res, "Error interno en el servidor", 500);
        }
    };

    // Método para registrar un nuevo usuario
    static register = async (req, res) => {
        // Extrae los datos del usuario desde el cuerpo de la solicitud
        const usuario = req.body;

        try {
            // Llama al servicio para crear el usuario y generar tokens
            const response = await AuthService.register(usuario);

            // Si hubo error en el servicio, responde con error
            if (response.error) {
                return ResponseProvider.error(res, response.message, response.code);
            }

            // Extrae los tokens y datos del usuario para la cookie
            const { token, refreshToken, usuarioCookie } = response.data;

            // Guarda el access token en cookie httpOnly
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'Lax'
            });

            // Guarda el refresh token en cookie httpOnly
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'Lax'
            });

            // Guarda los datos del usuario en cookie pública (para el frontend)
            res.cookie('usuario', JSON.stringify(usuarioCookie), {
                httpOnly: false,
                secure: false,
                sameSite: 'Lax'
            });

            // Respuesta exitosa sin datos, ya que todo se guarda en cookies
            return ResponseProvider.success(res, undefined, response.message, response.code);
        } catch (error) {
            // Captura errores inesperados y responde con error interno
            console.error("Error en controlador register:", error);
            return ResponseProvider.error(res, "Error interno en el servidor", 500);
        }
    };

    // Método para iniciar sesión del usuario
    static login = async (req, res) => {
        // Extrae los datos de login desde el cuerpo de la solicitud
        const datosLogin = req.body;

        try {
            // Llama al servicio para validar credenciales y generar tokens
            const response = await AuthService.login(datosLogin);

            // Si hubo error en el servicio, responde con error
            if (response.error) {
                return ResponseProvider.error(res, response.message, response.code);
            }

            // Extrae los tokens y datos del usuario para la cookie
            const { token, refreshToken, usuarioCookie } = response.data;

            // Guarda el access token en cookie httpOnly
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'Lax'
            });

            // Guarda el refresh token en cookie httpOnly
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'Lax'
            });

            // Guarda los datos del usuario en cookie pública (para el frontend)
            res.cookie('usuario', JSON.stringify(usuarioCookie), {
                httpOnly: false,
                secure: false,
                sameSite: 'Lax'
            });

            // Respuesta exitosa sin datos, ya que todo se guarda en cookies
            return ResponseProvider.success(res, undefined, response.message, response.code);
        } catch (error) {
            // Captura errores inesperados y responde con error interno
            console.error("Error en controlador login:", error);
            return ResponseProvider.error(res, "Error interno en el servidor", 500);
        }
    };
}

// Exporta el controlador para ser usado en las rutas de autenticación
export default AuthController;
