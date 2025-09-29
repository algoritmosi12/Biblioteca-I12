import { guardarElemento, obtenerSiguienteCodigo } from "../base_de_datos/bd.js";

const registroInsumo = document.getElementById("registroInsumo");
const mensaje = document.getElementById("mensaje");

registroInsumo.addEventListener("submit", (e) => {
    e.preventDefault();

    // guardamos los valores del formulario
 
    let categoriaRegistro = document.getElementById("categoria").value;
    let materiaRegistro = document.getElementById("materia").value;
    let cantidadregistro = document.getElementById("cantidad").value;
    let observacionregistro = document.getElementById("observacion").value;
    let estadoRegistro = document.getElementById("estado").value;
    
    
    let crearinsumo = {
        "codigo" : obtenerSiguienteCodigo(),
        "nombre": document.getElementById("nombre").value,
        "categoria": categoriaRegistro,
        "materia": materiaRegistro,
        "cantidad": cantidadregistro,
        "estado": estadoRegistro,
        "observacion": observacionregistro,
        "tipo": "insumo",
        "active": true
    };

    console.log(crearinsumo);

    if (guardarElemento(crearinsumo)) {
        mensaje.textContent = "Insumo guardado";
         setTimeout(() => {
    window.location.href = "insumos.html";
  }, 2000);
 
        
        }else{
            mensaje.textContent = "Se produjo un error"
        }
});