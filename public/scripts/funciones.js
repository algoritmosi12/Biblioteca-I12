// funciones.js

export function crearTablaGeneral(datos, columnas, opciones) {
  const seleccionar = opciones && opciones.seleccionar;
  const acciones = opciones && opciones.acciones;

  const tabla = document.createElement("table");
  tabla.className = "table table-hover align-middle";

  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const trHead = document.createElement("tr");

  // Encabezado de "Seleccionar"
  if (seleccionar) {
    const th = document.createElement("th");
    th.textContent = "Seleccionar";
    trHead.appendChild(th);
  }

  // Encabezados de columnas
  for (let i = 0; i < columnas.length; i++) {
    const th = document.createElement("th");
    th.textContent = columnas[i].texto;
    trHead.appendChild(th);
  }

  // Encabezado de "Acciones"
  if (acciones) {
    const th = document.createElement("th");
    th.textContent = "Acciones";
    trHead.appendChild(th);
  }

  thead.appendChild(trHead);

  // Filas de datos
  for (let i = 0; i < datos.length; i++) {
    const tr = document.createElement("tr");
    const item = datos[i];

    if (seleccionar) {
      const td = document.createElement("td");
      const check = document.createElement("input");
      check.type = "checkbox";
      td.appendChild(check);
      tr.appendChild(td);
    }

    for (let j = 0; j < columnas.length; j++) {
      const td = document.createElement("td");
      const clave = columnas[j].clave;
      td.textContent = item[clave] || "";
      tr.appendChild(td);
    }

    if (acciones) {
      const td = document.createElement("td");
      td.appendChild(acciones(item));
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }

  tabla.appendChild(thead);
  tabla.appendChild(tbody);
  return tabla;
}

// -----------------------------------------------------------------------

export function buscarInsumo(insumos, valor) {
  const texto = valor.trim().toLowerCase();
  if (texto === "") {
    return insumos;
  }

  const resultado = [];

  for (let i = 0; i < insumos.length; i++) {
    const insumo = insumos[i];
    let nombre = "";
    if (insumo.nombre) {
      nombre = insumo.nombre.toLowerCase();
    }

    if (nombre.includes(texto)) {
      resultado.push(insumo);
    }
  }

  return resultado;
}

// -----------------------------------------------------------------------

export function filtrarTabla(insumos, texto) {
  const termino = texto.toLowerCase();
  const filtrados = [];

  for (let i = 0; i < insumos.length; i++) {
    const insumo = insumos[i];

    let nombre = "";
    let categoria = "";
    let estado = "";

    if (insumo.nombre) {
      nombre = insumo.nombre.toLowerCase();
    }
    if (insumo.categoria) {
      categoria = insumo.categoria.toLowerCase();
    }
    if (insumo.estado) {
      estado = insumo.estado.toLowerCase();
    }

    if (
      nombre.includes(termino) ||
      categoria.includes(termino) ||
      estado.includes(termino)
    ) {
      filtrados.push(insumo);
    }
  }

  return filtrados;
}