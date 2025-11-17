// chequeo si el usuario esta logeado sino lo mando al login
function checkRedirect() {
    const loginPage = window.location.href.includes("login.html");
    const registroPage = window.location.href.includes("registro.html");

    if (!localStorage.getItem("usuarioLogueado") && !loginPage && !registroPage) {
        window.location.href = "login.html";
    }
}

// registrar usuario

function registrarUsuario() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;

    if (!email || !password) {
        alert("Debe completar email y contraseña");
        return;
    }

    // guardamos todos los datos pero login solo validara email + password
    localStorage.setItem("usuario", JSON.stringify({ nombre, apellido, email, password, fechaNacimiento }));

    alert("Registro exitoso. Ahora puedes iniciar sesión.");

    // volvemos al login
    window.location.href = "../login.html";
}

// login

function checkLogin() {
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) return;

    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const emailIngresado = document.getElementById("usuario").value;
        const passwordIngresada = document.getElementById("clave").value;

        const usuario = JSON.parse(localStorage.getItem("usuario"));

        if (usuario && usuario.email === emailIngresado && usuario.password === passwordIngresada) {
            localStorage.setItem("usuarioLogueado", "true");
            window.location.href = "index.html";
        } else {
            alert("Correo o contraseña incorrectos.");
        }
    });
}

// cerrar sesion

function logoutUser() {
    localStorage.removeItem("usuarioLogueado");

    const dentroDePages = window.location.href.includes("pages/");
    const loginPath = dentroDePages ? "../login.html" : "login.html";

    window.location.href = loginPath;
}


// inicializar redirección automatica
document.addEventListener("DOMContentLoaded", function() {
    checkRedirect();
});