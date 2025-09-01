import Permiso from "../models/Permiso.js";
import PermisoRol from "../models/PermisoRol.js";
import Rol from "../models/Rol.js";
import RolUsuario from "../models/RolUsuario.js";

// Función para obtener los permisos de un usuario dado su ID
export const getPermisos = async (userId) => {

  // Instancia modelos para obtener roles y permisos
  const rolUsuario = new RolUsuario();
  const permisoRol = new PermisoRol();
  const permiso = new Permiso();
  const rol = new Rol();

  // Obtiene todos los roles asociados al usuario (array de objetos con rol_id)
  const rolesUsuario = await rolUsuario.getAllByUsuarioId(userId);

  // Por cada rol del usuario, obtiene la información completa del rol (id y nombre)
  let roles = await Promise.all(
    rolesUsuario.map(async (ru) => {
      const rolInfo = await rol.getById(ru.rol_id);
      // Retorna objeto con id y nombre si existe, o null si no
      return rolInfo ? { id: ru.rol_id, nombre: rolInfo.nombre } : null;
    })
  );

  // Filtra roles válidos (elimina nulls)
  roles = roles.filter(rol => rol);

  // Por cada rol válido, obtiene las relaciones permiso-rol y luego los nombres de permisos
  const permisos = await Promise.all(
    roles.map(async ({ id }) => {
      // Obtiene todas las relaciones permiso-rol para el rol actual
      const relaciones = await permisoRol.getAllByRolId(id);

      // Por cada relación, obtiene el permiso completo y retorna su nombre o null
      return await Promise.all(relaciones.map(async rel => {
        const permisoInfo = await permiso.getById(rel.permiso_id);
        return permisoInfo ? permisoInfo.nombre : null;
      }));
    })
  );

  // Aplana el array de arrays, filtra permisos nulos y elimina duplicados usando Set
  return [...new Set(permisos.flat().filter(permiso => permiso))];
}
