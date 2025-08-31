import express from "express";

import FotoController from "../controllers/FotoController.js";
import { uploadFotoMiddleware } from "../middlewares/entities/fotos/uploadFoto.js";
import { validarFoto } from "../middlewares/entities/fotos/fotoValidator.js";
import authenticate from "../middlewares/auth/authenticate.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

router.get("/me", authenticate, authorize('foto.view-inventory-own'), FotoController.getAllFotosMe);
router.get("/me/:fotoId", authenticate, authorize('foto.view-inventory-own'), FotoController.getFotoByIdMe);
router.post("/me", authenticate, authorize('foto.create-inventory-own'), uploadFotoMiddleware, validarFoto, FotoController.subirFotoMe);

router.get("/", authenticate, authorize('foto.view'), FotoController.getAllFotos);
router.get("/:id", authenticate, authorize('foto.view'), FotoController.getFotoById);

router.post("/", authenticate, authorize('foto.create'), uploadFotoMiddleware, validarFoto, FotoController.subirFoto);
router.put("/:id", authenticate, authorize('foto.update'), uploadFotoMiddleware, FotoController.updateFoto);
router.delete("/:id", authenticate, authorize('foto.delete'), FotoController.deleteFoto);

export default router;