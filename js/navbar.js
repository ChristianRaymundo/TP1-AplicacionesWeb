// array con titulos y links de las paginas
const paginas = [
    { titulo: "Inicio", link: "index.html" },
    { titulo: "Empanadas", link: "pages/categoria1.html" },
    { titulo: "Pizzas", link: "pages/categoria2.html" },
    { titulo: "Papas", link: "pages/categoria3.html" }
];

// funcion para generar la navbar
function generarNavbar() {
    const nav = document.querySelector(".navbar");
    if (!nav) return; // si no hay navbar en la página, salir (login y registro)

// detecta si estamos dentro de /pages/ para ajustar basePath
    const dentroDePages = window.location.pathname.includes("/pages/");
    const basePath = dentroDePages ? "../" : "";

    let html = `
        <div class="logo">
            <a href="${basePath}index.html">
                <img src="${basePath}assets/imagenes/logo-roti.png" alt="Logo La Colonia">
                <span>La Colonia</span>
            </a>
        </div>
        <ul class="nav-links">
    `;

    // generar los links dinamicos
    paginas.forEach(p => {
        html += `<li><a href="${basePath}${p.link}">${p.titulo}</a></li>`;
    });

    // si está logueado muestro el botón de cerrar sesión
    if (localStorage.getItem("usuarioLogueado")) {
        html += `<li><button onclick="logoutUser()" class="logout-btn">Cerrar sesión</button></li>`;
    }

    html += `</ul>`;

    nav.innerHTML = html;
}

// espera a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", generarNavbar);