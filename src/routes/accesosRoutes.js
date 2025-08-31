import express from "express";

import authorize from "../middlewares/auth/authorize.js";
import authenticate from "../middlewares/auth/authenticate.js";
import { validarTiempo } from "../middlewares/entities/accesos/accesosValidator.js";
import AcessosController from "../controllers/AccesosController.js";

const router = express.Router();

router.get("/inventarios/me/", authenticate, authorize('inventario.view-access-own'), AcessosController.obtenerInventariosUsuario);

router.get("/inventarios/:inventarioId", authenticate, authorize('inventario.view-access-own', 'inventario.view-own'), AcessosController.obtenerCodigoActivo);

router.get("/usuarios/inventarios/:inventarioId", authenticate, authorize('inventario.view-own'), AcessosController.obtenerUsuariosAcceso);

router.post("/inventarios/me/generar/:inventarioId", authenticate, authorize('inventario.generate-code'), validarTiempo, AcessosController.generarCodigoAcceso);

router.post("/inventarios/acceder", authenticate, authorize('inventario.access-code'), AcessosController.registrarAcceso);

router.delete("/inventarios/:inventarioId", authenticate, AcessosController.eliminarAccesos);


export default router;