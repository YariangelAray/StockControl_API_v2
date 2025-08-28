
export const formatearFecha = (fechaISO, incluirHora = false) => {
    if (!fechaISO) return null;
    const fecha = new Date(fechaISO);

    const yyyy = fecha.getFullYear();
    const mm = String(fecha.getMonth() + 1).padStart(2, "0");
    const dd = String(fecha.getDate()).padStart(2, "0");

    if (!incluirHora) {
        return `${yyyy}-${mm}-${dd}`;
    }

    const hh = String(fecha.getHours()).padStart(2, "0");
    const min = String(fecha.getMinutes()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}