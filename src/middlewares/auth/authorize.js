import { ResponseProvider } from "../../providers/ResponseProvider";

/**
 * Middleware para verificar si el usuario tiene los permisos necesarios para acceder a una ruta.
 * 
 * Este middleware recibe una lista de permisos requeridos y compara si el usuario autenticado
 * (ya presente en `req.user`) los tiene. Si no cumple, se bloquea el acceso con un error 403.
 * 
 * @param {...string} permisosRequeridos - Lista de permisos necesarios para acceder a la ruta.
 * @returns {Function} Middleware Express que valida los permisos del usuario.
 * 
 * @example
 * router.post("/usuarios", authenticate, authorize("usuario.crear"), controlador);
 */
function authorize(...permisosRequeridos) {
  return (req, res, next) => {
    // Extrae los permisos del usuario desde el token decodificado
    const permisosUsuario = req.user.permisos || [];

    // Verifica que el usuario tenga todos los permisos requeridos
    const tienePermiso = permisosRequeridos.every(p => permisosUsuario.includes(p));

    // Si no tiene los permisos, se bloquea el acceso
    if (!tienePermiso) {
      return ResponseProvider.authError(
        res,
        "No tienes permiso para realizar esta acción",
        403,
        "PERMISSION_DENIED"
      );
    }

    // Si todo está bien, continúa con la siguiente función
    next();
  };
}

export default authorize;
