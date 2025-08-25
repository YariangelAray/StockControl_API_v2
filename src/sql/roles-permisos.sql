INSERT INTO permisos (nombre, descripcion) VALUES
-- Usuarios
('usuario.create', 'Crear usuarios'),
('usuario.view', 'Ver usuarios'),
('usuario.update', 'Actualizar usuarios'),
('usuario.delete', 'Eliminar usuarios'),
('usuario.assign-role', 'Asignar roles a usuarios'),
('usuario.deactivate', 'Desactivar usuarios'),

('user.view-own', 'Ver su propio perfil'),
('user.update-own', 'Actualizar su propio perfil'),
('user.change-password-own', 'Cambiar su propia contraseña'),
('user.deactivate-own', 'Desactivar su propia cuenta'),

-- Roles
('rol.create', 'Crear roles'),
('rol.view', 'Ver roles'),
('rol.update', 'Actualizar roles'),
('rol.delete', 'Eliminar roles'),
('rol.assign-permission', 'Asignar permisos a roles'),
('rol.*', 'Acceso total a todas las acciones relacionadas con roles'),

-- Permisos
('permiso.view', 'Ver permisos'),
('permiso.create', 'Crear permisos'),
('permiso.update', 'Actualizar permisos'),
('permiso.delete', 'Eliminar permisos'),
('permiso.*', 'Acceso total a todas las acciones relacionadas con permisos'),

-- Inventarios
('inventario.create', 'Crear inventarios'),
('inventario.view', 'Ver inventarios'),
('inventario.update', 'Actualizar inventarios'),
('inventario.delete', 'Eliminar inventarios'),
('inventario.access-code', 'Acceso a inventario mediante código temporal'),
('inventario.manage-admin', 'Cambiar administrador de inventario'),

('inventario.view-own', 'Ver sus propios inventarios'),

-- Centros
('centro.create', 'Crear centros'),
('centro.view', 'Ver centros'),
('centro.update', 'Actualizar centros'),
('centro.delete', 'Eliminar centros'),
('centro.*', 'Acceso total a todas las acciones relacionadas con centros'),

-- Ambientes
('ambiente.create', 'Crear ambientes'),
('ambiente.view', 'Ver ambientes'),
('ambiente.update', 'Actualizar ambientes'),
('ambiente.delete', 'Eliminar ambientes'),
('ambiente.*', 'Acceso total a todas las acciones relacionadas con ambientes'),

-- Tipos de elementos
('tipo-elemento.create', 'Crear tipos de elementos'),
('tipo-elemento.view', 'Ver tipos de elementos'),
('tipo-elemento.update', 'Actualizar tipos de elementos'),
('tipo-elemento.delete', 'Eliminar tipos de elementos'),
('tipo-elemento.view-inventory', 'Ver los tipos de elementos asociados a un inventario específico'),
('tipo-elemento.*', 'Acceso total a todas las acciones relacionadas con tipos de elementos'),

-- Estados
('estado.create', 'Crear estados'),
('estado.view', 'Ver estados'),
('estado.update', 'Actualizar estados'),
('estado.delete', 'Eliminar estados'),
('estado.*', 'Acceso total a todas las acciones relacionadas con estados'),

-- Elementos
('elemento.create', 'Crear elementos'),
('elemento.view', 'Ver elementos'),
('elemento.update', 'Actualizar elementos'),
('elemento.delete', 'Eliminar elementos'),

('elemento.view-inventory', 'Ver los elementos asociados a un inventario específico'),

-- Reportes y fotos
('reporte.create', 'Crear reportes'),
('reporte.view', 'Ver reportes'),
('reporte.update', 'Actualizar reportes'),
('reporte.delete', 'Eliminar reportes'),
('reporte.add-photo', 'Agregar fotos a un reporte'),

('reporte.view-inventory', 'Ver los reportes asociados a un inventario específico'),

-- Códigos de acceso
('access-code.create', 'Crear códigos de acceso'),
('access-code.view', 'Ver códigos de acceso'),
('access-code.invalidate', 'Invalidar códigos de acceso');
