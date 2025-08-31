import TipoElemento from "../models/TipoElemento.js";
import Elemento from "../models/Elemento.js";
import Inventario from "../models/Inventario.js";
import { getInventariosDelUsuario } from "../helpers/getInventariosUsuario.js";

class TipoElementoService {

    static objTipoElemento = new TipoElemento();
    static objElemento = new Elemento();
    static objInventario = new Inventario();

    static async getAllTiposElementos() {
        try {
            // Llamamos el método listar
            const tiposElementos = await this.objTipoElemento.getAll();

            // Validamos si no hay tipos de elementos
            if (!tiposElementos || tiposElementos.length === 0)
                return { error: true, code: 404, message: "No hay tipos de elementos registradas" };

            // Retornamos las tipos de elementos obtenidas
            return {
                error: false, code: 200, message: "Tipos de elementos obtenidas correctamente",
                data: await this.#complementarTiposElementos(tiposElementos)
            };
        } catch (error) {
            // Retornamos un error en caso de excepción
            console.log(error);
            return { error: true, code: 500, message: error.message };
        }
    }

    static async getTipoElementoById(id) {
        try {
            // Llamamos el método consultar por ID
            const tipoElemento = await this.objTipoElemento.getById(id);
            // Validamos si no hay tipoElemento
            if (!tipoElemento)
                return { error: true, code: 404, message: "Tipo de elemento no encontrada" };

            // Retornamos la tipoElemento obtenida
            return {
                error: false, code: 200, message: "Tipo de elemento obtenida correctamente",
                data: await this.#complementarTipoElemento(tipoElemento)
            };
        } catch (error) {
            // Retornamos un error en caso de excepción
            return { error: true, code: 500, message: error.message };
        }
    }

    static async createTipoElemento(tipoElemento) {
        try {

            if (await this.objTipoElemento.getByConsecutivo(tipoElemento.consecutivo))
                return { error: true, code: 409, message: "El número de consecutivo especificado ya fue registrado." };

            // Llamamos el método crear
            const tipoElementoCreado = await this.objTipoElemento.create(tipoElemento);
            // Validamos si no se pudo crear el tipo de elemento
            if (tipoElementoCreado === null)
                return { error: true, code: 400, message: "Error al crear el tipo de elemento" };

            // Retornamos el tipo de elemento creado
            return {
                error: false, code: 201, message: "Tipo de elemento creado correctamente",
                data: await this.#complementarTipoElemento(tipoElementoCreado)
            };
        } catch (error) {
            // Retornamos un error en caso de excepción
            return { error: true, code: 500, message: error.message };
        }
    }

    static async updateTipoElemento(id, tipoElemento) {
        try {
            // Llamamos el método consultar por ID
            const existente = await this.objTipoElemento.getById(id);
            // Validamos si el tipo de elemento existe
            if (!existente) {
                return { error: true, code: 404, message: "Tipo de elemento no encontrado" };
            }

            const existenteConsecutivo = await this.objTipoElemento.getByConsecutivo(tipoElemento.consecutivo);
            if (existenteConsecutivo && existenteConsecutivo.id != id) {
                return { error: true, code: 409, message: "El número de consecutivo especificado ya fue registrado." };
            }

            // Llamamos el método actualizar
            const tipoElementoActualizado = await this.objTipoElemento.update(id, tipoElemento);
            // Validamos si no se pudo actualizar el tipo de elemento
            if (tipoElementoActualizado === null)
                return { error: true, code: 400, message: "Error al actualizar el tipo de elemento" };

            // Retornamos el tipo de elemento actualizado
            return {
                error: false, code: 200, message: "Tipo de elemento actualizado correctamente",
                data: await this.#complementarTipoElemento(tipoElementoActualizado)
            };
        } catch (error) {
            // Retornamos un error en caso de excepción
            return { error: true, code: 500, message: error.message };
        }
    }

    static async deleteTipoElemento(id) {
        try {
            // Llamamos el método consultar por ID
            const tipoElemento = await this.objTipoElemento.getById(id);
            // Validamos si el tipo de elemento existe
            if (!tipoElemento)
                return { error: true, code: 404, message: "Tipo de elemento no encontrado" };

            const elementosTipo = await this.objElemento.getAllByTipoElementoId(id);
            // Validamos si no hay elementos
            if (elementosTipo && elementosTipo.length > 0) {
                return { error: true, code: 409, message: "No se puede eliminar el tipo de elemento porque tiene elementos asociados" };
            }

            // Llamamos el método eliminar
            const tipoElementoEliminado = await this.objTipoElemento.delete(id);
            // Validamos si no se pudo eliminar el tipo de elemento
            if (!tipoElementoEliminado)
                return { error: true, code: 400, message: "Error al eliminar el tipo de elemento" };


            // Retornamos el tipo de elemento eliminado
            return { error: false, code: 200, message: "Tipo de elemento eliminado correctamente" };
        } catch (error) {
            // Retornamos un error en caso de excepción
            return { error: true, code: 500, message: error.message };
        }
    }

    static async getTiposElementosByInventarioId(inventarioId, idUser) {
        try {

            const inventarioExistente = this.objInventario.getById(inventarioId);
            if (!inventarioExistente)
                return { error: true, code: 404, message: "El inventario especificado no existe." };

            if (idUser) {
                const inventariosPermitidos = await getInventariosDelUsuario(idUser);
                if (!inventariosPermitidos.includes(parseInt(inventarioId))) {
                    return { error: true, code: 403, message: "No tienes acceso a este inventario" };
                }
            }

            // Llamamos el método listar
            const tiposElementos = await this.objTipoElemento.getAll();

            // Validamos si no hay tipos de elementos
            if (!tiposElementos || tiposElementos.length === 0)
                return { error: true, code: 404, message: "No hay tipos de elementos registradas" };

            // Retornamos las tipos de elementos obtenidas
            return {
                error: false, code: 200, message: "Tipos de elementos obtenidas correctamente",
                data: await this.#complementarTiposElementosInventario(tiposElementos, inventarioId)
            };
        } catch (error) {
            // Retornamos un error en caso de excepción
            console.log(error);
            return { error: true, code: 500, message: `Error al obtener los tipos de elementos: ${error.message}` };
        }
    }

    static async #complementarTipoElemento(tipoElemento) {
        tipoElemento.cantidad_elementos = (await this.objElemento.getAllByTipoElementoId(tipoElemento.id) || []).length;
        return tipoElemento;
    }

    static async #complementarTiposElementos(tiposElementos) {
        return Promise.all(await tiposElementos.map(async tipoElemento => await this.#complementarTipoElemento(tipoElemento)));
    }

    static async #complementarTiposElementosInventario(tiposElementos, inventarioId) {
        const elementos = await this.objElemento.getAllByInventarioId(inventarioId);
        return Promise.all(await tiposElementos.map(async tipoElemento => {
            tipoElemento.cantidad_elementos = elementos.filter(e => e.tipo_elemento_id === tipoElemento.id).length;
            return tipoElemento;
        }));
    }
}

export default TipoElementoService;
