// reviso si estoy dentro de la carpeta pages para ajustar las rutas
const dentroDePages = window.location.href.includes("pages/");
const basePath = dentroDePages ? "../" : "";

// variable para guardar los productos cargados desde JSON
let productos = [];

/* ================================
          cargar JSON con FETCH
================================ */
fetch(basePath + "assets/productos.json")
    .then(res => {
        if (!res.ok) throw new Error("No se pudo cargar productos.json (status " + res.status + ")");
        return res.json();
    })
    .then(data => {
        productos = data;
        iniciarCards();
    })
    .catch(error => console.error("Error al cargar productos:", error));

/* ================================
      funcion para generar cards
================================ */
function generarCards(categoriaFiltro = null, contenedor = null, cantidad = null) {
    const cont = contenedor || document.querySelector(".productos");
    if (!cont) return;

    cont.innerHTML = ""; // limpio antes de agregar algo nuevo

    let productosFiltrados = categoriaFiltro
        ? productos.filter(p => p.categoria === categoriaFiltro)
        : productos;

    if (cantidad) {
        productosFiltrados = productosFiltrados.slice(0, cantidad);
    }

    // creo cada card
    productosFiltrados.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.href = "#";

        // input de cantidad: si es empanadas, select de múltiplos de 6
        const inputCantidad = p.categoria === "Empanadas"
            ? `<select class="cantidad">
                  <option value="6">6</option>
                  <option value="12">12</option>
                  <option value="18">18</option>
                  <option value="24">24</option>
                  <option value="30">30</option>
               </select>`
            : `<input type="number" class="cantidad" min="1" value="1">`;

        card.innerHTML = `
            <img src="${basePath + p.imagen}" alt="${p.titulo}">
            <h3>${p.titulo}</h3>
            <p>${p.descripcion}</p>
            <p class="precio">$${p.precio.toLocaleString("es-AR")}</p>
            ${p.detallePrecio ? `<p class="detalle-precio">${p.detallePrecio}</p>` : ""}

            <div class="acciones">
                ${inputCantidad}
                <button class="btn-comprar"
                    onclick="agregarAlCarrito(${p.id}, this.previousElementSibling.value)">
                    Agregar al carrito
                </button>
            </div>
        `;
        cont.appendChild(card);
    });
}

/* ==========================================
          funcion para ver que card mostrar
========================================== */
function iniciarCards() {
    const url = window.location.href;

    if (url.includes("categoria1.html")) generarCards("Empanadas");
    else if (url.includes("categoria2.html")) generarCards("Pizzas");
    else if (url.includes("categoria3.html")) generarCards("Papas");
    else if (url.endsWith("index.html") || url === basePath) {
        // productos destacados en la home
        generarCards("Pizzas", document.getElementById("pizzas-destacadas"), 3);
        generarCards("Empanadas", document.getElementById("empanadas-destacadas"), 3);
        generarCards("Papas", document.getElementById("papas-destacadas"), 3);
    }
}

/* ======================================================
      funcion para agregar al carrito
====================================================== */
function agregarAlCarrito(productoId, cantidad) {

    // verificar login
    if (!sessionStorage.getItem("usuarioLogueado")) {
        alert("Debes iniciar sesión para agregar productos al carrito.");
        const loginPath = dentroDePages ? "../login.html" : "login.html";
        window.location.href = loginPath;
        return;
    }

    // obtener carrito actual o crearlo vacío
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    cantidad = parseInt(cantidad);

    // verificar si el producto ya está en el carrito
    const existente = carrito.find(item => item.id === productoId);

    if (existente) {
        // si ya existe, sumo la cantidad
        existente.cantidad += cantidad;
    } else {
        // si no existe, lo agrego nuevo
        carrito.push({
            id: productoId,
            cantidad: cantidad
        });
    }

    // guardar carrito actualizado
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("Producto agregado al carrito.");
}