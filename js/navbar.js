// paginas visibles SOLO para usuarios logueados
const paginasProtegidas = [
    { titulo: "Empanadas", link: "pages/categoria1.html" },
    { titulo: "Pizzas", link: "pages/categoria2.html" },
    { titulo: "Papas", link: "pages/categoria3.html" }
];

// funcion para generar navbar dinamica
function generarNavbar() {
    const nav = document.querySelector(".navbar");
    if (!nav) return;

    // detectar si estamos dentro de /pages/
    const dentroDePages = window.location.pathname.includes("/pages/");
    const basePath = dentroDePages ? "../" : "";

    const usuarioLogueado = sessionStorage.getItem("usuarioLogueado");

    let html = `
        <div class="logo">
            <a href="${basePath}index.html">
                <img src="${basePath}assets/imagenes/logo-roti.png" alt="Logo La Colonia">
                <span>La Colonia</span>
            </a>
        </div>
        <ul class="nav-links">
    `;

    // boton de INICIO siempre visible
    html += `<li><a href="${basePath}index.html">Inicio</a></li>`;

    // si NO esta logueado mostrar Iniciar sesion + Registrarse
    if (!usuarioLogueado) {
        html += `
            <li><a href="${basePath}login.html">Iniciar sesión</a></li>
            <li><a href="${basePath}pages/registro.html">Registrarse</a></li>
        `;
    }

    // si esta logueado  mostrar categorias + carrito + cerrar sesion
    if (usuarioLogueado) {

        // categorías protegidas
        paginasProtegidas.forEach(p => {
            html += `<li><a href="${basePath}${p.link}">${p.titulo}</a></li>`;
        });

        //  BOTON DEL CARRITO
        html += `
            <li>
                <a href="${basePath}pages/carrito.html" class="carrito-btn">🛒 Carrito</a>
            </li>
        `;

        // boton cerrar sesion
        html += `<li><button onclick="logoutUser()" class="logout-btn">Cerrar sesión</button></li>`;
    }

    html += `</ul>`;
    
    nav.innerHTML = html;
}

// cerrar sesion
function logoutUser() {
    sessionStorage.removeItem("usuarioLogueado");

    const dentroDePages = window.location.pathname.includes("/pages/");
    const basePath = dentroDePages ? "../" : "";

    window.location.href = basePath + "index.html";
}

document.addEventListener("DOMContentLoaded", generarNavbar);