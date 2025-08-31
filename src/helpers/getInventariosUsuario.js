import Inventario from "../models/Inventario.js";
import AccesosService from "../services/AccesosService.js";

export const getInventariosDelUsuario = async (idUser) => {
    if (!idUser) return [];
    const objInventario = new Inventario();
    // Inventarios propios
    const inventariosPropios = await objInventario.getAllByUsuarioAdminId(idUser);
    let inventariosIds = inventariosPropios.map(inv => inv.id);

    if (inventariosIds.length === 0) {
        // Si no tiene inventarios propios, buscar accesos temporales
        const accesos = await AccesosService.obtenerInventariosUsuario(idUser);        
        if (!accesos.error && accesos.data) {
            inventariosIds = accesos.data.map(inv => inv.inventario_id || inv.id); // ajusta según estructura
        }
    }

    return inventariosIds;
}