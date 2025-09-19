import { guardarArray } from "./bd.js";


export function borrarLogico(posicion, datos) {
            // datos[0] = dame el dato del array en la posicion 0  
            datos[posicion].active = false;
            //actualizar la base de datos despues de borrar logico
            guardarArray(datos);
}




// función para cargar tabla según tipo
export function cargarTabla(datos,id_tabla, tipo) {


    //agarro del html la tabla que corresponde
    const table = document.getElementById(id_tabla);
    
    
    //borra duplicados
    table.querySelectorAll("tr:not(:first-child)").forEach(tr => tr.remove());



    //filtras los datos que sean activos y que sean igual a el tipo ( usuario o insumo)
    for (let posicion = 0; posicion < datos.length; posicion++) {
    //obtengo el registro de la base de datos segun la posición    
    let registro = datos[posicion];
    

    // preparo la fila de los activos y del tipo correcto(usuario o insumo)
    if (registro.active === true && registro.tipo === tipo) {
        const tr = document.createElement("tr");

        // recorro cada campo del registro
        for (let campo in registro) {

            if (campo !== "active" && campo !== "tipo" && campo !== "passwordSystem") {
                const td = document.createElement("td");
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
            //actualizo la tabla
            cargarTabla(datos,id_tabla, tipo);
        };
    
        //agrego el boton al td
        tdBorrar.appendChild(btn);
        //agrega el boton a la fila
        tr.appendChild(tdBorrar);
        //a la tabla de usuarios o insumos le agrego la fila
        table.appendChild(tr);
    }
}

}
