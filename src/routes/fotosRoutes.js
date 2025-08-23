import express from "express";

import FotoController from "../controllers/FotoController.js";
import { uploadFotoMiddleware } from "../middlewares/entities/fotos/uploadFoto.js";
import { validarFoto } from "../middlewares/entities/fotos/fotoValidator.js";

const router = express.Router();

router.get("/", FotoController.getAllFotos);
router.get("/:id", FotoController.getFotoById);
router.post("/", uploadFotoMiddleware, validarFoto, FotoController.subirFoto);
router.put("/:id", uploadFotoMiddleware, FotoController.updateFoto);
router.delete("/:id", FotoController.deleteFoto);

export default router;