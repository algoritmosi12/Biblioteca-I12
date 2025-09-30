/// CREAMOS LA BASE DE DATOS ///
import { guardarElemento } from "../base_de_datos/bd.js";





const registroUsuario = document.getElementById("altaUsuarioForm");
const repeatPass = document.getElementById("repeatPass");
const mensaje = document.getElementById("mensaje")

registroUsuario.addEventListener("submit", (e) => {
    e.preventDefault();

    ///  GUARDAMOS TODOS LOS VALORES DEL FORMULARIO EN LAS VARIABLES CORRESPONDIENTES

    let nameRegistro = document.getElementById("nombreYApellido").value;
    let dniregistro = document.getElementById("dni").value;
    let emailRegistro = document.getElementById("email").value;
    let cargoRegistro = document.getElementById("cargo").value;
    let passRegistro = document.getElementById("altaPassword").value;
    let pass2Registro = document.getElementById("altaPassword2").value;
    


    // VALIDAMOS SI LAS CONTRASEÑAS COINCIDEN, EN CASO DE QUE NO, LE SALE UN MENSAJE AL USUARIO
    if (passRegistro != pass2Registro) {
        repeatPass.textContent = "Las contraseñas no coinciden";
    }
    else {

        // EN CASO DE QUE LAS CONTRASEÑAS COINCIDAN, SE GUARDARAN LOS DATOS DEL USUARIO
        let altaUsuario = {

            "nombreYApellido": nameRegistro,
            "dni": dniregistro,
            "email": emailRegistro,
            "passwordSystem": passRegistro,
            "cargo": cargoRegistro,
            // Nuevos Campos
            "tipo": "usuario",
            "active": true
        };

        console.log(altaUsuario);


        // UNA VEZ GUARDADOS LOS DATOS DEL USUARIO, LOS GUARDAMOS EN NUESTRA BASE DE DATOS (ARRAY EN ESTE CASO)
        //datosBBDD.push(altaUsuario);
        if (guardarElemento(altaUsuario)) {
            mensaje.textContent = "Usuario guardado"
            setTimeout(() => {
                window.location.href = "verUser.html";
            }, 2000);

        } else {
            mensaje.textContent = "Se produjo un error"
        }
        // UNA VALIDACION PARA MOSTRAR QUE NUESTRO USUARIO FUE GUARDADO CON EXITO
        //console.log(datosBBDD[2].surnameName);
    }
});
