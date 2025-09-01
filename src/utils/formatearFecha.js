export const formatearFecha = (fechaISO, incluirHora = false) => {
  // Si no se proporciona una fecha válida, retorna null
  if (!fechaISO) return null;

  // Crea un objeto Date a partir de la cadena ISO recibida
  const fecha = new Date(fechaISO);

  // Obtiene el año completo (4 dígitos)
  const yyyy = fecha.getFullYear();

  // Obtiene el mes (0-11), suma 1 para que sea 1-12, y lo formatea con dos dígitos
  const mm = String(fecha.getMonth() + 1).padStart(2, "0");

  // Obtiene el día del mes y lo formatea con dos dígitos
  const dd = String(fecha.getDate()).padStart(2, "0");

  // Si no se debe incluir la hora, retorna la fecha en formato "YYYY-MM-DD"
  if (!incluirHora) {
    return `${yyyy}-${mm}-${dd}`;
  }

  // Obtiene la hora y la formatea con dos dígitos
  const hh = String(fecha.getHours()).padStart(2, "0");

  // Obtiene los minutos y los formatea con dos dígitos
  const min = String(fecha.getMinutes()).padStart(2, "0");

  // Retorna la fecha y hora en formato "YYYY-MM-DD HH:mm"
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}
