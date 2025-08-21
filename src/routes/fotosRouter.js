import express from "express";

import FotoController from "../controllers/FotoController.js";
import { uploadFotoMiddleware } from "../middlewares/entities/fotos/uploadFoto.js";

const router = express.Router();

router.post("/subir", uploadFotoMiddleware, FotoController.subirFoto);

export default router;