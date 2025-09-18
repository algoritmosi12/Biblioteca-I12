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








// Clave única para localStorage
const STORAGE_KEY = 'datosLocal';

// Función para obtener el array (crea si no existe)
export function obtenerBD() {
    try {
        // Intentar obtener datos existentes
        const datos = localStorage.getItem(STORAGE_KEY);

        // Si no existen, crear array inicial
        if (datos === null) {
            const BBDD = [
                // Usuarios
                {
                    "codigo": 0,
                    "userSystem": "admin",
                    "passwordSystem": "admin",
                    "mailSystem": "admin@gmail.com",
                    "cargo": "admin",
                    "active": true
                },
                {
                    "codigo": 1,
                    "dni": "12345678",
                    "nombreYApellido": "Carlos Gómez",
                    "email": "carlos.gomez@example.com",
                    "cargo": "admin",
                    "passwordSystem": "pass1234",
                    "active": true,
                    "tipo": "usuario"
                },
                {
                    "codigo": 2,
                    "dni": "87654321",
                    "nombreYApellido": "María López",
                    "email": "maria.lopez@example.com",
                    "cargo": "operador",
                    "passwordSystem": "clave5678",
                    "active": false,
                    "tipo": "usuario"
                },
                {
                    "codigo": 3,
                    "familia": "Electrónica",
                    "nombre": "Multímetro Digital",
                    "estado": "Disponible",
                    "categoria": "Herramientas",
                    "cantidad": 15,
                    "active": true,
                    "tipo": "insumo"
                },
                {
                    "codigo": 4,
                    "familia": "Oficina",
                    "nombre": "Resma de papel A4",
                    "estado": "Agotado",
                    "categoria": "Papelería",
                    "cantidad": 0,
                    "active": true,
                    "tipo": "insumo"
                },
                {
                    "codigo": 5,
                    "fecha": "2025-09-10",
                    "insumo": 3,
                    "cantidad": 2,
                    "destinatario": 7,
                    "fechaLimite": "2025-09-20",
                    "active": true,
                    "tipo": "prestamo"
                },
                {
                    "codigo": 6,
                    "fecha": "2025-09-12",
                    "insumo": 4,
                    "cantidad": 5,
                    "destinatario": 8,
                    "fechaLimite": "2025-09-25",
                    "active": true,
                    "tipo": "prestamo"
                },
                {
                    "codigo": 7,
                    "nombreYApellido": "Luis Fernández",
                    "cargo": "Profesor",
                    "active": true,
                    "tipo": "destinatario"
                },
                {
                    "codigo": 8,
                    "nombreYApellido": "Ana Martínez",
                    "cargo": "Estudiante",
                    "active": true,
                    "tipo": "destinatario"
                },
                {
                    "codigo": 9,
                    "dni": "44556677",
                    "nombreYApellido": "Pedro Sánchez",
                    "email": "pedro.sanchez@example.com",
                    "cargo": "supervisor",
                    "passwordSystem": "sup2025",
                    "active": true,
                    "tipo": "usuario"
                },
                {
                    "codigo": 10,
                    "familia": "Laboratorio",
                    "nombre": "Microscopio Óptico",
                    "estado": "En reparación",
                    "categoria": "Instrumentos",
                    "cantidad": 3,
                    "active": true,
                    "tipo": "insumo"
                },
                {
                    "codigo": 11,
                    "fecha": "2025-09-15",
                    "insumo": 10,
                    "cantidad": 1,
                    "destinatario": 12,
                    "fechaLimite": "2025-09-30",
                    "active": true,
                    "tipo": "prestamo"
                },
                {
                    "codigo": 12,
                    "nombreYApellido": "Claudia Ramírez",
                    "cargo": "Investigadora",
                    "active": true,
                    "tipo": "destinatario"
                },
                {
                    "codigo": 13,
                    "dni": "99887766",
                    "nombreYApellido": "Sofía Torres",
                    "email": "sofia.torres@example.com",
                    "cargo": "secretaria",
                    "passwordSystem": "sof12345",
                    "active": true,
                    "tipo": "usuario"
                },
                {
                    "codigo": 14,
                    "familia": "Construcción",
                    "nombre": "Taladro Eléctrico",
                    "estado": "Disponible",
                    "categoria": "Herramientas",
                    "cantidad": 7,
                    "active": true,
                    "tipo": "insumo"
                },
                {
                    "codigo": 15,
                    "fecha": "2025-09-17",
                    "insumo": 14,
                    "cantidad": 1,
                    "destinatario": 16,
                    "fechaLimite": "2025-09-28",
                    "active": true,
                    "tipo": "prestamo"
                },
                {
                    "codigo": 16,
                    "nombreYApellido": "Diego Castro",
                    "cargo": "Técnico",
                    "active": true,
                    "tipo": "destinatario"
                },
                {
                    "codigo": 17,
                    "dni": "55443322",
                    "nombreYApellido": "Lucía Herrera",
                    "email": "lucia.herrera@example.com",
                    "cargo": "analista",
                    "passwordSystem": "lucia2025",
                    "active": true,
                    "tipo": "usuario"
                },
                {
                    "codigo": 18,
                    "familia": "Informática",
                    "nombre": "Laptop Dell",
                    "estado": "Prestado",
                    "categoria": "Equipos",
                    "cantidad": 10,
                    "active": true,
                    "tipo": "insumo"
                },
                {
                    "codigo": 19,
                    "fecha": "2025-09-16",
                    "insumo": 18,
                    "cantidad": 2,
                    "destinatario": 20,
                    "fechaLimite": "2025-09-27",
                    "active": true,
                    "tipo": "prestamo"
                },
                {
                    "codigo": 20,
                    "nombreYApellido": "Elena Ruiz",
                    "cargo": "Alumna",
                    "active": true,
                    "tipo": "destinatario"
                }




            ];
            guardarArray(BBDD); // Guardar array inicial
            return BBDD;
        }

        // Convertir JSON a array
        return JSON.parse(datos);

    } catch (error) {
        console.error('Error al obtener array:', error);
        return []; // Devolver array vacío en caso de error
    }
}


// Función para guardar nuevo elemento
export function guardarElemento(elemento) {
    try {
        // Obtener array actual
        const arrayActual = obtenerBD();
        // Agregar nuevo elemento al array
        arrayActual.push(elemento);
        // Guardar array completo
        guardarArray(arrayActual);


        return elemento; // Devolver el elemento guardado

    } catch (error) {
        console.error('Error al guardar elemento:', error);
        throw error; // Relanzar el error
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


export function obtenerSiguienteCodigo() {
    const BBDD = obtenerBD(); // Obtener la base de datos completa

    if (BBDD.length === 0) return 0; // Si la base está vacía, empezamos desde 1

    // Obtener el código más alto de todos los registros
    const maxCodigo = Math.max(...BBDD.map(item => item.codigo));
    

    // Retornar el siguiente código
    return maxCodigo + 1;
}