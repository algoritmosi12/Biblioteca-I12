import { guardarArray } from "./bd.js";


export function borrarLogico(posicion, datos) {
            // datos[0] = dame el dato del array en la posicion 0  
            datos[posicion].active = false;
            //Actualizar la base de datos despues de borrar logico
            guardarArray(datos);
}




// Función para cargar tabla según tipo
export function cargarTabla(datos,id_tabla, tipo) {


    //Agarro del html la tabla que corresponde
    const table = document.getElementById(id_tabla);
    
    
    //Borra duplicados
    table.querySelectorAll("tr:not(:first-child)").forEach(tr => tr.remove());



    //Filtras los datos que sean activos y que sean igual a el tipo ( usuario o insumo)
    for (let posicion = 0; posicion < datos.length; posicion++) {
    //Obtengo el registro de la base de datos segun la posición    
    let registro = datos[posicion];
    

    // Preparo la fila de los activos y del tipo correcto(usuario o insumo)
    if (registro.active === true && registro.tipo === tipo) {
        const tr = document.createElement("tr");

        // Recorro cada campo del registro
        for (let campo in registro) {

            if (campo !== "active" && campo !== "tipo" && campo !== "passwordSystem") {
                const td = document.createElement("td");
                //Agrega el texto al td ej: mail = blas@gmail al texto del td
                td.textContent = registro[campo]
                tr.appendChild(td);
            }
        }

        // Botón borrar
        const tdBorrar = document.createElement("td");
        const btn = document.createElement("button");
        btn.textContent = "Borrar";
        btn.className = "btn btn-sm btn-danger";

        btn.onclick = () => {
            borrarLogico(posicion,datos)            
            //Actualizo la tabla
            cargarTabla(datos,id_tabla, tipo);
        };
    
        //Agrego el boton al td
        tdBorrar.appendChild(btn);
        //Agrega el boton a la fila
        tr.appendChild(tdBorrar);
        //A la tabla de usuarios o insumos le agrego la fila
        table.appendChild(tr);
    }
}

}
