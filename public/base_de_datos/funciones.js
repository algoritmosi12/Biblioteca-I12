/*function borrarLogico(posicion, datos) {
            // datos[0] = dame el dato del array en la posicion 0  
            datos[posicion].active = false;
            //actualizar la base de datos despues de borrar logico
            guardarArray(datos);
};*/

export function crearTabla (idTabla,datos) {
    //agarramos la tabla segun su id
    const table = document.getElementById(idTabla);
    for (let i = 0; i < datos.length; i++) {
        const usuario = datos[i]; // guardo todos los datos segun tipo (usuario,insumo,prestamo)
        const tr = document.createElement("tr");
        
        for (let campo in usuario) {
                if (idTabla == "usuariosTable") {
                    if (campo !== "codigo" && campo !== "password" && campo !== "active"){
                        const td = document.createElement("td");
                        td.textContent = usuario[campo];
                        tr.appendChild(td);
                    }
                }
                else if (idTabla == "prestamosTabla") {
                    if (campo !== "active" && campo !== "codigo"){
                        const td = document.createElement("td");
                        td.textContent = usuario[campo];
                        tr.appendChild(td);
                    }
                }   
                else if (idTabla == "insumosTabla")
                    if (campo !== "active"){
                        const td = document.createElement("td");
                        td.textContent = usuario[campo];
                        tr.appendChild(td);
                    }
            }
             // Botón borrar
            const tdBorrar = document.createElement("td");
            const btn = document.createElement("button");
            btn.textContent = "Borrar";
            btn.className = "btn btn-sm btn-danger";
            btn.id = usuario["codigo"]; //PRESTA ATENCION A ESTE BOTON

            btn.onclick = () => {
                //borrarLogico(posicion,datos)            
                //actualizo la tabla
                location.reload();
            };
    
            //agrego el boton al td
            tdBorrar.appendChild(btn);
            //agrega el boton a la fila
            tr.appendChild(tdBorrar);
            //a la tabla de usuarios o insumos le agrego la fila
            table.appendChild(tr);
        }
    }



/*import { guardarArray } from "./bd.js";*/
/*// función para cargar tabla según tipo
export function cargarTabla(datos,id_tabla, tipo) {


    //agarro del html la tabla que corresponde
    const table = document.getElementById(id_tabla);
    
    
    //borra duplicados
    //table.querySelectorAll("tr:not(:first-child)").forEach(tr => tr.remove());

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
*/