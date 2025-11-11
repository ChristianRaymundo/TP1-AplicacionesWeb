// Array con títulos y links de las páginas (relativos a la raíz)
const paginas = [
    { titulo: "Inicio", link: "index.html" },
    { titulo: "Empanadas", link: "pages/categoria1.html" },
    { titulo: "Pizzas", link: "pages/categoria2.html" },
    { titulo: "Papas", link: "pages/categoria3.html" }
];

// Función para generar la navbar
function generarNavbar() {
    const nav = document.querySelector(".navbar");
    if (!nav) return; // si no hay navbar en la página, salir

    // Detecta si estamos dentro de /pages/ para ajustar basePath
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

    // Generar links dinámicos
    paginas.forEach(p => {
        html += `<li><a href="${basePath}${p.link}">${p.titulo}</a></li>`;
    });

    // Mostrar Registro o Cerrar sesión según si el usuario está logueado
    if (!localStorage.getItem("usuarioLogueado")) {
        const registroLink = dentroDePages ? "registro.html" : "pages/registro.html";
        html += `<li><a href="${basePath}${registroLink}">Registro</a></li>`;
    } else {
        html += `<li><button onclick="logoutUser()" class="logout-btn">Cerrar sesión</button></li>`;
    }

    html += `</ul>`;

    nav.innerHTML = html;
}

// Espera a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", generarNavbar);