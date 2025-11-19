// insumos.js

// IMPORTS
import {
  obtenerInsumos, guardarInsumo, actualizarInsumo,  eliminarInsumo } from "../bbdd/bd.js";

import { crearTablaGeneral, filtrarTabla, buscarInsumo } from "./funciones.js";

import { alertaAdvertencia, alertaError, alertaExito } from "./alerts.js";

// ELEMENTOS HTML
// Se mantiene el mismo ID, asumiendo que el tbody ya tiene insumosTablaBody
const insumosTablaBody = document.getElementById("insumosTablaBody"); 
const formRegistroInsumo = document.getElementById("registroInsumo");
const inputNombreAlta = document.getElementById("nombre");
const inputCantidadAlta = document.getElementById("cantidad"); // Importante: se mantiene para leer la cantidad de unidades
const textareaObservacionAlta = document.getElementById("observacion");
const inputBuscar = document.getElementById("inputBuscar");

// Modal de Alta
const modalNuevoInsumo = new bootstrap.Modal(document.getElementById('modalNuevoInsumo')); 

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
    btnEditar.addEventListener('click', () => abrirModalEditar(insumo));
    
    // Botón Eliminar (Ejemplo, la función de bd no está implementada)
    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn btn-outline-danger';
    btnEliminar.innerHTML = '<i class="bi bi-trash"></i>';
    btnEliminar.title = 'Eliminar';
    btnEliminar.addEventListener('click', () => {
        if (confirm(`¿Seguro que querés eliminar el insumo ${insumo.nombre} (${insumo.codigo})?`)) {
            eliminarInsumo(insumo.codigo);
            renderizarTablaInsumos();
        }
    });

    div.appendChild(btnEditar);
    div.appendChild(btnEliminar);
    return div;
}


function renderizarTablaInsumos() {
  insumosTablaBody.innerHTML = ""; 
  let insumos = obtenerInsumos();

  // Obtener texto del buscador y aplicar filtro
  let textoBusqueda = inputBuscar.value.trim();
  let insumosFiltrados = buscarInsumo(insumos, textoBusqueda);

  const tablaCompleta = crearTablaGeneral(insumosFiltrados, columnasInsumos, { 
    acciones: crearBotoneraAcciones 
  });

  const newTbody = tablaCompleta.querySelector('tbody');
  insumosTablaBody.innerHTML = newTbody.innerHTML; 
}



function abrirModalEditar(insumo) {
    // Implementar lógica para llenar el modal de edición
    document.getElementById('editCodigo').value = insumo.codigo;
    document.getElementById('editNombre').value = insumo.nombre;
    document.getElementById('editEstado').value = insumo.estado;
    document.getElementById('editObservacion').value = insumo.observacion || '';

    const modalEditar = new bootstrap.Modal(document.getElementById('modalEditarInsumo'));
    modalEditar.show();
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
      alertaAdvertencia('Cantidad inválida','La cantidad debe ser un número mayor a cero.')
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
  alertaExito('Alta exitosa',`${insumosCreados} insumo(s) "${nombre}" registrado(s) con éxito.` )
  
});

inputBuscar.addEventListener('input', renderizarTablaInsumos);