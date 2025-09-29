import { cargarTabla } from "..//base_de_datos/funciones.js";
import { obtenerBD, obtenerSiguienteCodigo } from "../base_de_datos/bd.js";



// Obtener datos de Local Storage o inicializar vacío
const datos = obtenerBD()
cargarTabla(datos,"usuariosTable", "usuario");


console.log(datos);
