// insumos.js

// IMPORTS
import {
  obtenerInsumos, guardarInsumo, actualizarInsumo, eliminarInsumo,
} from "../bbdd/bd.js";

import { crearTablaGeneral, filtrarTabla, buscarInsumo } from "./funciones.js";

import { alertaAdvertencia, alertaError, alertaExito } from "./alerts.js";

// ELEMENTOS HTML
// Se mantiene el mismo ID, asumiendo que el tbody ya tiene insumosTablaBody
let insumosTablaBody = document.getElementById("insumosTablaBody");
const formRegistroInsumo = document.getElementById("registroInsumo");
const inputNombreAlta = document.getElementById("nombre");
const inputCantidadAlta = document.getElementById("cantidad"); // Importante: se mantiene para leer la cantidad de unidades
const textareaObservacionAlta = document.getElementById("observacion");
const inputBuscar = document.getElementById("inputBuscar");
const botonConfirmarEdicion = document.getElementById("submitEditar")

// Modal de Alta
const modalNuevoInsumo = new bootstrap.Modal(document.getElementById('modalNuevoInsumo'));
// Modal de Editar
const modalEditar = new bootstrap.Modal(document.getElementById('modalEditarInsumo'));

// Columnas para la tabla (se elimina 'cantidad')
const columnasInsumos = [
  { clave: "codigo", texto: "Código" },
  { clave: "nombre", texto: "Nombre" },
  // Se elimina la columna 'categoria'
  { clave: "estado", texto: "Estado" },
  { clave: "observacion", texto: "Observación" },
];

// FUNCIONES
function crearBotoneraAcciones(insumo) {
  const div = document.createElement('div');
  div.className = 'btn-group btn-group-sm';

  // Botón Editar
  const btnEditar = document.createElement('button');
  btnEditar.className = 'btn btn-outline-primary';
  btnEditar.innerHTML = '<i class="bi bi-pencil-square"></i>';
  btnEditar.title = 'Editar';
  btnEditar.addEventListener('click', () => abrirModalEditarInsumo(insumo));

  // Botón Eliminar (Ejemplo, la función de bd no está implementada)
  const btnEliminar = document.createElement('button');
  btnEliminar.className = 'btn btn-outline-danger';
  btnEliminar.innerHTML = '<i class="bi bi-trash"></i>';
  btnEliminar.title = 'Eliminar';
  console.log("botton" + btnEliminar);

  btnEliminar.addEventListener('click', () => {
    if (insumo.estado !== "Prestado") {
      if (confirm(`¿Seguro que querés eliminar el insumo : ${String(insumo.nombre).toUpperCase()} de codigo : (${insumo.codigo})?`)) {
        eliminarInsumo(Number(insumo.codigo));
        alertaExito("Se elimino correctamente")
        renderizarTablaInsumos();
      }
    } else alertaError("No se puede eliminar un insumo prestado")
  });

  div.appendChild(btnEditar);
  div.appendChild(btnEliminar);
  return div;
}



function renderizarTablaInsumos() {
  let insumos = obtenerInsumos();

  // Filtrar por buscador
  let textoBusqueda = inputBuscar.value.trim();
  let insumosFiltrados = buscarInsumo(insumos, textoBusqueda);

  if (insumosFiltrados.length > 0) {

    const tablaCompleta = crearTablaGeneral(insumosFiltrados, columnasInsumos, {
      acciones: crearBotoneraAcciones
    });

    const newTbody = tablaCompleta.querySelector("tbody");
    newTbody.id = "insumosTablaBody";

    insumosTablaBody.replaceWith(newTbody);
    insumosTablaBody = newTbody;

  } else {

    const newTbody = document.createElement("tbody");
    newTbody.id = "insumosTablaBody";

    newTbody.innerHTML = `
            <tr>
                <td colspan="${columnasInsumos.length + 1}" 
                    class="text-center text-muted">
                    No hay insumos para mostrar.
                </td>
            </tr>
        `;

    insumosTablaBody.replaceWith(newTbody);
    insumosTablaBody = newTbody;
  }
}



function abrirModalEditarInsumo(insumo) {
  // Implementar lógica para llenar el modal de edición
  document.getElementById('editCodigo').value = insumo.codigo;
  document.getElementById('editNombre').value = insumo.nombre;
  document.getElementById('editEstado').value = insumo.estado;
  document.getElementById('editObservacion').value = insumo.observacion || '';



  if (insumo.estado !== "Prestado") {

    modalEditar.show();

    let insumoActualizado = {}


    botonConfirmarEdicion.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(321321321);

      insumoActualizado = {
        codigo: document.getElementById('editCodigo').value,
        nombre: document.getElementById('editNombre').value,
        estado: document.getElementById('editEstado').value,
        observacion: document.getElementById('editObservacion').value,
      }


      if (actualizarInsumo(insumoActualizado)) {
        renderizarTablaInsumos()
        modalEditar.hide();
        alertaExito('Alta exitosa', `Se actualizo el insumo :" ${String(insumoActualizado.nombre).toUpperCase()}" correctamente.`)
      } else alertaError("No se pudo modificar")
    })
  }
  else alertaError("No se puede modificar un insumo prestado")
}














// 1. Renderizar al cargar
renderizarTablaInsumos();

// EVENTOS

// 2. Alta de Insumo: Itera según la cantidad ingresada
formRegistroInsumo.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = inputNombreAlta.value.trim();
  const cantidad = parseInt(inputCantidadAlta.value);
  const observacion = textareaObservacionAlta.value.trim();

  if (isNaN(cantidad) || cantidad < 1) {
    alertaAdvertencia('Cantidad inválida', 'La cantidad debe ser un número mayor a cero.')
    return;
  }

  let insumosCreados = 0;
  for (let i = 0; i < cantidad; i++) {
    const nuevoInsumo = {
      // El codigo correcto se asigna en el guardar insumo
      codigo: -1,
      nombre: nombre,
      // Se elimina categoria
      observacion: observacion,
      estado: "Disponible", // Se da de alta con estado "Disponible"
    };

    // Guardar cada insumo como una unidad separada
    guardarInsumo(nuevoInsumo);
    insumosCreados++;
  }


  // Recargar la tabla
  renderizarTablaInsumos();

  // Resetear formulario y cerrar modal
  formRegistroInsumo.reset();
  modalNuevoInsumo.hide();
  alertaExito('Alta exitosa', `${insumosCreados} insumo(s) "${nombre}" registrado(s) con éxito.`)

});

inputBuscar.addEventListener('input', renderizarTablaInsumos);