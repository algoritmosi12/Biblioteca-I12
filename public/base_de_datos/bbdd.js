///// RIEGEL - ROMAN - SONIA - LUCAS ///// 
localStorage.clear();  // LIMPIAMOS EL LOCAL STORAGE ANTES DE EJECUTAR CUALQUIER CODIGO


// CREAMOS EL USUARIO ADMIN POR DEFECTO
const usuarios = [
    {
        codigo : 1, // autoincrement primary key // integer (12)
        nombreYApellido : "admin", // string (50)
        dni : "admin", // string (8)
        email : "admin@admin.com", // string (40)
        cargo : "admin", // string (15)
        password : "admin", // string (12)
        active : true // string (4)
    },
    {
        codigo : 2, // autoincrement primary key // integer (12)
        nombreYApellido : "adminss", // string (50)
        dni : "adminss", // string (8)
        email : "adminss@admin.com", // string (40)
        cargo : "admin", // string (15)
        password : "adminss", // string (12)
        active : true // string (4)
    },
 ];
// CREAMOS UN INSUMO DE PRUEBA
 const insumos = [
    {
        "codigo": 1, // autoincrement // primary key // integer (12)
        "nombre": "insumo de prueba",  // string (50)
        "categoria": "Otros", // string (50)
        "familia" : "Control Remoto", // string (50)
        "materia": "Otros", // string (50)
        "cantidad": "1",  // integer (5)
        "estado": "Nuevo", // string (20)
        "observacion": "Este insumo es un insumo de prueba", // string (50)
        "active": true, // boolean (5)
    },
 ]
// CREAMOS UN PRESTAMO DE PRUEBA
 const prestamos = [
    {
        "codigo" : 1, // autoincrement // primary key // integer (12)
        "insumo" : 1, // integer (12)
        "cantidad" : 10, // integer (5)
        "destinatario" : "destinatario de prueba", // string (50)
        "fecha" : "01/10/2025", // date
        "fechaLimite" : "10/10/2025", // date
        "active": true, // boolean (5)
    }
 ]
// CONVERTIMOS EN STRING LOS ARRAY Y SE GUARDA EN LOCALSTORAGE
localStorage.setItem("usuarios",JSON.stringify(usuarios));
localStorage.setItem("insumos",JSON.stringify(insumos));
localStorage.setItem("prestamos",JSON.stringify(prestamos));
