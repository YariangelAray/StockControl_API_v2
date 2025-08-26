INSERT INTO permisos (nombre, descripcion) VALUES
-- USUARIOS

('usuario.create', 'Crear nuevos usuarios'), -- 1
('usuario.view', 'Ver la lista de usuarios'), -- 2
('usuario.update', 'Modificar información de usuarios'), -- 3
('usuario.delete', 'Eliminar usuarios del sistema'), -- 4

('user.view-own', 'Ver su propio perfil de usuario'), -- 5
('user.update-own', 'Actualizar su propio perfil de usuario'), -- 6
('user.disable-own', 'Solicitar la desactivación de su propia cuenta'), -- 7

('usuario.view-role', 'Consultar los roles asignados a usuarios'), -- 8
('usuario.assign-role', 'Asignar roles a usuarios'), -- 9
('usuario.update-role', 'Modificar roles asignados a usuarios'), -- 10
('usuario.delete-role', 'Eliminar roles asignados a usuarios'), -- 11

-- ROLES

('rol.create', 'Crear nuevos roles'), -- 12
('rol.view', 'Ver la lista de roles'), -- 13
('rol.update', 'Modificar información de roles'), -- 14
('rol.delete', 'Eliminar roles del sistema'), -- 15

('rol.view-permission', 'Ver los permisos asignados a cada rol'), -- 16
('rol.assign-permission', 'Asignar permisos a un rol'), -- 17
('rol.update-permission', 'Actualizar los permisos de un rol'), -- 18
('rol.delete-permission', 'Eliminar permisos asignados a un rol'), -- 19

('rol.*', 'Acceso total a todas las acciones relacionadas con roles'), -- 20

-- PERMISOS

('permiso.view', 'Ver la lista de permisos disponibles'), -- 21
('permiso.create', 'Crear nuevos permisos'), -- 22
('permiso.update', 'Modificar permisos existentes'), -- 23
('permiso.delete', 'Eliminar permisos del sistema'), -- 24

('permiso.*', 'Acceso total a todas las acciones relacionadas con permisos'), -- 25

('permiso-rol.view', 'Ver las relaciones entre permisos y roles'), -- 26
('permiso-rol.*', 'Acceso total a todas las acciones relacionadas con permisos y roles'), -- 27

-- INVENTARIOS

('inventario.create', 'Crear nuevos inventarios'), -- 28
('inventario.view', 'Ver la lista de inventarios'), -- 29
('inventario.update', 'Modificar información de inventarios'), -- 30
('inventario.delete', 'Eliminar inventarios del sistema'), -- 31

('inventario.view-own', 'Ver los inventarios propios asociados al usuario'), -- 32

-- CENTROS

('centro.create', 'Crear nuevos centros'), -- 33
('centro.view', 'Ver la lista de centros'), -- 34
('centro.update', 'Modificar información de centros'), -- 35
('centro.delete', 'Eliminar centros del sistema'), -- 36
('centro.*', 'Acceso total a todas las acciones relacionadas con centros'), -- 37

-- FICHAS

('ficha.create', 'Crear nuevas fichas'), -- 38
('ficha.view', 'Ver la lista de fichas'), -- 39
('ficha.update', 'Modificar información de fichas'), -- 40
('ficha.delete', 'Eliminar fichas del sistema'), -- 41
('ficha.*', 'Acceso total a todas las acciones relacionadas con fichas'), -- 42

-- PROGRAMAS DE FORMACIÓN

('programa-formacion.create', 'Crear nuevos programas de formación'), -- 43
('programa-formacion.view', 'Ver la lista de programas de formación'), -- 44
('programa-formacion.update', 'Modificar programas de formación'), -- 45
('programa-formacion.delete', 'Eliminar programas de formación'), -- 46
('programa-formacion.*', 'Acceso total a todas las acciones relacionadas con programas de formación'), -- 47

-- AMBIENTES

('ambiente.create', 'Crear nuevos ambientes'), -- 48
('ambiente.view', 'Ver la lista de ambientes'), -- 49
('ambiente.update', 'Modificar información de ambientes'), -- 50
('ambiente.delete', 'Eliminar ambientes del sistema'), -- 51
('ambiente.*', 'Acceso total a todas las acciones relacionadas con ambientes'), -- 52

-- TIPOS DE ELEMENTOS

('tipo-elemento.create', 'Crear nuevos tipos de elementos'), -- 53
('tipo-elemento.view', 'Ver la lista de tipos de elementos'), -- 54
('tipo-elemento.update', 'Modificar tipos de elementos'), -- 55
('tipo-elemento.delete', 'Eliminar tipos de elementos'), -- 56
('tipo-elemento.view-inventory-own', 'Ver los tipos de elementos asociados a un inventario propio'), -- 57
('tipo-elemento.*', 'Acceso total a todas las acciones relacionadas con tipos de elementos'), -- 58

-- TIPOS DE DOCUMENTOS

('tipo-documento.create', 'Crear nuevos tipos de documentos'), -- 59
('tipo-documento.view', 'Ver la lista de tipos de documentos'), -- 60
('tipo-documento.update', 'Modificar tipos de documentos'), -- 61
('tipo-documento.delete', 'Eliminar tipos de documentos'), -- 62
('tipo-documento.*', 'Acceso total a todas las acciones relacionadas con tipos de documentos'), -- 63

-- ESTADOS

('estado.create', 'Crear nuevos estados'), -- 64
('estado.view', 'Ver la lista de estados'), -- 65
('estado.update', 'Modificar estados existentes'), -- 66
('estado.delete', 'Eliminar estados del sistema'), -- 67
('estado.*', 'Acceso total a todas las acciones relacionadas con estados'), -- 68

-- ELEMENTOS

('elemento.view-inventory-own', 'Ver los elementos asociados a un inventario propio'), -- 69
('elemento.create-inventory-own', 'Crear elementos en un inventario propio'), -- 70
('elemento.update-inventory-own', 'Actualizar elementos de un inventario propio'), -- 71
('elemento.update-patch-inventory-access', 'Actualizar parcialmente elementos de un inventario propio'), -- 72
('elemento.change-status-inventory-own', 'Cambiar el estado de elementos en un inventario propio'), -- 73

('elemento.create', 'Crear nuevos elementos'), -- 74
('elemento.view', 'Ver la lista de elementos'), -- 75
('elemento.update', 'Modificar información de elementos'), -- 76
('elemento.delete', 'Eliminar elementos del sistema'), -- 77
('elemento.change-status', 'Cambiar el estado de los elementos'), -- 78

('elemento.*', 'Acceso total a todas las acciones relacionadas con elementos'), -- 79

-- REPORTES

('reporte.view-inventory-own', 'Ver los reportes asociados a un inventario propio'), -- 80
('reporte.view-own', 'Ver los reportes creados por el usuario'), -- 81

('reporte.create', 'Crear nuevos reportes'), -- 82
('reporte.view', 'Ver la lista de reportes'), -- 83
('reporte.update', 'Modificar reportes existentes'), -- 84
('reporte.delete', 'Eliminar reportes del sistema'), -- 85

-- FOTOS DE REPORTES

('foto.view', 'Ver fotos de reportes'), -- 86
('foto.create', 'Crear fotos de reportes'), -- 87
('foto.update', 'Modificar fotos de reportes'), -- 88
('foto.delete', 'Eliminar fotos de reportes'), -- 89
('foto.*', 'Acceso total a todas las acciones relacionadas con fotos'), -- 90

('foto.view-inventory-own', 'Ver fotos de reportes de un inventario propio'), -- 91
('foto.create-inventory-own', 'Crear fotos en reportes de un inventario propio'), -- 92

-- CODIGOS ACCESO
('access-code.create', 'Crear códigos de acceso'), -- 93
('access-code.view', 'Ver la lista de códigos de acceso'), -- 94
('access-code.invalidate', 'Invalidar códigos de acceso') -- 95
;

INSERT INTO permisos_roles (permiso_id, rol_id) VALUES

-- SUPERADMINISTRADOR
(1,1),
(2,1),
(3,1),
(4,1),
(5,1),
(6,1),
(8,1),
(9,1),
(10,1),
(11,1),
(20,1),
(25,1),
(27,1),
(28,1),
(29,1),
(30,1),
(31,1),
(37,1),
(42,1),
(47,1),
(52,1),
(53,1),
(54,1),
(55,1),
(56,1),
(63,1),
(68,1),
(74,1),
(75,1),
(76,1),
(77,1),
(78,1),
(82,1),
(83,1),
(84,1),
(85,1),
(86,1),
(87,1),
(88,1),
(89,1),

-- ADMINISTRATIVO

(5,2),
(6,2),
(7,2),
(32,2),
(57,2),
(69,2),
(70,2),
(71,2),
(73,2),
(80,2),
(81,2),
(91,2),
(92,2),

-- CORRIENTE

(5,3),
(6,3),
(7,3)
;