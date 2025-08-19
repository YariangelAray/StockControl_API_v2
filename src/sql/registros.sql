-- ===========================
-- BASE DE DATOS
-- ===========================
USE stockcontrol_bd;

-- ===========================
-- REGISTROS INICIALES
-- ===========================

-- Roles del sistema
INSERT INTO roles (nombre, descripcion) VALUES 
  ('Superadministrador', 'Control total del sistema. Gestiona usuarios y todos los inventarios.'),
  ('Administrativo', 'Gestiona los inventarios a su cargo.'), 
  ('Corriente', 'Apoya en la gestión de los inventarios con acceso. Puede modificar cierta información de los elementos.');

-- Tipos de documento
INSERT INTO tipos_documento (nombre) VALUES 
  ('Cédula de Ciudadanía'),
  ('Tarjeta de Identidad'),
  ('Cédula de Extranjería'),
  ('Pasaporte'),
  ('Permiso Especial de Permanencia'),
  ('Permiso por Protección Temporal');

-- Programas de formación
INSERT INTO programas_formacion (nombre) VALUES
  ('(N/A) - No Aplica'),
  ('(ADSO) - Análisis y Desarrollo de Software');

-- Fichas asociadas a programas
INSERT INTO fichas (ficha, programa_id) VALUES
  ('(N/A) - No Aplica', 1),
  ('2894667', 2);

-- Géneros
INSERT INTO generos (nombre) VALUES
  ('Masculino'),
  ('Femenino'),
  ('Otro');

-- ===========================
-- USUARIOS
-- ===========================

-- Superadministrador → contraseña: #SuperAdmin12345
INSERT INTO usuarios (nombres, apellidos, tipo_documento_id, documento, genero_id, telefono, correo, contrasena, ficha_id) VALUES
  ('Super', 'Administrador', 1, '0987654321', 1, '3123456789', 'superadmin@ejemplo.com', '$2a$10$fYXzUYHrt8H6GlruZ1yGNeZKGUqbUd9pWJjAe1yCcoTkD5WKgfQcS', 1);

-- Administrativo → contraseña: #Admin12345
INSERT INTO usuarios (nombres, apellidos, tipo_documento_id, documento, genero_id, telefono, correo, contrasena, ficha_id) VALUES
  ('Enzy Zulay', 'Angarita Bermudez', 1, '1234567890', 2, '3123456789', 'administrativo@ejemplo.com', '$2a$10$dkawaQIOhlZjU/FD2D2eN.nMhFEnZH.TxAeGuUGyYS/DBKPsRoJB6', 1);

-- Corriente → contraseña: #Yase0421
INSERT INTO usuarios (nombres, apellidos, tipo_documento_id, documento, genero_id, telefono, correo, contrasena, ficha_id) VALUES
  ('Yariangel Gabriela', 'Aray Munar', 1, '1098833391', 2, '3006569633', 'gabrielamunar4@gmail.com', '$2a$10$34rXGDgpz5kJRjUFAWuzv.65v4cHmIdVOEFOW8HJUsEdihYVEuIjy', 1);

-- Asignación de roles a usuarios
INSERT INTO roles_usuarios (rol_id, usuario_id) VALUES
  (1, 1),
  (2, 2),
  (3, 3);

-- ===========================
-- UBICACIONES
-- ===========================

-- Centro de formación
INSERT INTO centros (nombre, direccion) VALUES 
  ('(CIMI) - Centro Industrial de Mantenimiento Integral', 'Km. 7 Vía Rincón de Girón');

-- Ambientes del centro
INSERT INTO ambientes (nombre, centro_id) VALUES 
  ('Fabrica de Software', 1), 
  ('Desarrollo de Software', 1);

-- Mapa del ambiente 1
UPDATE ambientes SET mapa = '[
  { "id": 1, "tipo": "Mesa", "placa": 92248961, "x": 100, "y": 100, "width": 180, "height": 80 },
  { "id": 2, "tipo": "Mesa", "placa": 92248960, "x": 300, "y": 100, "width": 180, "height": 80 },
  { "id": 3, "tipo": "Mesa", "placa": 92248959, "x": 470, "y": 100, "width": 180, "height": 80 },
  { "id": 4, "tipo": "PC", "placa": 92241017084, "x": 100, "y": 180, "width": 70, "height": 70 },
  { "id": 5, "tipo": "PC", "placa": 92241017083, "x": 300, "y": 180, "width": 70, "height": 70 },
  { "id": 6, "tipo": "PC", "placa": 92241017082, "x": 470, "y": 180, "width": 70, "height": 70 }
]' WHERE id = 1;

-- ===========================
-- ESTADOS DE ELEMENTOS
-- ===========================
INSERT INTO estados (nombre) VALUES 
  ('Bueno'), 
  ('Regular'), 
  ('Malo');

-- ===========================
-- INVENTARIO Y ELEMENTOS
-- ===========================

-- Inventario principal
INSERT INTO inventarios (nombre, fecha_creacion, ultima_actualizacion, usuario_admin_id) VALUES 
('Desarrollo de Software', '2008-12-22', '2024-12-19', 2);

-- Tipos de elementos y sus registros

-- CPU integrada
INSERT INTO tipos_elementos (nombre, consecutivo, descripcion, marca, modelo, atributos) VALUES 
('CPU INTEGRADA CON MONITOR', 297485, 'TIPO ELEMENTO DEVOLUTIVO UNIDAD DE MEDIDA UNIDAD PROCESADOR INTEL CORE I7 DISCO DURO 1 TERABYTE MEMORIA RAM DE 32 GB PANTALLA 23.8 PULGADAS TECNOLOGIA N.A. UNIDAD LECTORA N.A.', 'DELL', 'Optiplex 7470 AIO', 'CPU ALL IN ONE CON TECLADO Y MAUSE');
INSERT INTO elementos (placa, serial, tipo_elemento_id, fecha_adquisicion, valor_monetario, estado_id, ambiente_id, inventario_id) VALUES 
(92241017084, 'D2XD853', 1, '2020-11-4', 2691882, 1, 1, 1),
(92241017083, 'D41B853', 1, '2020-11-4', 2691882, 1, 1, 1),
(92241017082, 'D7GL853', 1, '2020-11-4', 2691882, 1, 1, 1),
(92241017064, 'D79H853', 1, '2020-11-4', 2691882, 1, 1, 1),
(92241017058, 'D2CB853', 1, '2020-11-4', 2691882, 1, 1, 1);

-- Portátiles
INSERT INTO tipos_elementos (nombre, consecutivo, descripcion, marca, modelo, atributos) VALUES 
('COMPUTADOR PORTATIL', 297419, 'TIPO ELEMENTO DEVOLUTIVO UNIDAD DE MEDIDA UNIDAD PROCESADOR AMD RYZEN 7 DISCO DURO 512 GB MEMORIA RAM DE 16 GB PANTALLA 14" PULGADAS UNIDAD LECTORA N.A.', 'HP', 'RTL 8822BE', 'Portátil Ultraliviano 3 12 hp Pb445 rg6 R7-3700u con tarjeta micro Sd pad Mause Guaya Mause y morral.');
INSERT INTO elementos (placa, serial, tipo_elemento_id, fecha_adquisicion, valor_monetario, estado_id, ambiente_id, inventario_id) VALUES 
(92241016679, '5CD0102TBD', 2, '2020-07-15', 1789685.04, 1, 2, 1),
(92241016609, '5CD010FDKM', 2, '2020-07-15', 1789685.04, 1, 2, 1),
(92241016608, '5CD010FDHF', 2, '2020-07-15', 1789685.04, 1, 2, 1),
(92241016587, '5CD010FDKT', 2, '2020-07-15', 1789685.04, 1, 1, 1),
(92241016518, '5CD0102T7J', 2, '2020-07-15', 1789685.04, 1, 2, 1);

-- Sillas
INSERT INTO tipos_elementos (nombre, consecutivo, descripcion, marca, modelo, atributos) VALUES 
('SILLA', 270075, 'TIPO ELEMENTO DEVOLUTIVO UNIDAD DE MEDIDA UNIDAD CLASE GIRATORIO (A) CARACTERISTICA ERGONOMICA SIN BRAZOS COLOR N.A. MATERIAL TAPIZADO Y POLIPROPILENO SISTEMA NEUMATICA', 'MUEBLES LA OFICINA', null, 'SILLA ERGONOMICA EJECUTIVA SIN BRAZOS POLIPROPILENO COLOR NEGRO CON RODACHINES');
INSERT INTO elementos (placa, serial, tipo_elemento_id, fecha_adquisicion, valor_monetario, estado_id, ambiente_id, inventario_id) VALUES 
(922415035, null, 3, '2016-12-22', 168200, 1, 2, 1),
(922415034, null, 3, '2016-12-22', 168200, 1, 2, 1),
(922415033, null, 3, '2016-12-22', 168200, 1, 1, 1),
(922415032, null, 3, '2016-12-22', 168200, 1, 1, 1),
(922415031, null, 3, '2016-12-22', 168200, 1, 2, 1);

-- Superficies de trabajo
INSERT INTO tipos_elementos (nombre, consecutivo, descripcion, marca, modelo, atributos) VALUES 
('SUPERFICIE DE TRABAJO', 249371, 'TIPO ELEMENTO DEVOLUTIVO UNIDAD DE MEDIDA UNIDAD CARACTERISTICA RECEPCION RECTANGULAR DIMENSION 2.10 X 0.60 MT MATERIAL FORMICA', null, null, 'SUPERFICIE RECTA DE 1.60*60*30 CON DOS OROFICIOS PASA CABLES');
INSERT INTO elementos (placa, serial, tipo_elemento_id, fecha_adquisicion, valor_monetario, estado_id, ambiente_id, inventario_id) VALUES 
(92248961, null, 4, '2013-12-20', 269300, 1, 1, 1),
(92248960, null, 4, '2013-12-20', 269300, 1, 1, 1),
(92248959, null, 4, '2013-12-20', 269300, 1, 1, 1),
(92248958, null, 4, '2013-12-20', 269300, 1, 1, 1),
(92248957, null, 4, '2013-12-20', 269300, 1, 1, 1);

-- ===========================
-- REPORTES Y FOTOS
-- ===========================

-- Reportes de fallos
INSERT INTO reportes (asunto, mensaje, usuario_id, elemento_id) VALUES
  ('El equipo se apaga automáticamente', 'El computador se apaga de forma inesperada tras 10–15 minutos de uso sin previo aviso. No hay mensajes de error ni advertencias, simplemente se corta la energía.', 3, 1),
  ('Teclado con teclas atascadas', 'Varias teclas del teclado quedan atascadas o no registran la pulsación. Esto dificulta la escritura de documentos largos.', 3, 7),
  ('Ruedas dañadas', 'Dos de las patas para las ruedas de la silla están rotas y no giran libremente, lo que dificulta moverla por el ambiente.', 3, 12),
  ('Recubrimiento descascarado', 'El borde de la superficie de trabajo presenta descascarillado en el recubrimiento de formica, dejando la madera expuesta.', 3, 17);

-- Fotos asociadas a reportes
INSERT INTO fotos (url, reporte_id) VALUES
  ('fotos_reportes/foto_reporte_3.jpg', 3),
  ('fotos_reportes/foto_reporte_4.jpg', 4);
