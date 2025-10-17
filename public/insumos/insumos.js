/*import { cargarTabla } from "../base_de_datos/funciones.js"
import { obtenerBD } from "../base_de_datos/bd.js";



// obtener datos de Local Storage o inicializar vacío
const datos = obtenerBD()
cargarTabla(datos,"insumosTable", "insumo");

console.log (datos)*/

//import {crearTabla} from "../base_de_datos/funciones.js";

//const insumosBBDD = JSON.parse(localStorage.getItem("insumos"));

//crearTabla("insumosTabla",insumosBBDD);

//------------------------------------------------------------------------
//ESTO LO DEJO PROVISORIO HASTA QUE ESTE ARREGLADA LA FUNCION crearTabla :) 

const insumos = JSON.parse(localStorage.getItem("insumos")) || [];
const tbody = document.querySelector("#insumosTabla tbody");

tbody.innerHTML = "";

for (let i = 0; i < insumos.length; i++) {
  const insumo = insumos[i];

  const fila = `
    <tr>
      <td>${insumo.codigo}</td>
      <td>${insumo.nombre}</td>
      <td>${insumo.categoria}</td>
      <td>${insumo.estado}</td>
      <td>${insumo.observacion || "-"}</td>
      <td class="text-center">
        <button class="btn btn-sm btn-outline-secondary me-2" data-id="${insumo.codigo}" title="Editar">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" data-id="${insumo.codigo}" title="Eliminar">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  `;

  tbody.innerHTML += fila;
}

// Referencias al modal de edición
const formEditar = document.getElementById("formEditarInsumo");
const modalEditar = new bootstrap.Modal(document.getElementById("modalEditarInsumo"));

// Escuchar clics en los botones de acción (editar / eliminar)
document.addEventListener("click", function(e) {
  const botonEditar = e.target.closest(".btn-outline-secondary");
  const botonEliminar = e.target.closest(".btn-outline-danger");

  if (botonEditar) {
    const id = parseInt(botonEditar.getAttribute("data-id"));
    editarInsumo(id);
  }

  if (botonEliminar) {
    const id = parseInt(botonEliminar.getAttribute("data-id"));
    eliminarInsumo(id);
  }
});

// Función para cargar datos del insumo en el modal
function editarInsumo(id) {
  const insumos = JSON.parse(localStorage.getItem("insumos")) || [];
  const insumo = insumos.find(function(i) { return i.codigo === id; });

  if (!insumo) return;

  document.getElementById("editCodigo").value = insumo.codigo;
  document.getElementById("editNombre").value = insumo.nombre;
  document.getElementById("editCategoria").value = insumo.categoria;
  document.getElementById("editEstado").value = insumo.estado;
  document.getElementById("editObservacion").value = insumo.observacion;

  modalEditar.show();
}

// Guardar cambios en el insumo
formEditar.addEventListener("submit", function(e) {
  e.preventDefault();

  const id = parseInt(document.getElementById("editCodigo").value);
  const nombre = document.getElementById("editNombre").value;
  const categoria = document.getElementById("editCategoria").value;
  const estado = document.getElementById("editEstado").value;
  const observacion = document.getElementById("editObservacion").value;

  let insumos = JSON.parse(localStorage.getItem("insumos")) || [];

  for (let i = 0; i < insumos.length; i++) {
    if (insumos[i].codigo === id) {
      insumos[i].nombre = nombre;
      insumos[i].categoria = categoria;
      insumos[i].estado = estado;
      insumos[i].observacion = observacion;
      break; //jeje
    }
  }

  localStorage.setItem("insumos", JSON.stringify(insumos));
  modalEditar.hide();
  location.reload(); // refresca la tabla para mostrar los cambios
});

// Eliminar insumo
function eliminarInsumo(id) {
  let insumos = JSON.parse(localStorage.getItem("insumos")) || [];
  insumos = insumos.filter(function(i) { return i.codigo !== id; });
  localStorage.setItem("insumos", JSON.stringify(insumos));
  location.reload();
}
