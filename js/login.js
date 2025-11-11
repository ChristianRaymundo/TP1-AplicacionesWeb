                  // redirección si no está logueado
if (!localStorage.getItem("usuarioLogueado")) {
    if (!window.location.href.includes("login.html") &&
        !window.location.href.includes("registro.html")) {
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

    localStorage.setItem("usuario", JSON.stringify({ nombre, apellido, email, password, fechaNacimiento }));
    localStorage.setItem("usuarioLogueado", "true");
    window.location.href = "../index.html";
}

                         // login
function checkLogin() {
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) return;

    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const usuarioIngresado = document.getElementById("usuario").value;
        const claveIngresada = document.getElementById("clave").value;

        const usuario = JSON.parse(localStorage.getItem("usuario"));

        if (usuario && (usuario.email === usuarioIngresado || usuario.nombre === usuarioIngresado) && usuario.password === claveIngresada) {
            localStorage.setItem("usuarioLogueado", "true");
            window.location.href = "index.html";
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    });
}

                         // cerrar sesión
function logoutUser() {
    localStorage.removeItem("usuarioLogueado");

    const dentroDePages = window.location.href.includes("pages/");
    const loginPath = dentroDePages ? "../login.html" : "login.html";

    window.location.href = loginPath;
}