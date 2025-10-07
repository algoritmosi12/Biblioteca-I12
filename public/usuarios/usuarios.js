import { crearTabla } from "../base_de_datos/funciones.js";

const usuariosBBDD = JSON.parse(localStorage.getItem("usuarios"));
crearTabla("usuariosTable",usuariosBBDD);