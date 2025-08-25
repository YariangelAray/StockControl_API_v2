import express from "express";

import UsuarioController from "../controllers/UsuarioController.js";
import { validarContrasena, validarDesactivar, validarUsuario, validarUsuarioParcial } from "../middlewares/entities/usuarios/usuarioValidator.js";

const router = express.Router();

// Obtener usuarios administrativos
router.get("/administrativos", UsuarioController.getUsuariosAdministrativos);

// Obtener el propio
router.get("/me", UsuarioController.getUsuarioMe);

// Actualizar el propio usuario
router.put("/me", validarUsuario, UsuarioController.updateUsuarioMe);

// Actualizar la contraseña del usuario
router.put("/me/contrasena", validarContrasena, UsuarioController.updateContrasenaMe);

// Desactivar la cuenta del usuario
router.put("/me/desactivar", validarDesactivar, UsuarioController.updateDesactivarMe);

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


export default router;