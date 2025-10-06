import { cargarTabla } from "..//base_de_datos/funciones.js";
import { obtenerBD, obtenerSiguienteCodigo } from "../base_de_datos/bd.js";



// Obtener datos de Local Storage o inicializar vacío
const usuariosBBDD = JSON.parse(localStorage.getItem("usuarios"));
//const datos = obtenerBD()
cargarTabla(usuariosBBDD,"usuariosTable", "usuario");

console.log(datos);
