import express from "express"; // Importa Express para crear el router
import AuthController from "../controllers/AuthController.js"; // Importa el controlador con la lógica de autenticación
import { validarLogin, validarRegistro } from "../middlewares/auth/validateAuthFields.js"; // Importa middlewares para validar campos en login y registro
import { verifyRefreshToken } from "../middlewares/auth/verifyRefreshToken.js"; // Middleware para verificar la validez del refresh token
import { ResponseProvider } from "../providers/ResponseProvider.js"; // Proveedor de respuestas estandarizadas
import { authenticate } from "../middlewares/auth/authenticate.js"; // Middleware para verificar el access token (autenticación)


const router = express.Router(); // Crea una instancia del router de Express

/**
 * Ruta protegida que verifica si el access token es válido.
 * 
 * Esta ruta no retorna datos del usuario, solo confirma que la sesión es válida.
 * La información del usuario ya está disponible en cookies seguras.
 * 
 * @route GET /auth/protected
 * @middleware authenticate
 * @returns {Object} JSON con mensaje de éxito
 */
router.get("/protected", authenticate, (req, res) => {
  return ResponseProvider.success(res, undefined, "Sesión válida. Acceso autorizado", 200);
});

/**
 * Ruta para renovar el access token usando el refresh token.
 * 
 * Si el token es válido, se genera uno nuevo y se guarda en cookies.
 * No se retorna el token en el cuerpo de la respuesta.
 * 
 * @route GET /auth/refresh
 * @middleware verifyRefreshToken
 * @returns {Object} JSON con mensaje de renovación exitosa
 */
router.get("/refresh", verifyRefreshToken, AuthController.refresh);

/**
 * Ruta para cerrar sesión del usuario.
 * 
 * Elimina cookies del cliente. No retorna datos.
 * 
 * @route GET /auth/logout
 * @returns {Object} JSON confirmando cierre de sesión
 */
router.get("/logout", AuthController.logout);

/**
 * Ruta para iniciar sesión.
 * 
 * Valida los campos del login y, si es exitoso, guarda los tokens en cookies.
 * No se retorna el token ni el usuario en el cuerpo de la respuesta.
 * 
 * @route POST /auth/login
 * @middleware validarLogin
 * @returns {Object} JSON con mensaje de login exitoso
 */
router.post("/login", validarLogin, AuthController.login);

/**
 * Ruta para registrar un nuevo usuario.
 * 
 * Valida los campos del registro y guarda los tokens en cookies tras el registro.
 * No se retorna el usuario ni el token en el cuerpo de la respuesta.
 * 
 * @route POST /auth/register
 * @middleware validarRegistro
 * @returns {Object} JSON con mensaje de registro exitoso
 */
router.post("/register", validarRegistro, AuthController.register);

// Exporta el router para ser usado en el archivo principal de rutas
export default router;
