export function alertaExito(titulo, mensaje) {
  Swal.fire({
    icon: "success",
    title: titulo,
    text: mensaje,
    confirmButtonColor: "#30d670ff",
    timer: 2000,
    showConfirmButton: false,
  });
}

export function alertaError(titulo, mensaje) {
  Swal.fire({
    icon: "error",
    title: titulo,
    text: mensaje,
    confirmButtonColor: "rgba(224, 49, 49, 1)",
  });
}

export function alertaAdvertencia(titulo, mensaje) {
  Swal.fire({
    icon: "warning",
    title: titulo,
    text: mensaje,
    confirmButtonColor: "#e54343ff",
  });
}

export async function confirmarAccion(titulo, mensaje) {
  const result = await Swal.fire({
    title: titulo,
    text: mensaje,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#e54343ff",
    cancelButtonColor: "#6c757d",
  });

  return result.isConfirmed;
}

export async function confirmarDevolucion(idTransaccion, insumoNombre) {
  const result = await Swal.fire({
    title: "¿Seguro de devolver?",
    html: `Vas a marcar como devuelto el insumo <strong>${insumoNombre}</strong>.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#28a745",
    cancelButtonColor: "#dc3545",
    confirmButtonText: "Sí, devolver",
    cancelButtonText: "Cancelar"
  });

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
}