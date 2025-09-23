

import {  obtenerBD } from "./bd.js";
import { cargarTabla } from "./funciones.js";


        
        document.getElementById("prestamo").addEventListener("change", function() {
            let url = this.value;
            if (url) {
            window.location.href = url; // redirige al enlace
            }
        });
        document.getElementById("insumo").addEventListener("change", function() {
            let url = this.value;
            if (url) {
            window.location.href = url; // redirige al enlace
            }
        });
        document.getElementById("usuario").addEventListener("change", function() {
            let url = this.value;
            if (url) {
            window.location.href = url; // redirige al enlace
            }
        });




const datos = obtenerBD()
console.log(datos);

