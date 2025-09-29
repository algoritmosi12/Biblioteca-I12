import { cargarTabla } from "../base_de_datos/funciones.js"
import { obtenerBD } from "../base_de_datos/bd.js";



// obtener datos de Local Storage o inicializar vacío
const datos = obtenerBD()
cargarTabla(datos,"insumosTable", "insumo");

console.log (datos)