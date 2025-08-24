import express from "express";

import UsuarioController from "../controllers/UsuarioController.js";
import { validarContrasena, validarUsuario, validarUsuarioParcial } from "../middlewares/entities/usuarios/usuarioValidator.js";

const router = express.Router();

// Obtener usuarios administrativos
router.get("/administrativos", UsuarioController.getUsuariosAdministrativos);

// Obtener todos los usuarios
router.get("/", UsuarioController.getAllUsuarios);

// Obtener un usuario por ID
router.get("/:id", UsuarioController.getUsuarioById);

// Crear un nuevo usuario
router.post("/", validarUsuario, UsuarioController.createUsuario);

// Actualizar un usuario
router.put("/:id", validarUsuario, UsuarioController.updateUsuario);

// Actualizar un usuario parcialmente
router.patch("/:id", validarUsuarioParcial, UsuarioController.updateUsuario);

// Eliminar un usuario
router.delete("/:id", UsuarioController.deleteUsuario);

// Actualizar la contraseña de un usuario
router.put("/:id/contrasena", validarContrasena, UsuarioController.updateContrasena);

export default router;