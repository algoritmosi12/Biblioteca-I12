// usuarios.js - Maneja el listado y acciones de la tabla de usuarios

import { obtenerUsuarios, eliminarUsuario, actualizarUsuario } from "../bbdd/bd.js";
import { alertaError, alertaExito } from "./alerts.js";

import { crearTablaGeneral } from "./funciones.js";

// ELEMENTOS HTML
let usuariosTableBody = document.getElementById("usuariosTableBody");

const botonConfirmarEdicion = document.getElementById("submitEditarUsuario")
const editCodigo = document.getElementById('editCodigo');
const editNombreYApellido = document.getElementById('editNombreYApellido');
const editCargo = document.getElementById('editCargo');
const editEmail = document.getElementById('editEmail');
const editPasswordSystem = document.getElementById('editPasswordSystem');
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

        Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Seguro que querés eliminar a ${String(usuario.nombreYApellido).toUpperCase()}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarUsuario(Number(usuario.codigo));
                renderizarTablaUsuarios();
                alertaExito("Se eliminó correctamente");
            }
        });

    } else {
        alertaError("No se puede eliminar admin");
    }
});

    div.appendChild(btnEditar);
    div.appendChild(btnEliminar);
    return div;
}



function abrirModalEditarUsuario(usuario) {
    editCodigo.value = usuario.codigo;
    editNombreYApellido.value = usuario.nombreYApellido;
    editCargo.value = usuario.cargo;
    editEmail.value = usuario.email;
    editPasswordSystem.value = usuario.passwordSystem;


    if (String(usuario.cargo).toUpperCase() !== "ADMIN") {

        modalEditar.show();

        let usuarioActualizado = {}

        botonConfirmarEdicion.addEventListener("click", (e) => {
            e.preventDefault();

            usuarioActualizado = {
                codigo: editCodigo.value,
                nombreYApellido: editNombreYApellido.value,
                cargo: editCargo.value,
                email: editEmail.value,
                passwordSystem: editPasswordSystem.value
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