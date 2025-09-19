import { cargarTabla } from "../funciones.js";
import { obtenerBD, obtenerSiguienteCodigo } from "../bd.js";



// obtener datos de Local Storage o inicializar vacío
const datos = obtenerBD()
cargarTabla(datos,"prestamosTable", "prestamo");


