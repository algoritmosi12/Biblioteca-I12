let i;

const formulario = document.getElementById("forms");

const parrafo = document.getElementById("parrafo");


formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    let dni = document.getElementById("dni").value;
    let password = document.getElementById("password").value;

    const usuariosBBDD = JSON.parse(localStorage.getItem("usuarios"));

    for (i = 0; i < usuariosBBDD.length; i++) {
        if (usuariosBBDD[i].dni === dni && usuariosBBDD[i].password === password && usuariosBBDD[i].active === true) {
            window.location.href = "home/home.html";
            let usuarioActivo = usuariosBBDD[i].dni;
            localStorage.setItem("usuarioActivo", usuarioActivo);
            break
        }
        else {
            parrafo.textContent = "Usuario o contraseña incorrecta";
        }
    };
});

