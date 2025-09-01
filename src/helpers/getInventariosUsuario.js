import Inventario from "../models/Inventario.js";
import AccesosService from "../services/AccesosService.js";

// Función para obtener los IDs de inventarios asociados a un usuario
export const getInventariosDelUsuario = async (idUser ) => {
  // Si no se proporciona un ID de usuario válido, retorna un array vacío
  if (!idUser ) return [];

  // Crea una instancia del modelo Inventario
  const objInventario = new Inventario();

  // Obtiene los inventarios propios donde el usuario es administrador
  const inventariosPropios = await objInventario.getAllByUsuarioAdminId(idUser );

  // Extrae los IDs de los inventarios propios
  let inventariosIds = inventariosPropios.map(inv => inv.id);

  // Si el usuario no tiene inventarios propios
  if (inventariosIds.length === 0) {
    // Busca accesos temporales a inventarios mediante el servicio de accesos
    const accesos = await AccesosService.obtenerInventariosUsuario(idUser );

    // Si la respuesta no tiene error y contiene datos
    if (!accesos.error && accesos.data) {
      // Extrae los IDs de inventarios de los accesos, ajustando según estructura
      inventariosIds = accesos.data.map(inv => inv.inventario_id || inv.id);
    }
  }

  // Retorna el array con los IDs de inventarios asociados al usuario
  return inventariosIds;
}
