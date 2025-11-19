// altaUser.js - Maneja la lógica del formulario de Alta de Usuario
import { alertaExito, alertaError } from './alerts.js';
import {renderizarTablaUsuarios} from './usuarios.js'

import  {obtenerUsuarios, guardarUsuario,CLAVE_USUARIOS, obtenerSiguienteCodigo } from '../bbdd/bd.js';

// ELEMENTOS HTML
const formAltaUsuario = document.getElementById("altaUsuarioForm");
const inputNombre = document.getElementById("nombreYApellido");
const inputDni = document.getElementById("dni");
const inputEmail = document.getElementById("email");
const selectCargo = document.getElementById("cargo");
const inputPassword1 = document.getElementById("altaPassword");
const mensajeDiv = document.getElementById("mensaje");
const modalAltaUsuario = new bootstrap.Modal(document.getElementById('modalAltaUsuario'));

//FUNCIONES

// busca si ya existe un usuario con el mismo DNI ( reciclada :) )
function buscarIndicePorDni(array, dni) {
  let i = 0;
  let indice = -1;

  if (array.length === 0) {
    return indice;
  } else {
    do {
      if (array[i].dni === dni) {
        indice = i;
      }
      i++;
    } while (indice === -1 && i < array.length);
  }
  return indice;
}



//EVENTOS

// EVENTO DE ALTA DE USUARIO
formAltaUsuario.addEventListener("submit", (e) => {
  e.preventDefault();
  mensajeDiv.textContent = "";

  const nombreYApellido = inputNombre.value.trim();
  const dni = inputDni.value.trim();
  const email = inputEmail.value.trim();
  const cargo = selectCargo.value;
  const password = inputPassword1.value;

  // Validaciones básicas
  if (password !== dni) {
    mensajeDiv.textContent = "La contraseña debe coincidir con el DNI ingresado.";
    return;
  }

  if (!nombreYApellido || !dni || !email || !cargo || !password) {
    mensajeDiv.textContent = "Por favor, completá todos los campos.";
    return;
  }

  // Obtener usuarios actuales
  const usuarios = obtenerUsuarios();

  // Verificar si ya existe el usuario por DNI
  if (buscarIndicePorDni(usuarios, dni) !== -1) {
    alertaError('Alta Usuario', 'Ya existe un usuario con ese DNI.');
    return;
  }

  // Crear el nuevo usuario
  const nuevoUsuario = {
    codigo: obtenerSiguienteCodigo(CLAVE_USUARIOS),
    dni: dni,
    nombreYApellido: nombreYApellido,
    email: email,
    cargo: cargo,
    passwordSystem: dni,
    active: true,
  };

  // Guardar usuario 
    const usuarioGuardado = guardarUsuario(nuevoUsuario);

if (usuarioGuardado) {
    formAltaUsuario.reset();
    modalAltaUsuario.hide();
    alertaExito('Alta Usuario', `Usuario ${nombreYApellido} registrado con éxito.`);

    renderizarTablaUsuarios();
    
  } else {
    alertaError('Alta Usuario', 'Error al intentar guardar el usuario.');
  }
});