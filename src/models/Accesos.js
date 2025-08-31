import connection from '../utils/connection.js';

class Accesos {

  // Obtiene inventarios a los que el usuario tiene acceso temporal vigente
  async obtenerInventariosUsuario(usuarioId) {
    const sql = `
      SELECT i.*
      FROM accesos_temporales at
      JOIN codigos_acceso ca ON at.codigo_acceso_id = ca.id
      JOIN inventarios i ON ca.inventario_id = i.id
      WHERE at.usuario_id = ? AND ca.fecha_expiracion > NOW()
    `;
    const [rows] = await connection.query(sql, [usuarioId]);
    return rows;
  }

  // Obtiene usuarios con acceso temporal activo a un inventario
  async obtenerUsuariosAcceso(inventarioId) {
    // Primero obtener código activo
    const codigoActivo = await this.getCodigoActivo(inventarioId);
    if (!codigoActivo) return null;

    const sql = `
      SELECT u.id, u.nombres, u.apellidos, u.documento
      FROM accesos_temporales at
      JOIN usuarios u ON at.usuario_id = u.id
      WHERE at.codigo_acceso_id = ?
    `;
    const [rows] = await connection.query(sql, [codigoActivo.id]);
    return rows;
  }

  // Obtiene código activo para un inventario
  async getCodigoActivo(inventarioId) {
    const sql = `
      SELECT * FROM codigos_acceso
      WHERE inventario_id = ? AND fecha_expiracion > NOW()
      ORDER BY fecha_expiracion DESC LIMIT 1
    `;
    const [rows] = await connection.query(sql, [inventarioId]);
    return rows[0] || null;
  }

  // Crea un nuevo código de acceso
  async crearCodigoAcceso({ codigo, inventario_id, fecha_expiracion }) {
    const sql = `
      INSERT INTO codigos_acceso (codigo, inventario_id, fecha_expiracion)
      VALUES (?, ?, ?)
    `;
    const [result] = await connection.query(sql, [codigo, inventario_id, fecha_expiracion]);
    return result.insertId;
  }

  // Busca código válido por valor
  async buscarCodigoValido(codigo) {
    const sql = `
      SELECT * FROM codigos_acceso
      WHERE codigo = ? AND fecha_expiracion > NOW()
    `;
    const [rows] = await connection.query(sql, [codigo]);
    return rows[0] || null;
  }

  // Obtiene códigos activos asignados a un usuario
  async getCodigosActivosPorUsuario(usuarioId) {
    const sql = `
      SELECT ca.*
      FROM accesos_temporales at
      JOIN codigos_acceso ca ON at.codigo_acceso_id = ca.id
      WHERE at.usuario_id = ? AND ca.fecha_expiracion > NOW()
    `;
    const [rows] = await connection.query(sql, [usuarioId]);
    return rows;
  }

  // Crea un acceso temporal para un usuario y código
  async crearAccesoTemporal({ usuario_id, codigo_acceso_id }) {
    const sql = `
      INSERT INTO accesos_temporales (usuario_id, codigo_acceso_id)
      VALUES (?, ?)
    `;
    const [result] = await connection.query(sql, [usuario_id, codigo_acceso_id]);
    return result.affectedRows > 0;
  }

  // Elimina accesos temporales por código de acceso
  async eliminarAccesosPorCodigo(codigoId) {
    const sql = `DELETE FROM accesos_temporales WHERE codigo_acceso_id = ?`;
    const [result] = await connection.query(sql, [codigoId]);
    return result.affectedRows > 0;
  }

  // Elimina código de acceso por inventario
  async eliminarCodigoPorInventario(inventarioId) {
    const sql = `DELETE FROM codigos_acceso WHERE inventario_id = ?`;
    const [result] = await connection.query(sql, [inventarioId]);
    return result.affectedRows > 0;
  }
}

export default Accesos;
