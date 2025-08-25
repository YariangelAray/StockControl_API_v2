import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import { ResponseProvider } from "../../providers/ResponseProvider.js";

dotenv.config();

// Clave secreta para verificar el refresh token
const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET;

/**
 * Middleware para verificar la validez del refresh token.
 * 
 * Este middleware se usa en rutas como `/auth/refresh` para validar si el token de renovación
 * sigue siendo válido y calcular cuánto tiempo le queda antes de expirar.
 * 
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @param {Function} next - Función para continuar con el siguiente middleware.
 * 
 * @example
 * router.get("/refresh", verifyRefreshToken, AuthController.refresh);
 */
export const verifyRefreshToken = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  // Si no hay token, se bloquea el acceso
  if (!refreshToken) {
    return ResponseProvider.authError(res, "Token no encontrado", 401, "TOKEN_MISSING");
  }

  try {
    // Verifica y decodifica el token
    const decoded = jwt.verify(refreshToken, refreshSecretKey);
    req.user = decoded;

    // Calcula el tiempo restante antes de que expire
    const now = Math.floor(Date.now() / 1000);
    req.refreshTokenTimeLeft = decoded.exp - now;

    next();
  } catch (err) {
    // Si el token expiró
    if (err.name === 'TokenExpiredError') {
      return ResponseProvider.authError(res, 'Token expirado', 401, 'TOKEN_EXPIRED');
    }

    // Si el token es inválido
    return ResponseProvider.authError(res, 'Token inválido', 401, 'TOKEN_INVALID');
  }
};
