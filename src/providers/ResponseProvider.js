/**
 * Clase utilitaria para proporcionar respuestas estandarizadas en una API REST.
 * 
 * Esta clase ofrece métodos estáticos para enviar respuestas de éxito y error
 * de manera consistente a través de todos los endpoints de la aplicación.
 * 
 * @example
 * // Para enviar una respuesta exitosa
 * ResponseProvider.success(res, userData, "Usuario encontrado", 200);
 * 
 * @example
 * // Para enviar una respuesta de error
 * ResponseProvider.error(res, "Usuario no encontrado", 404);
 */
export class ResponseProvider {

  /**
   * Envía una respuesta de éxito estandarizada al cliente.
   * 
   * Este método genera una respuesta JSON con formato consistente para operaciones exitosas,
   * incluyendo un indicador de éxito, código de estado, mensaje descriptivo y datos.
   *    
   * @param {Object} res - Objeto de respuesta de Express.js.
   * @param {*} data - Datos a retornar en la respuesta (puede ser cualquier tipo).
   * @param {string} [message="Operación exitosa"] - Mensaje descriptivo del resultado.
   * @param {number} [status=200] - Código de estado HTTP (200 para éxito).
   * @returns {Object} Respuesta HTTP con formato JSON estandarizado.
   * 
   * @example
   * // Uso básico
   * ResponseProvider.success(res, userData, "Usuario creado exitosamente", 201);
   */
  static success(res, data, message = "Operación exitosa", status = 200) {
    return res.status(status).json({ // Establece el código de estado y envía respuesta JSON
      success: true,                // Indica que la operación fue exitosa
      code: status,                 // Código de estado HTTP para referencia
      message,                      // Mensaje descriptivo del resultado
      data,                         // Datos de la respuesta (puede ser objeto, array, etc.)
    });
  }

  /**
   * Envía una respuesta de error estandarizada al cliente.
   * 
   * Este método genera una respuesta JSON con formato consistente para operaciones fallidas,
   * incluyendo un indicador de error, código de estado, mensaje descriptivo y detalles opcionales.
   * 
   * @static
   * @param {Object} res - Objeto de respuesta de Express.js.
   * @param {string} [message="Error interno del servidor"] - Mensaje descriptivo del error.
   * @param {number} [status=500] - Código de estado HTTP (4xx o 5xx para errores).
   * @param {Array|Object} [errors] - Detalles adicionales o validaciones específicas del error.
   * @returns {Object} Respuesta HTTP con formato JSON estandarizado.
   * 
   * @example
   * // Uso básico
   * ResponseProvider.error(res, "Recurso no encontrado", 404);
   */
  static error(res, message = "Error interno del servidor", status = 500, errors) {
    return res.status(status).json({ // Establece el código de estado y envía respuesta JSON
      success: false,               // Indica que la operación falló
      code: status,                 // Código de estado HTTP para referencia
      message,                      // Mensaje descriptivo del error
      errors: errors                // Detalles adicionales del error (opcional)
    });
  }

  /**
 * Envía una respuesta de error específica para problemas de autenticación con tokens.
 * 
 * Este método genera una respuesta JSON estandarizada para errores relacionados con tokens,
 * como expiración, formato inválido o manipulación. Incluye un indicador de error, código de estado,
 * mensaje descriptivo y detalles específicos del error de token.
 * 
 * @static
 * @param {Object} res - Objeto de respuesta de Express.js.
 * @param {string} [message="Error de autenticación de token"] - Mensaje descriptivo del error de token.
 * @param {number} [status=401] - Código de estado HTTP (401 para errores de autenticación).
 * @param {string|Object} [authError] - Detalle específico del error de token (ejemplo: "Token expirado").
 * @returns {Object} Respuesta HTTP con formato JSON estandarizado para errores de token.
 * 
 * @example
 * // Uso básico
 * ResponseProvider.authError(res, "Token inválido o expirado", 401, "El token ha expirado");
 */
  static authError(res, message = "Error de autenticación de token", status = 401, authError) {
    return res.status(status).json({
      success: false,               // Indica que la operación falló
      code: status,                 // Código de estado HTTP para referencia
      message,                      // Mensaje descriptivo del error de token
      authError                    // Detalle específico del error de token (opcional)
    });
  }
}
