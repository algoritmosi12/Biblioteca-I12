// Cargar datos del localStorage
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []; 
const insumos = JSON.parse(localStorage.getItem("insumos")) || [];
const prestamos = JSON.parse(localStorage.getItem("prestamos")) || [];

// Referencias a los elementos del modal
const selectCategoria = document.getElementById("inputCategoria");
const contenedorInsumos = document.getElementById("contenedorInsumos");
const listaInsumosCheckboxes = document.getElementById("listaInsumosCheckboxes");

// Mostrar datos en los contadores de inicio
document.getElementById("totalInsumos").textContent = insumos.length;
document.getElementById("insumosPrestados").textContent = prestamos.length;

// Contar insumos en reparación
let insumosReparacion = 0;
for (let i = 0; i < insumos.length; i++) {
    if (insumos[i].estado.toLowerCase() == "en reparación") {
        insumosReparacion = insumosReparacion + 1;
    }
}
document.getElementById("insumosReparacion").textContent = insumosReparacion;

// Contar usuarios con préstamos activos
let usuariosActivos = 0;
for (let j = 0; j < prestamos.length; j++) {
    if (prestamos[j].active === true) {
        usuariosActivos = usuariosActivos + 1;
    }
}
document.getElementById("usuariosActivos").textContent = usuariosActivos;

// ---------------------- :) --------------------------------
// Detectar cuando cambia la categoría seleccionada

selectCategoria.addEventListener("change", function() {
    const categoriaSeleccionada = selectCategoria.value;
    listaInsumosCheckboxes.innerHTML = ""; // limpiar lista anterior

    if (categoriaSeleccionada === "") {
        contenedorInsumos.style.display = "none";
        return;
    }

    // Filtrar los insumos que coincidan con la categoría y estén disponibles
    let insumosFiltrados = [];
    for (let i = 0; i < insumos.length; i++) {
        if (insumos[i].categoria === categoriaSeleccionada && insumos[i].estado.toLowerCase() === "nuevo") {
            insumosFiltrados.push(insumos[i]);
        }
    }

    // Mostrar checkboxes si hay insumos disponibles
    if (insumosFiltrados.length > 0) {
        contenedorInsumos.style.display = "block";

        for (let j = 0; j < insumosFiltrados.length; j++) {
            const insumo = insumosFiltrados[j];
            const id = "insumo-" + insumo.codigo;

            const checkboxHTML =
                '<div class="form-check">' +
                '<input class="form-check-input" type="checkbox" value="' + insumo.codigo + '" id="' + id + '">' +
                '<label class="form-check-label" for="' + id + '">' +
                'cod: ' + insumo.codigo + ' ' + insumo.nombre +
                '</label>' +
                '</div>';

            listaInsumosCheckboxes.innerHTML += checkboxHTML;
        }
    } else {
        contenedorInsumos.style.display = "block";
        listaInsumosCheckboxes.innerHTML = "<p class='text-muted'>No hay insumos disponibles en esta categoría.</p>";
    }
});
