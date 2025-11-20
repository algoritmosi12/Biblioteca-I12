

const CLAVE_INSUMOS = "insumos";
const CLAVE_PRESTAMOS = "prestamos";
export const CLAVE_USUARIOS = "usuarios";
const CLAVE_DESTINATARIOS = "destinatarios";

// BASE DE DATOS LOCAL


export function guardarArray(array, clave) {
  const datosString = JSON.stringify(array);
  localStorage.setItem(clave, datosString);
  return true;
}

export function obtenerArray(clave) {

  const datos = JSON.parse(localStorage.getItem(clave));
  console.log(datos);
  return datos ? datos : [];
}

// FUNCIÓN 1: CÓDIGO ALEATORIO (Para IDs de PRÉSTAMOS y Inicialización de Admin)
export function obtenerCodigo() {
  // Genera un ID de transacción aleatorio y único (para la gestión del préstamo)
  return Math.floor(Math.random() * 1000000);
}


// FUNCIÓN 2: CÓDIGO INCREMENTAL (Solo para Insumos, Usuarios y Destinatarios)
export function obtenerSiguienteCodigo(clave) {
  const elementos = obtenerArray(clave)
  let maxCodigo = 0; // Inicializamos con 0
  if (elementos.length > 0) {
    maxCodigo = elementos[elementos.length - 1].codigo
  }
  return maxCodigo + 1;
}



// INSUMOS


export function obtenerInsumos() {
  let insumos = obtenerArray(CLAVE_INSUMOS);
  if (insumos.length === 0) {
    insumos = [
      { codigo: 1, nombre: "Zapatilla", estado: "Disponible", observacion: "" },
      { codigo: 2, nombre: "Zapatilla", estado: "Disponible", observacion: "" },
      { codigo: 3, nombre: "Borrador", estado: "Fuera de Servicio", observacion: "Daño por calor" },
      { codigo: 4, nombre: "Casco", estado: "Disponible", observacion: "" },
    ];
    guardarArray(insumos, CLAVE_INSUMOS);
  }
  return insumos;
}

export function guardarInsumo(nuevoInsumo) {
  const insumos = obtenerInsumos();
  nuevoInsumo.codigo = obtenerSiguienteCodigo(CLAVE_INSUMOS); // <-- Usa el INCREMENTAL
  insumos.push(nuevoInsumo);
  guardarArray(insumos, CLAVE_INSUMOS);
  return nuevoInsumo;
}

export function actualizarInsumo(insumoActualizado) {
  console.log(insumoActualizado);
  let insumos = obtenerInsumos();
  let index = -1;
  let i = 0;
  // Buscar el índice del insumo por su código
  while (index === -1 && i < insumos.length) {
    if (insumos[i].codigo == insumoActualizado.codigo) {
      index = i;
    }
    i++;
  }

  // Si se encontró el insumo, actualizar sus datos
  if (index !== -1) {
    let insumo = insumos[index];

    // Actualizar campo por campo (sin for...in)
    if (insumoActualizado.nombre !== undefined) {
      insumo.nombre = insumoActualizado.nombre;
    }
    if (insumoActualizado.estado !== undefined) {
      insumo.estado = insumoActualizado.estado;
    }
    if (insumoActualizado.observacion !== undefined) {
      insumo.observacion = insumoActualizado.observacion;
    }

    insumos[index] = insumo;
    guardarArray(insumos, CLAVE_INSUMOS);
    return true;
  }
  return false;
}

export function eliminarInsumo(codigo) {
  let insumos = obtenerInsumos();
  const insumosFiltrados = insumos.filter(i => i.codigo != codigo);
  console.log(insumosFiltrados);
  guardarArray(insumosFiltrados, CLAVE_INSUMOS);
  return insumosFiltrados.length !== insumos.length;
}







// PRÉSTAMOS



export function obtenerPrestamos() {
  let prestamos = obtenerArray(CLAVE_PRESTAMOS);
  if (prestamos.length === 0) {
    guardarArray([], CLAVE_PRESTAMOS);
    prestamos = [];
  }
  return prestamos;
}

export function guardarPrestamo(prestamo) {
  const prestamos = obtenerPrestamos();

  // 1. Asigna el ID de la TRANSACCIÓN (el ID ÚNICO interno)
  prestamo.idTransaccion = obtenerCodigo(); // <-- Usa el código ALEATORIO para ID INTERNO

  // 2. El campo prestamo.codigoInsumo YA CONTIENE el código del insumo físico

  prestamo.estado = prestamo.estado || "activo";
  prestamos.push(prestamo);
  guardarArray(prestamos, CLAVE_PRESTAMOS);
  return prestamo;
}

/** Actualiza el estado de un préstamo (activo|moroso|devuelto) */
export function actualizarEstadoPrestamo(idTransaccion, nuevoEstado) {
  const prestamos = obtenerPrestamos();
  // Busca por el ID de la transacción
  const index = prestamos.findIndex(p => p.idTransaccion == idTransaccion);
  if (index !== -1) {
    prestamos[index].estado = nuevoEstado;
    guardarArray(prestamos, CLAVE_PRESTAMOS);
    return true;
  }
  return false;
}

/** Marca como devuelto y libera el insumo correspondiente */
export function marcarComoDevuelto(idTransaccion) {
  const prestamos = obtenerPrestamos();
  const insumos = obtenerInsumos();
  // Busca por el ID de la transacción
  const prestamo = prestamos.find(p => p.idTransaccion == idTransaccion);
  if (!prestamo) return false;

  prestamo.estado = "devuelto";

  // Usa el código del insumo guardado en el préstamo para liberarlo.
  const insumo = insumos.find(i => i.codigo == prestamo.codigoInsumo);

  if (insumo) insumo.estado = "Disponible";
  guardarArray(prestamos, CLAVE_PRESTAMOS);
  guardarArray(insumos, CLAVE_INSUMOS);
  return true;
}

/** Devuelve objetos por estado */
export function obtenerPrestamosPorEstado() {
  const prestamos = obtenerPrestamos();
  return {
    activos: prestamos.filter(p => p.estado === "activo"),
    morosos: prestamos.filter(p => p.estado === "moroso"),
    devueltos: prestamos.filter(p => p.estado === "devuelto"),
  };
}

/*Marca insumos como Prestado  */
export function actualizarInsumosPrestados(insumosPrestados) {
  let insumos = obtenerInsumos();

  // Recorremos cada insumo prestado
  for (let i = 0; i < insumosPrestados.length; i++) {
    let codigoPrestado = insumosPrestados[i].codigo;

    // Buscamos el insumo con ese código
    for (let j = 0; j < insumos.length; j++) {
      if (insumos[j].codigo == codigoPrestado) {
        insumos[j].estado = "Prestado";
      }
    }
  }
  guardarArray(insumos, CLAVE_INSUMOS);
}


// DESTINATARIOS
export function obtenerDestinatarios() {
  let destinatarios = obtenerArray(CLAVE_DESTINATARIOS);
  if (destinatarios.length === 0) {
    destinatarios = [{ codigo: 1, nombreYApellido: "Sin asignar", cargo: "N/A" }]; // <-- Usa el código ALEATORIO
    guardarArray(destinatarios, CLAVE_DESTINATARIOS);
  }
  return destinatarios;
}

export function guardarDestinatario(destinatario) {
  const destinatarios = obtenerDestinatarios();
  destinatario.codigo = obtenerSiguienteCodigo(CLAVE_DESTINATARIOS); // <-- Usa el INCREMENTAL
  destinatarios.push(destinatario);
  guardarArray(destinatarios, CLAVE_DESTINATARIOS);
  return destinatario;
}



// USUARIOS

export function obtenerUsuarios() {
  let usuarios = obtenerArray(CLAVE_USUARIOS);
  if (usuarios.length === 0) {
    usuarios = [{
      codigo: 1,
      dni: "0000",
      nombreYApellido: "Administrador General",
      email: "admin@isft12.edu.ar",
      cargo: "Admin",
      passwordSystem: "admin",
      active: true,
    }];
    guardarArray(usuarios, CLAVE_USUARIOS);
  }
  return usuarios;
}

export function guardarUsuario(usuario) {
  const usuarios = obtenerUsuarios();
  usuario.codigo = obtenerSiguienteCodigo(CLAVE_USUARIOS); // <-- Usa el INCREMENTAL
  usuarios.push(usuario);
  guardarArray(usuarios, CLAVE_USUARIOS);
  return usuario;
}

export function actualizarUsuario(usuarioActualizado) {
  let usuarios = obtenerUsuarios();
  let index = -1;
  let i = 0;

  // Buscar el índice del usuario por su código
  while (index === -1 && i < usuarios.length) {
    if (usuarios[i].codigo == usuarioActualizado.codigo) {
      index = i;
    }
    i++;
  }
  // Si se encontró el usuario, actualizarlo
  if (index !== -1) {
    let usuario = usuarios[index];

    // Actualiza cada campo 
    if (usuarioActualizado.nombreYApellido !== undefined) {
      usuario.nombreYApellido = usuarioActualizado.nombreYApellido;
    }
    if (usuarioActualizado.email !== undefined) {
      usuario.email = usuarioActualizado.email;
    }
    if (usuarioActualizado.cargo !== undefined) {
      usuario.cargo = usuarioActualizado.cargo;
    }
    if (usuarioActualizado.passwordSystem !== undefined) {
      usuario.passwordSystem = usuarioActualizado.passwordSystem;
    }

    usuarios[index] = usuario;
    guardarArray(usuarios, CLAVE_USUARIOS);
    return true;
  }
  return false;
}

export function eliminarUsuario(codigo) {
  let usuarios = obtenerUsuarios();
  const usuariosFiltrados = usuarios.filter(u => u.codigo != codigo);
  guardarArray(usuariosFiltrados, CLAVE_USUARIOS);
  return usuariosFiltrados.length !== usuarios.length;
}