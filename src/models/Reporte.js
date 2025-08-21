import connection from '../utils/db.js';
import Modelo from './Modelo.js';

class Reporte extends Modelo {
    /**
     * Obtiene todos los reportes de la base de datos
     * @returns {Promise<Array>} Lista de todos los reportes
     * @throws {Error} Si ocurre un error en la consulta
     */
    async getAll() {
        try {
            return await super.getAll('reportes');
        } catch (error) {
            throw new Error(`Error al obtener todos los reportes: ${error.message}`);
        }
    }

    /**
     * Obtiene un reporte específico por su ID
     * @param {number} id - ID del reporte
     * @returns {Promise<Object|null>} El reporte encontrado o null si no existe
     * @throws {Error} Si ocurre un error en la consulta
     */
    async getById(id) {
        try {
            return await super.getById('reportes', id);
        } catch (error) {
            throw new Error(`Error al obtener el reporte con ID ${id}: ${error.message}`);
        }
    }

    /**
     * Obtiene todos los reportes asociados a un usuario
     * @param {number} usuarioId - ID del usuario
     * @returns {Promise<Array>} Lista de reportes del usuario
     * @throws {Error} Si ocurre un error en la consulta
     */
    async getAllByUsuarioId(usuarioId) {
        try {
            return await super.getByField('reportes', 'usuario_id', usuarioId);
        } catch (error) {
            throw new Error(`Error al obtener reportes por usuario_id ${usuarioId}: ${error.message}`);
        }
    }

    /**
     * Obtiene todos los reportes asociados a un elemento
     * @param {number} elementoId - ID del elemento
     * @returns {Promise<Array>} Lista de reportes del elemento
     * @throws {Error} Si ocurre un error en la consulta
     */
    async getAllByElementoId(elementoId) {
        try {
            return await super.getByField('reportes', 'elemento_id', elementoId);
        } catch (error) {
            throw new Error(`Error al obtener reportes por elemento_id ${elementoId}: ${error.message}`);
        }
    }
    
    /**
     * Obtiene todos los reportes asociados a un inventario
     * @param {number} inventarioId - ID del inventario
     * @returns {Promise<Array>} Lista de reportes del inventario
     * @throws {Error} Si ocurre un error en la consulta
     */
    async getByInventarioId(inventarioId) {
        try {
            //Obtenemos el resultado de la consulta
            const [rows] = await connection.query("SELECT r.* FROM reportes r JOIN elementos e ON r.elemento_id = e.id WHERE e.inventario_id = ? ORDER BY id DESC", [inventarioId]);
            //Retornamos la respuesta al servicio
            return rows;
        } catch (error) {
            // Lanza un error personalizado si la operación falla
            throw new Error(`Error al obtener reportes por inventario_id ${inventarioId}: ${error.message}`);
        }
    }

    /**
     * Crea un nuevo reporte en la base de datos
     * @param {Object} reporte - Objeto con los datos del reporte {asunto, mensaje, usuario_id, elemento_id}
     * @returns {Promise<Object|null>} El reporte creado con su ID, o null si falló
     * @throws {Error} Si ocurre un error en la inserción
     */
    async create(reporte) {
        try {
            const idCreado = await super.create('reportes', reporte);
            if (idCreado) {
                return await this.getById(idCreado);
            }
            return null;
        } catch (error) {
            throw new Error(`Error al crear el reporte: ${error.message}`);
        }
    }

    /**
     * Actualiza un reporte existente
     * @param {number} id - ID del reporte a actualizar
     * @param {Object} reporte - Objeto con los nuevos datos del reporte
     * @returns {Promise<Object|null>} El reporte actualizado, o null si falló
     * @throws {Error} Si ocurre un error en la actualización
     */
    async update(id, reporte) {
        try {
            if (await super.update('reportes', id, reporte)) {
                return await this.getById(id);
            }
            return null;
        } catch (error) {
            throw new Error(`Error al actualizar el reporte con ID ${id}: ${error.message}`);
        }
    }

    /**
     * Elimina un reporte de la base de datos
     * @param {number} id - ID del reporte a eliminar
     * @returns {Promise<boolean>} true si se eliminó correctamente, false si no
     * @throws {Error} Si ocurre un error en la eliminación
     */
    async delete(id) {
        try {
            return await super.delete('reportes', id);
        } catch (error) {
            throw new Error(`Error al eliminar el reporte con ID ${id}: ${error.message}`);
        }
    }
}

export default Reporte;
