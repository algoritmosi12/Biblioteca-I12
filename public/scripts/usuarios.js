// usuarios.js - Maneja el listado y acciones de la tabla de usuarios

import { obtenerUsuarios, eliminarUsuario, actualizarUsuario } from "../bbdd/bd.js";
import { alertaError, alertaExito } from "./alerts.js";

import { crearTablaGeneral } from "./funciones.js";

// ELEMENTOS HTML
let usuariosTableBody = document.getElementById("usuariosTableBody");

const botonConfirmarEdicion = document.getElementById("submitEditarUsuario")
// Modal de Editar
const modalEditar = new bootstrap.Modal(document.getElementById('modalEditarUsuario'));


const columnasUsuarios = [
    { clave: "nombreYApellido", texto: "Nombre y Apellido" },
    { clave: "dni", texto: "DNI" },
    { clave: "email", texto: "Email" },
    { clave: "cargo", texto: "Cargo" },
];

// FUNCIONES
function crearBotoneraAcciones(usuario) {
    const div = document.createElement('div');
    div.className = 'btn-group btn-group-sm';

    // Botón Editar
    const btnEditar = document.createElement('button');
    btnEditar.className = 'btn btn-outline-primary';
    btnEditar.innerHTML = '<i class="bi bi-pencil-square"></i>';
    btnEditar.title = 'Editar Usuario';
    btnEditar.addEventListener('click', () => abrirModalEditarUsuario(usuario));

    // Botón Eliminar
    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn btn-outline-danger';
    btnEliminar.innerHTML = '<i class="bi bi-trash"></i>';
    btnEliminar.title = 'Eliminar Usuario';

    btnEliminar.addEventListener('click', () => {
        if (String(usuario.cargo).toUpperCase() !== "ADMIN") {
            if (confirm(`¿Seguro que querés eliminar a ${String(usuario.nombreYApellido).toUpperCase()}?`)) {
                eliminarUsuario(Number(usuario.codigo))
                renderizarTablaUsuarios();
                alertaExito("Se elimino correctamente")
            }
        }
        else alertaError("No se puede eliminar admin");

    })

    div.appendChild(btnEditar);
    div.appendChild(btnEliminar);
    return div;
}



function abrirModalEditarUsuario(usuario) {
    document.getElementById('editCodigo').value = usuario.codigo;
    document.getElementById('editNombreYApellido').value = usuario.nombreYApellido;
    document.getElementById('editCargo').value = usuario.cargo;
    document.getElementById('editEmail').value = usuario.email
    document.getElementById('editPasswordSystem').value = usuario.passwordSystem


    console.log(usuario);


    if (String(usuario.cargo).toUpperCase() !== "ADMIN") {



        modalEditar.show();

        let usuarioActualizado = {}


        botonConfirmarEdicion.addEventListener("click", (e) => {
            e.preventDefault();

            usuarioActualizado = {
                codigo: document.getElementById('editCodigo').value,
                nombreYApellido: document.getElementById('editNombreYApellido').value,
                cargo: document.getElementById('editCargo').value,
                email: document.getElementById('editEmail').value,
                passwordSystem: document.getElementById('editPasswordSystem').value,
            }


            if (actualizarUsuario(usuarioActualizado)) {
                renderizarTablaUsuarios()
                modalEditar.hide();
                alertaExito('Alta exitosa', `Se actualizo el usuario :" ${String(usuarioActualizado.nombreYApellido).toUpperCase()}" correctamente.`)
            } else alertaError("No se pudo modificar")
        })
    }
    else alertaError("No se puede modificar un usuario admin")
}



export function renderizarTablaUsuarios() {
    const usuarios = obtenerUsuarios();

    if (usuarios.length > 0) {

        const tablaCompleta = crearTablaGeneral(usuarios, columnasUsuarios, {
            acciones: crearBotoneraAcciones
        });

        const newTbody = tablaCompleta.querySelector("tbody");
        newTbody.id = "usuariosTableBody";

        usuariosTableBody.replaceWith(newTbody);

        usuariosTableBody = newTbody;

    } else {
        // Si no hay usuarios, deja un mensaje en la tabla diciendo que no hay
        const newTbody = document.createElement("tbody");
        newTbody.id = "usuariosTableBody";
        newTbody.innerHTML = `
            <tr>
                <td colspan="${columnasUsuarios.length + 1}" 
                    class="text-center text-muted">
                    No hay usuarios registrados.
                </td>
            </tr>
        `;

        usuariosTableBody.replaceWith(newTbody);
        usuariosTableBody = newTbody;
    }
}



// EVENTOS
renderizarTablaUsuarios();

// Escuchar el evento de altaUser.js para refrescar la tabla
window.addEventListener('usuarioGuardado', renderizarTablaUsuarios);