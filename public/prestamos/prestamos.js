import {crearTabla} from "../base_de_datos/funciones.js";

const prestamosBBDD = JSON.parse(localStorage.getItem("prestamos"));

crearTabla("prestamosTabla",prestamosBBDD);