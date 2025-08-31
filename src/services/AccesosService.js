import { v4 as uuidv4 } from 'uuid';
import Accesos from '../models/Accesos.js';
import Inventario from '../models/Inventario.js';
import Elemento from '../models/Elemento.js';
import { formatearFecha } from '../utils/formatearFecha.js';

class AccesosService {

    static objAcceso = new Accesos();
    static objInventario = new Inventario();
    static objElemento = new Elemento();

    static async obtenerInventariosUsuario(usuarioId) {
        try {
            const inventarios = await this.objAcceso.obtenerInventariosUsuario(usuarioId);
            if (!inventarios || inventarios.length === 0) {
                return { error: true, code: 404, message: "No hay inventarios activos para este usuario" };
            }
            return { error: false, data: await this.#complementarInventarios(inventarios), message: "Inventarios con acceso obtenidos correctamente" };
        } catch (error) {
            return { error: true, code: 500, message: error.message };
        }
    }

    static async obtenerCodigoActivo(inventarioId) {
        try {
            const inventario = await this.objInventario.getById(inventarioId);
            // Validamos si el inventario existe
            if (!inventario) {
                return { error: true, code: 404, message: "Inventario no encontrado" };
            }            
            const codigoActivo = await this.objAcceso.getCodigoActivo(inventarioId);
            if (!codigoActivo) {
                return { error: true, code: 404, message: "No hay código activo para este inventario" };
            }
            return { error: false, data: codigoActivo, message: "Código activo obtenido correctamente" };
        } catch (error) {
            return { error: true, code: 500, message: error.message };
        }
    }

    static async obtenerUsuariosAcceso(inventarioId) {
        try {
            const inventario = await this.objInventario.getById(inventarioId);
            // Validamos si el inventario existe
            if (!inventario) {
                return { error: true, code: 404, message: "Inventario no encontrado" };
            }
            // Aquí asumimos que existe, o agrega validación

            const usuarios = await this.objAcceso.obtenerUsuariosAcceso(inventarioId);
            if (usuarios === null) {
                return { error: true, code: 404, message: "No hay código activo para este inventario" };
            }
            if (usuarios.length === 0) {
                return { error: true, code: 404, message: "No hay usuarios con acceso temporal actualmente" };
            }
            return { error: false, data: usuarios, message: "Usuarios con acceso obtenidos correctamente" };
        } catch (error) {
            console.error("Error en servicio obtenerUsuariosAcceso:", error);
            return { error: true, code: 500, message: error.message };
        }
    }

    static async generarCodigoAcceso(inventarioId, { horas = 0, minutos = 0 }) {
        try {
            const inventario = await this.objInventario.getById(inventarioId);
            // Validamos si el inventario existe
            if (!inventario) {
                return { error: true, code: 404, message: "Inventario no encontrado" };
            }

            // Validar que no exista código activo
            const codigoActivo = await this.objAcceso.getCodigoActivo(inventarioId);
            if (codigoActivo) {
                return { error: true, code: 409, message: "Ya existe un código activo para este inventario. Espere a que expire antes de generar uno nuevo." };
            }

            // Generar código aleatorio (8 caracteres)
            const codigoGenerado = uuidv4().slice(0, 8).toUpperCase();

            // Calcular fecha expiración
            const ahora = new Date();
            const expiracion = new Date(ahora.getTime() + (horas * 3600 + minutos * 60) * 1000);

            // Crear código en BD
            const id = await this.objAcceso.crearCodigoAcceso({
                codigo: codigoGenerado,
                inventario_id: inventarioId,
                fecha_expiracion: expiracion
            });

            if (!id) {
                return { error: true, code: 500, message: "No se pudo generar el código" };
            }

            return {
                error: false,
                data: { id, codigo: codigoGenerado, fecha_expiracion: expiracion },
                message: "Código generado exitosamente"
            };
        } catch (error) {
            return { error: true, code: 500, message: error.message };
        }
    }


    static async registrarAcceso(usuarioId, codigo) {
        try {
            // Buscar código válido
            const codigoValido = await this.objAcceso.buscarCodigoValido(codigo);
            if (!codigoValido) {
                return { error: true, code: 404, message: "Código inválido o expirado" };
            }

            // Verificar que usuario no tenga ya acceso a ese código
            const codigosUsuario = await this.objAcceso.getCodigosActivosPorUsuario(usuarioId);
            const yaTieneAcceso = codigosUsuario.some(c => c.id === codigoValido.id);
            if (yaTieneAcceso) {
                return { error: true, code: 409, message: "Este usuario ya cuenta con acceso al inventario" };
            }

            // Registrar acceso temporal
            const creado = await this.objAcceso.crearAccesoTemporal({
                usuario_id: usuarioId,
                codigo_acceso_id: codigoValido.id
            });

            if (!creado) {
                return { error: true, code: 400, message: "Error al registrar el acceso" };
            }

            // Obtener datos del inventario para devolverlos
            const inventario = await this.objInventario.getById(codigoValido.inventario_id);

            // Armar el objeto con la estructura que quieres retornar
            const data = {
                inventario_id: inventario.id,
                nombre_inventario: inventario.nombre,
                codigo: codigoValido.codigo,
                fecha_expiracion: codigoValido.fecha_expiracion
            };

            return { error: false, data, message: "Acceso exitoso" };

        } catch (error) {
            return { error: true, code: 500, message: error.message };
        }
    }


    static async eliminarAccesos(inventarioId) {
        try {
            const inventario = await this.objInventario.getById(inventarioId);
            // Validamos si el inventario existe
            if (!inventario) {
                return { error: true, code: 404, message: "Inventario no encontrado" };
            }

            // Obtener código activo
            const codigoActivo = await this.objAcceso.getCodigoActivo(inventarioId);
            if (!codigoActivo) {
                return { error: false, code: 404, message: "No hay código activo para este inventario" };
            }

            // Eliminar accesos temporales
            const eliminadosAccesos = await this.objAcceso.eliminarAccesosPorCodigo(codigoActivo.id);
            if (!eliminadosAccesos) {
                return { error: true, code: 500, message: "Error al eliminar los accesos del inventario" };
            }

            // Eliminar código
            const eliminadoCodigo = await this.objAcceso.eliminarCodigoPorInventario(inventarioId);
            if (!eliminadoCodigo) {
                return { error: true, code: 500, message: "Error al eliminar el código de acceso" };
            }

            return { error: false, data: null, message: "Accesos del inventario eliminados correctamente" };
        } catch (error) {
            return { error: true, code: 500, message: error.message };
        }
    }

    static async #complementarInventarios(inventarios) {
        return Promise.all(await inventarios.map(async inventario => await this.#complementarInventario(inventario)));
    }

    static async #complementarInventario(inventario) {
        const elementos = await this.objElemento.getAllByInventarioId(inventario.id);

        const totalMonetario = elementos.reduce(
            (total, { valor_monetario }) => total + parseFloat(valor_monetario), 0
        );

        inventario.valor_monetario = parseFloat(totalMonetario.toFixed(2));
        inventario.cantidad_elementos = (elementos || []).length;
        inventario.ambientes_cubiertos = (await this.objInventario.getAmbientesCubiertos(inventario.id) || []).length;

        delete inventario.fecha_creacion;
        delete inventario.usuario_admin_id;

        inventario.ultima_actualizacion = formatearFecha(inventario.ultima_actualizacion, true); // con hora opcional

        return inventario;
    }
}

export default AccesosService;
