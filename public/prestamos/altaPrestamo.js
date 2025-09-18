///////// CREAMOS NUESTRA BASE DE DATOS /////////
import { guardarElemento } from "../bd.js";





// const registroUsuario = document.getElementById("registroUsuario");
// const repeatPass = document.getElementById("repeatPass") ;
// const mensaje=document.getElementById("mensaje")

// registroUsuario.btn.addEventListener("click", (e) => {
//     e.preventDefault();

//     /// GUARDAMOS TODOS LOS VALORES DEL FORMULARIO EN LAS VARIABLES CORRESPONDIENTES
// let nameRegistro = document.getElementById("surnameName").value;
// let userRegistro = document.getElementById("altaUser").value;
// let emailRegistro = document.getElementById("email").value;
// let cargoRegistro = document.getElementById("cargo").value;
// let passRegistro = document.getElementById("altaPassword").value;
// let pass2Registro = document.getElementById("altaPassword2").value;

//     // VALIDAMOS SI LAS CONTRASEÑAS COINCIDEN, EN CASO DE QUE NO, LE SALE UN MENSAJE AL USUARIO
//     if (passRegistro != pass2Registro) {
//     repeatPass.textContent = "Las contraseñas no coinciden";
//     }
//     else {

//         // EN CASO DE QUE LAS CONTRASEÑAS COINCIDAN, SE GUARDARAN LOS DATOS DEL USUARIO
//         let altaUsuario = {
//         "surnameName" : nameRegistro,
//         "userSystem" : userRegistro,
//         "passwordSystem" : passRegistro,
//         "mailSystem" : emailRegistro,
//         "cargo" : cargoRegistro,
//         // Nuevos Campos
//         "tipo" : "usuario",
//         "activo" : true
//         };

//         // UNA VEZ GUARDADOS LOS DATOS DEL USUARIO, LOS GUARDAMOS EN NUESTRA BASE DE DATOS (ARRAY EN ESTE CASO)
//     //datosBBDD.push(altaUsuario);
//         if(guardarElemento(altaUsuario)){
//             mensaje.textContent = "Usuario guardado"
//         }else{
//             mensaje.textContent = "Se produjo un error"
//         }
//     // UNA VALIDACION PARA MOSTRAR QUE NUESTRO USUARIO FUE GUARDADO CON EXITO
//     //console.log(datosBBDD[2].surnameName);
//     }
// });
