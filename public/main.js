///////// CREAMOS NUESTRA BASE DE DATOS /////////
import { obtenerBD, guardarElemento } from './bd.js';
let i;



const formulario = document.getElementById("forms");



const parrafo = document.getElementById("parrafo");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    let user = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let bd = obtenerBD()
   
    for (i = 0; i < bd.length; i++) {
        if (bd[i].userSystem === user && bd[i].passwordSystem === password) {
            window.location.href = "home.html";
            break
        }
        else {
            parrafo.textContent = "Usuario o contraseña incorrecta";
        }

    };
});

