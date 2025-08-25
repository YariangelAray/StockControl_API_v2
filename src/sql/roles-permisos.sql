INSERT INTO permisos (nombre, descripcion) VALUES
-- Usuarios
('usuario.create', 'Crear usuarios'),
('usuario.view', 'Ver usuarios'),
('usuario.update', 'Actualizar usuarios'),
('usuario.delete', 'Eliminar usuarios'),
('usuario.assign-role', 'Asignar roles a usuarios'),
('usuario.disable', 'Desactivar usuarios'),

('user.view-own', 'Ver su propio perfil'),
('user.update-own', 'Actualizar su propio perfil'),
('user.change-password-own', 'Cambiar su propia contraseña'),
('user.disable-own', 'Desactivar su propia cuenta'),

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

('inventario.view-own', 'Ver sus propios inventarios'),

-- Centros
('centro.create', 'Crear centros'),
('centro.view', 'Ver centros'),
('centro.update', 'Actualizar centros'),
('centro.delete', 'Eliminar centros'),
('centro.*', 'Acceso total a todas las acciones relacionadas con centros'),

-- Ficha
('ficha.create', 'Crear fichas'),
('ficha.view', 'Ver fichas'),
('ficha.update', 'Actualizar fichas'),
('ficha.delete', 'Eliminar fichas'),
('ficha.*', 'Acceso total a todas las acciones relacionadas con fichas'),

-- Programas de formación
('programa-formacion.create', 'Crear programas de formación'),
('programa-formacion.view', 'Ver programas de formación'),
('programa-formacion.update', 'Actualizar programas de formación'),
('programa-formacion.delete', 'Eliminar programas de formación'),
('programa-formacion.*', 'Acceso total a todas las acciones relacionadas con programas de formación'),

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
('tipo-elemento.view-own', 'Ver los tipos de elementos asociados a un inventario específico propio'),
('tipo-elemento.*', 'Acceso total a todas las acciones relacionadas con tipos de elementos'),

-- Estados
('estado.create', 'Crear estados'),
('estado.view', 'Ver estados'),
('estado.update', 'Actualizar estados'),
('estado.delete', 'Eliminar estados'),
('estado.*', 'Acceso total a todas las acciones relacionadas con estados'),

-- Elementos

('elemento.view-inventory-own', 'Ver los elementos asociados a un inventario específico propio'),
('elemento.create-inventory-own', 'Crear elementos asociados a un inventario específico propio'),
('elemento.update-inventory-own', 'Actualizar los elementos asociados a un inventario específico propio'),
('elemento.update-patch-inventory-access', 'Actualizar parcialmente los elementos asociados a un inventario específico propio'),
('elemento.change-status-inventory-own', 'Cambiar los estados de elementos asociados a un inventario específico propio'),

('elemento.create', 'Crear elementos'),
('elemento.view', 'Ver elementos'),
('elemento.update', 'Actualizar elementos'),
('elemento.delete', 'Eliminar elementos'),
('elemento.change-status', 'Cambiar los estados de los elementos'),

('elemento.*', 'Acceso total a todas las acciones relacionadas con elementos'),

-- Reportes y fotos
('reporte.view-inventory-own', 'Ver los reportes asociados a un inventario específico propio'),
('reporte.view-own', 'Ver los reportes específico propios'),
('reporte.create', 'Crear reportes'),
('reporte.view', 'Ver reportes'),
('reporte.update', 'Actualizar reportes'),
('reporte.delete', 'Eliminar reportes'),

-- Fotos de reportes
('foto.view', 'Ver fotos de reportes'),
('foto.create', 'Ver fotos de reportes'),
('foto.update', 'Actualizar fotos de reportes'),
('foto.delete', 'Eliminar fotos de reportes'),
('foto.*', 'Acceso total a todas las acciones relacionadas con fotos'),

('foto.view-inventory-own', 'Ver fotos de reportes de un inventario propio'),
('foto.create-inventory-own', 'Crear fotos a un reporte de un inventario propio'),

-- Códigos de acceso
('access-code.create', 'Crear códigos de acceso'),
('access-code.view', 'Ver códigos de acceso'),
('access-code.invalidate', 'Invalidar códigos de acceso');
