-- ===========================
-- BASE DE DATOS
-- ===========================
USE stockcontrol_bd;

-- ===========================
-- ELIMINACIÓN DE TABLAS EXISTENTES
-- ===========================
DROP TABLE IF EXISTS 
  accesos_temporales, codigos_acceso, fotos, reportes, elementos, estados, tipos_elementos, 
  ambientes, centros, inventarios, roles_usuarios, usuarios, generos, fichas, programas_formacion, 
  tipos_documento, permisos_roles, permisos, roles;

-- ===========================
-- USUARIOS Y ROLES
-- ===========================

CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(30),
  descripcion TEXT
);

CREATE TABLE permisos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50),
  descripcion TEXT
);

CREATE TABLE permisos_roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  permiso_id INT,
  rol_id INT,
  FOREIGN KEY (permiso_id) REFERENCES permisos(id),
  FOREIGN KEY (rol_id) REFERENCES roles(id)
);

CREATE TABLE tipos_documento (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50)
);

CREATE TABLE programas_formacion (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100)
);

CREATE TABLE fichas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ficha VARCHAR(20) UNIQUE,
  programa_id INT,
  FOREIGN KEY (programa_id) REFERENCES programas_formacion(id)
);

CREATE TABLE generos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50)
);

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombres VARCHAR(100),
  apellidos VARCHAR(100),
  tipo_documento_id INT,
  documento VARCHAR(11) UNIQUE NOT NULL,
  genero_id INT,
  telefono VARCHAR(15),
  correo VARCHAR(100) UNIQUE NOT NULL,
  ficha_id INT DEFAULT 1, -- No Aplica
  contrasena VARCHAR(100),
  activo BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (tipo_documento_id) REFERENCES tipos_documento(id),
  FOREIGN KEY (genero_id) REFERENCES generos(id),
  FOREIGN KEY (ficha_id) REFERENCES fichas(id)
);

CREATE TABLE roles_usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  rol_id INT,
  usuario_id INT UNIQUE,
  FOREIGN KEY (rol_id) REFERENCES roles(id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- ===========================
-- INVENTARIOS
-- ===========================

CREATE TABLE inventarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50),
  fecha_creacion DATE,
  ultima_actualizacion DATE,
  usuario_admin_id INT,
  FOREIGN KEY (usuario_admin_id) REFERENCES usuarios(id)
);

-- ===========================
-- UBICACIONES
-- ===========================

CREATE TABLE centros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  direccion VARCHAR(50)
);

CREATE TABLE ambientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50),
  centro_id INT,
  mapa MEDIUMTEXT,
  FOREIGN KEY (centro_id) REFERENCES centros(id)
);

-- ===========================
-- ELEMENTOS
-- ===========================

CREATE TABLE estados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(20)
);

CREATE TABLE tipos_elementos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50),
  consecutivo INT UNIQUE NOT NULL,
  descripcion VARCHAR(250),
  marca VARCHAR(50),
  modelo VARCHAR(50),
  atributos TEXT
);

CREATE TABLE elementos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  placa BIGINT UNIQUE,
  serial VARCHAR(15) UNIQUE,
  tipo_elemento_id INT,
  fecha_adquisicion DATE,
  valor_monetario DECIMAL(12, 2),
  estado_id INT,
  observaciones TEXT,
  activo BOOLEAN DEFAULT TRUE,
  ambiente_id INT NULL,
  inventario_id INT,
  FOREIGN KEY (tipo_elemento_id) REFERENCES tipos_elementos(id),
  FOREIGN KEY (estado_id) REFERENCES estados(id),
  FOREIGN KEY (ambiente_id) REFERENCES ambientes(id),
  FOREIGN KEY (inventario_id) REFERENCES inventarios(id)
);

-- ===========================
-- REPORTES
-- ===========================

CREATE TABLE reportes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha DATE DEFAULT (CURDATE()),
  asunto VARCHAR(100),
  mensaje TEXT,
  usuario_id INT,
  elemento_id INT,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (elemento_id) REFERENCES elementos(id)
);

CREATE TABLE fotos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  url TEXT,
  reporte_id INT,
  FOREIGN KEY (reporte_id) REFERENCES reportes(id)
);

-- ===========================
-- GESTIÓN DE ACCESO A INVENTARIOS
-- ===========================

CREATE TABLE codigos_acceso (
  id INT PRIMARY KEY AUTO_INCREMENT,
  codigo VARCHAR(10) NOT NULL UNIQUE,
  inventario_id INT NOT NULL,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  fecha_expiracion DATETIME NOT NULL,
  FOREIGN KEY (inventario_id) REFERENCES inventarios(id)
);

CREATE TABLE accesos_temporales (
  id INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT,
  codigo_acceso_id INT,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (codigo_acceso_id) REFERENCES codigos_acceso(id)
);

-- ===========================
-- TRIGGERS
-- ===========================

DELIMITER //

-- Establecer fecha de actualización al insertar inventario
CREATE TRIGGER establecer_ultima_actualizacion
BEFORE INSERT ON inventarios
FOR EACH ROW
BEGIN
  IF NEW.ultima_actualizacion IS NULL THEN
    SET NEW.ultima_actualizacion = NEW.fecha_creacion;
  END IF;
END;
//

-- Actualizar fecha al modificar inventario directamente
CREATE TRIGGER actualizar_inventario_directo
BEFORE UPDATE ON inventarios
FOR EACH ROW
BEGIN
  SET NEW.ultima_actualizacion = NOW();
END;
//

-- Actualizar fecha al insertar elemento
CREATE TRIGGER actualizar_inventario_elemento
AFTER INSERT ON elementos
FOR EACH ROW
BEGIN
  UPDATE inventarios
  SET ultima_actualizacion = NOW()
  WHERE id = NEW.inventario_id;
END;
//

-- Actualizar fecha al modificar elemento
CREATE TRIGGER actualizar_inventario_modificacion
AFTER UPDATE ON elementos
FOR EACH ROW
BEGIN
  UPDATE inventarios
  SET ultima_actualizacion = NOW()
  WHERE id = NEW.inventario_id;
END;
//

-- Actualizar fecha al eliminar elemento
CREATE TRIGGER actualizar_inventario_eliminacion
AFTER DELETE ON elementos
FOR EACH ROW
BEGIN
  UPDATE inventarios
  SET ultima_actualizacion = NOW()
  WHERE id = OLD.inventario_id;
END;
//

DELIMITER ;

select * from elementos;	