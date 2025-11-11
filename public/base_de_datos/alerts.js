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