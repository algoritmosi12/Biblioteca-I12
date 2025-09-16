const usuarios = [
    {
        "codigo" : codigoUsuario, // primary key // integer (12)
        "dni" : dniUsuario, // integer (8)
        "nombreYApellido" : nombreYApellidoUsuario, // string (50)
        "email" : emailUsuario, // string (40)
        "cargo" : cargoUsuario, // string (15)
        "contrasena" : contrasenaUsuario, // string (12)
        "active" : active // string (4)
    }
];

const insumo = [
    {
        "codigo" : codigoInsumo, // primary key // integer (12)
        "familia" : familiaInsumo,  // string (50)
        "nombre" : nombreInsumo, // string (50)
        "estado" : estadoInsumo, // string (12)
        "categoria" : categoriaInsumo, // string (50)
        "cantidad" : cantidadInsumo, // integer (5)
    },
];

const prestamo = [
    {
        "codigo" : codigoPrestamo, // primary key // integer (12)
        "fecha" : fechaPrestamo, // date
        "insumo" : codigoInsumo, // integer (12)
        "cantidad" : cantidadPrestamo, // integer (5)
        "destinatario" : destinatario, // string (50)
        "fechaLimite" : fechaLimite, // date
    }
];

const destinatario = [
    {
        "codigo" : codigoDestinatario, // primary key // integer (12)
        "nombreYApellido" : nombreYApellidoDestinatario, // // string (50)
        "cargo" : cargoDestinatario // string (15)
    }
];