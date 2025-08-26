import Permiso from "../models/Permiso.js";
import PermisoRol from "../models/PermisoRol.js";
import Rol from "../models/Rol.js";
import RolUsuario from "../models/RolUsuario.js";

// Configura los datos del usuario para incluir roles y permisos
export const getPermisos = async (userId) => {


  // Instancia modelos para obtener roles y permisos
  const rolUsuario = new RolUsuario();
  const permisoRol = new PermisoRol();
  const permiso = new Permiso();
  const rol = new Rol();

  // Obtiene todos los roles asociados al usuario
  const rolesUsuario = await rolUsuario.getAllByUsuarioId(userId);
  let roles = await Promise.all(
    rolesUsuario.map(async (ru) => {
      const rolInfo = await rol.getById(ru.rol_id);
      return rolInfo ? { id: ru.rol_id, nombre: rolInfo.nombre } : null;
    })
  );

  // Filtra roles válidos
  roles = roles.filter(rol => rol);

  // Obtiene todos los permisos asociados a los roles del usuario
  const permisos = await Promise.all(
    roles.map(async ({ id }) => {
      const relaciones = await permisoRol.getAllByRolId(id);

      return await Promise.all(relaciones.map(async rel => {
        const permisoInfo = await permiso.getById(rel.permiso_id);
        return permisoInfo ? permisoInfo.nombre : null;
      }))
    })
  );

  // Elimina permisos nulos y evita duplicados
  return [...new Set(permisos.flat().filter(permiso => permiso))];
}