// const usuarios = [
//     {
//         "codigo" : codigoUsuario, // autoincrement primary key // integer (12)
//         "dni" : dniUsuario, // string (8)
//         "nombreYApellido" : nombreYApellidoUsuario, // string (50)
//         "email" : emailUsuario, // string (40)
//         "cargo" : cargoUsuario, // string (15)
//         "passwordSystem" : passwordSystemUsuario, // string (12)
//         "active" : active // string (4)
//     }
// ];

// const insumo = [
//     {
//         "codigo" : codigoInsumo, // autoincrement // primary key // integer (12)
//         "familia" : familiaInsumo,  // string (50)
//         "nombre" : nombreInsumo, // string (50)
//         "estado" : estadoInsumo, // string (12)
//         "categoria" : categoriaInsumo, // string (50)
//         "cantidad" : cantidadInsumo, // integer (5)
//     },
// ];

// const prestamo = [
//     {
//         "codigo" : codigoPrestamo, // autoincrement // primary key // integer (12)
//         "fecha" : fechaPrestamo, // date
//         "insumo" : codigoInsumo, // integer (12)
//         "cantidad" : cantidadPrestamo, // integer (5)
//         "destinatario" : destinatario, // string (50)
//         "fechaLimite" : fechaLimite, // date
//     }
// ];

// const destinatario = [
//     {
//         "codigo" : codigoDestinatario, // autoincrement // primary key // integer (12)
//         "nombreYApellido" : nombreYApellidoDestinatario, // // string (50)
//         "cargo" : cargoDestinatario // string (15)
//     }
// ];



/*




// clave única para localStorage
const STORAGE_KEY = 'datosLocal';

// función para obtener el array (crea si no existe)
export function obtenerBD() {
    try {
        // Intentar obtener datos existentes
        const datos = localStorage.getItem(STORAGE_KEY);

        // si no existen, crear array inicial
        if (datos === null) {
            const BBDD = [
                // usuarios
                {

                    "userSystem": "admin",
                    "passwordSystem": "admin",
                    "mailSystem": "admin@gmail.com",
                    "cargo": "admin",
                    "active": true
                },

                // insumos

                {
                    "codigo": 16879,
                    "nombre": "Zapatilla",
                    "categoria": "Electrico",
                    "materia": "otro",
                    "cantidad": "4",
                    "estado": "Usado como nuevo",
                    "observacion": "Funciona ",
                    "active": true,
                    "tipo": "insumo"

                },

                {
                    "codigo": 33621,
                    "nombre": "Borrador",
                    "categoria": "Otro",
                    "materia": "otro",
                    "cantidad": "8",
                    "estado": "Fuera de Servicio",
                    "observacion": "Faltan ",
                    "active": false,
                    "tipo": "insumo"
                },

                {
                    "codigo": 12434,
                    "nombre": "Cascos",
                    "categoria": "otro",
                    "materia": "Seguridad e Higiene",
                    "cantidad": "5",
                    "estado": "Disponible",
                    "observacion": "Bien ",
                    "active": true,
                    "tipo": "insumo"
                },
                // prestamos/
            
            

            ];
            guardarArray(BBDD); // guardar array inicial
            return BBDD;
        }

        // convertir JSON a array
        return JSON.parse(datos);

    } catch (error) {
        console.error('Error al obtener array:', error);
        return []; // devolver array vacío en caso de error
    }
}


// función para guardar nuevo elemento
export function guardarElemento(elemento) {
    try {
        // obtener array actual
        const arrayActual = obtenerBD();
        // agregar nuevo elemento al array
        arrayActual.push(elemento);
        // guardar array completo
        guardarArray(arrayActual);


        return elemento; // devolver el elemento guardado

    } catch (error) {
        console.error('Error al guardar elemento:', error);
        throw error; // relanzar el error
    }
}







export function guardarArray(array) {
    try {
        const datosString = JSON.stringify(array);
        localStorage.setItem(STORAGE_KEY, datosString);
        return true;
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
        return false;
    }
}
/////  El codigo puede hacerse de 2 formas la primera el codigo arranca de 1 y va creciendo segun los nuevos añadidos

//export function obtenerSiguienteCodigo() {
//   const BBDD = obtenerBD(); // Obtener la base de datos completa

/// if (BBDD.length === 0) return 0; // Si la base está vacía, empezamos desde 1

// Obtener el código más alto de todos los registros
///const maxCodigo = Math.max(...BBDD.map(item => item.codigo));


// Retornar el siguiente código
///  return maxCodigo + 1;


//// y aca el codigo es un numero aleatorio (faltaria que este codigo sea unico porque puede repetirse, en el caso anterior no porque incrementa sobre el anterior)

export function obtenerSiguienteCodigo() {
    const codigo = Math.floor(Math.random() * 100000);
    return codigo;
};
*/