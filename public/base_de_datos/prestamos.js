// prestamos.js

import { obtenerPrestamosPorEstado, actualizarEstadoPrestamo, marcarComoDevuelto } from "./bd.js";
import { crearTablaGeneral, buscarInsumo } from "./funciones.js";

// ELEMENTOS HTML (asegurate que los IDs existan en tu prestamos.html)
const contenedorActivos = document.getElementById("prestamosActivos");
const contenedorMorosos = document.getElementById("prestamosMorosos");
const contenedorHistorial = document.getElementById("prestamosHistorial");
const inputBuscar = document.getElementById("inputBuscar");

const columnas = [
  // ... tus columnas ...
  { clave: "codigoInsumo", texto: "Código de Insumo" }, 
  { clave: "insumo", texto: "Insumo" },
  { clave: "destinatario", texto: "Destinatario" },
  { clave: "fecha", texto: "Fecha" },
  { clave: "estado", texto: "Estado" },
];



/* boton con confirmación para Devolver (usamos idTransaccion) */
function confirmarDevolucion(idTransaccion, insumoNombre) {
    Swal.fire({
        title: "¿Seguro de devolver?",
        html: `Vas a marcar como devuelto el insumo <strong>${insumoNombre}</strong>.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28a745", 
        cancelButtonColor: "#dc3545", 
        confirmButtonText: "Sí, devolver",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            marcarComoDevuelto(idTransaccion);
            renderizarTablas();
            Swal.fire({
                title: "¡Devuelto!",
                text: `El insumo ${insumoNombre} ha sido marcado como devuelto.`,
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
        }
    });
}

/** boton de confirmación para Marcar Moroso (usamo idTransaccion) */
function confirmarMoroso(idTransaccion, insumoNombre) {
    Swal.fire({
        title: "¿Marcar como Moroso?",
        html: `Vas a marcar el préstamo de <strong>${insumoNombre}</strong> como moroso.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28a745", 
        cancelButtonColor: "#dc3545",
        confirmButtonText: "Sí, Marcar Moroso",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            actualizarEstadoPrestamo(idTransaccion, "moroso");
            renderizarTablas();
            Swal.fire({
                title: "¡Moroso!",
                text: `${insumoNombre} ha sido movido a la sección de Morosos.`,
                icon: "info",
                timer: 2000,
                showConfirmButton: false
            });
        }
    });
}


function renderizarTablas() {
  const { activos, morosos, devueltos } = obtenerPrestamosPorEstado();

  const textoBusqueda = inputBuscar.value.trim().toLowerCase();

  // filtra solo por destinatario
  function filtrarPorDestinatario(lista) {
    if (textoBusqueda === "") return lista;
    return lista.filter(p => 
      p.destinatario && p.destinatario.toLowerCase().includes(textoBusqueda)
    );
  }

  const activosFiltrados = filtrarPorDestinatario(activos);
  const morososFiltrados = filtrarPorDestinatario(morosos);
  const devueltosFiltrados = filtrarPorDestinatario(devueltos);

  // Limpiar contenedores
  contenedorActivos.innerHTML = "";
  contenedorMorosos.innerHTML = "";
  contenedorHistorial.innerHTML = "";
  
  // ACTIVOS
  if (activosFiltrados.length > 0) {
    contenedorActivos.appendChild(
      crearTablaGeneral(activosFiltrados, columnas, {
        acciones: (prestamo) => {
          const div = document.createElement("div");
          div.className = "btn-group btn-group-sm";

          const btnDevolver = document.createElement("button");
          btnDevolver.className = "btn btn-success btn-sm";
          btnDevolver.textContent = "Marcar devuelto";
          btnDevolver.addEventListener("click", () => {
            confirmarDevolucion(prestamo.idTransaccion, prestamo.insumo); 
          });

          const btnMoroso = document.createElement("button");
          btnMoroso.className = "btn btn-warning btn-sm";
          btnMoroso.textContent = "Marcar moroso";
          btnMoroso.addEventListener("click", () => {

            confirmarMoroso(prestamo.idTransaccion, prestamo.insumo); 
          });

          div.append(btnDevolver, btnMoroso);
          return div;
        },
      })
    );
  } else {
    contenedorActivos.innerHTML = "<p class='text-muted text-center'>No hay préstamos activos.</p>";
  }

  // MOROSOS
if (morososFiltrados.length > 0) {
  const tablaMorosos = crearTablaGeneral(morososFiltrados, columnas, {
    acciones: function (prestamo) {
      const btnDevolver = document.createElement("button");
      btnDevolver.className = "btn btn-success btn-sm";
      btnDevolver.textContent = "Marcar devuelto";

      btnDevolver.addEventListener("click", function () {
        confirmarDevolucion(prestamo.idTransaccion, prestamo.insumo);
      });

      return btnDevolver;
    }
  });

  contenedorMorosos.appendChild(tablaMorosos);
} else {
  contenedorMorosos.innerHTML = "<p class='text-muted text-center'>No hay préstamos morosos.</p>";
}


  // HISTORIAL
  if (devueltosFiltrados.length > 0) {
    contenedorHistorial.appendChild(crearTablaGeneral(devueltosFiltrados, columnas));
  } else {
    contenedorHistorial.innerHTML = "<p class='text-muted text-center'>No hay historial de préstamos devueltos.</p>";
  }
}

// Renderizar al cargar
renderizarTablas();

// Evento de búsqueda
inputBuscar.addEventListener("input", () => {
  renderizarTablas();
});