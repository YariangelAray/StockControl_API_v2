import ResponseProvider from "../providers/ResponseProvider.js";
import AccesosService from "../services/AccesosService.js";

class AcessosController{
    static async obtenerInventariosUsuario(req, res) {
        try {
            const usuarioId = req.user.id; // Suponiendo que el ID del usuario está en req.user.id
            const response = await AccesosService.obtenerInventariosUsuario(usuarioId);
            if (response.error) return ResponseProvider.error(res, response.message, response.code);
            return ResponseProvider.success(res, response.data, response.message, 200);
        } catch (error) {
            console.error("Error en controlador obtenerInventariosUsuario:", error);
            return ResponseProvider.error(res, "Error interno en el servidor", 500);
        }
    }

    static async obtenerCodigoActivo(req, res) {
        try {
            const { inventarioId } = req.params;
            const response = await AccesosService.obtenerCodigoActivo(inventarioId);
            if (response.error) return ResponseProvider.error(res, response.message, response.code);
            return ResponseProvider.success(res, response.data, response.message, 200);
        } catch (error) {
            console.error("Error en controlador obtenerCodigoActivo:", error);
            return ResponseProvider.error(res, "Error interno en el servidor", 500);
        }
    }

    static async obtenerUsuariosAcceso(req, res) {
        try {
            const { inventarioId } = req.params;
            const response = await AccesosService.obtenerUsuariosAcceso(inventarioId);
            if (response.error) return ResponseProvider.error(res, response.message, response.code);
            return ResponseProvider.success(res, response.data, response.message, 200);
        } catch (error) {
            console.error("Error en controlador obtenerUsuariosAcceso:", error);
            return ResponseProvider.error(res, "Error interno en el servidor", 500);
        }
    }

    static async generarCodigoAcceso(req, res) {
        try {
            const { inventarioId } = req.params;
            const { horas, minutos } = req.body;
            const response = await AccesosService.generarCodigoAcceso(inventarioId, {horas, minutos});
            if (response.error) return ResponseProvider.error(res, response.message, response.code);
            return ResponseProvider.success(res, response.data, response.message, 201);
        } catch (error) {
            console.error("Error en controlador generarCodigoAcceso:", error);
            return ResponseProvider.error(res, "Error interno en el servidor", 500);
        }
    }

    static async registrarAcceso(req, res) {
        try {
            const { codigo } = req.body;
            const usuarioId = req.user.id; 
            const response = await AccesosService.registrarAcceso(usuarioId, codigo);
            if (response.error) return ResponseProvider.error(res, response.message, response.code);
            return ResponseProvider.success(res, response.data, response.message, 201);
        } catch (error) {
            console.error("Error en controlador registrarAcceso:", error);
            return ResponseProvider.error(res, "Error interno en el servidor", 500);
        }
    }

    static async eliminarAccesos(req, res) {
        try {
            const { inventarioId } = req.params;
            const response = await AccesosService.eliminarAccesos(inventarioId);
            if (response.error) return ResponseProvider.error(res, response.message, response.code);
            return ResponseProvider.success(res, response.data, response.message, 200);
        } catch (error) {
            console.error("Error en controlador eliminarAccesos:", error);
            return ResponseProvider.error(res, "Error interno en el servidor", 500);   
        }
    }
}

export default AcessosController;