import { obtenerUsuarios } from "../bbdd/bd.js";


const formulario = document.getElementById("forms");
const parrafo = document.getElementById("parrafo");

formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    let dni = document.getElementById("dni").value;
    let password = document.getElementById("password").value;
    const usuariosBBDD = obtenerUsuarios();

    

    let encontrado = false;

    for (let i = 0; i < usuariosBBDD.length; i++) {
        let usuario = usuariosBBDD[i];

        if (
            usuario.dni == dni &&
            (usuario.password == password || usuario.passwordSystem == password) &&
            usuario.active == true
        ) {
            encontrado = true;
        }
    }

    if (encontrado) {
        window.location.href = "../paginas/home.html";
    } else {
        parrafo.textContent = "Usuario o contraseña incorrecta";
    }
});