import multer from "multer";
import path from "path";
import fs from "fs";

/**
 * Configuración de almacenamiento para fotos de reportes
 */
const storage = multer.diskStorage({
  /**
   * Define la carpeta donde se guardarán las fotos
   */
  destination: (req, file, cb) => {
    const dir = "public/img/reportes";
    fs.mkdirSync(dir, { recursive: true }); // Crea la carpeta si no existe
    cb(null, dir); // Usa esa carpeta como destino
  },

  /**
   * Define el nombre del archivo guardado
   */
  filename: (req, file, cb) => {
    const reporteId = req.body.reporte_id; // ID del reporte asociado
    const ext = path.extname(file.originalname); // Extensión del archivo
    const nombreUnico = `foto_reporte_${reporteId}_${Date.now()}${ext}`; // Nombre único
    cb(null, nombreUnico); // Usa ese nombre para guardar
  }
});

/**
 * Middleware para subir una sola foto con campo "foto"
 */
export const uploadFotoMiddleware = multer({ storage }).single("foto");
