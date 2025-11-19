// Revisar si estamos dentro de /pages/
const dentroDePages = window.location.href.includes("pages/");
const basePath = dentroDePages ? "../" : "";

// Traer carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Traer productos desde JSON
let productos = [];
fetch(basePath + "assets/productos.json")
  .then(res => res.json())
  .then(data => {
    productos = data;
    mostrarCarrito();
  })
  .catch(err => console.error("Error al cargar productos:", err));

// Función para mostrar carrito
function mostrarCarrito() {
    const cont = document.getElementById("carrito-contenedor");
    cont.innerHTML = "";

    if (carrito.length === 0) {
        cont.innerHTML = `<p style="text-align:center; font-size:18px; margin:20px;">No hay productos en el carrito.</p>`;
        document.getElementById("total-carrito").innerText = "";
        return;
    }

    // Crear encabezado
    const header = document.createElement("div");
    header.classList.add("carrito-header");
    header.innerHTML = `
        <div>Producto</div>
        <div>Precio</div>
        <div>Cantidad</div>
        <div>Subtotal</div>
        <div>Eliminar</div>
    `;
    cont.appendChild(header);

    let total = 0;

    carrito.forEach(item => {
        const producto = productos.find(p => p.id === item.id);
        if (!producto) return;

        // calcular subtotal según múltiplos de docena
        const subtotal = (producto.precio / 12) * item.cantidad;
        total += subtotal;

        const div = document.createElement("div");
        div.classList.add("carrito-item");
        div.innerHTML = `
            <div class="producto-info">
                <img src="${basePath + producto.imagen}" alt="${producto.titulo}">
                <span>${producto.titulo}</span>
            </div>
            <div class="precio">$${producto.precio.toLocaleString("es-AR")}</div>
            <div class="cantidad">
                <input type="number" min="6" step="6" value="${item.cantidad}" data-id="${item.id}" class="cantidad-input">
            </div>
            <div class="subtotal">$${subtotal.toLocaleString("es-AR")}</div>
            <div><button class="btn-eliminar" data-id="${item.id}">Eliminar</button></div>
        `;
        cont.appendChild(div);
    });

    // Mostrar total formateado
    document.getElementById("total-carrito").innerText = `Total: $${total.toLocaleString("es-AR")}`;

    agregarListenersCarrito();
}

// Agregar eventos a inputs y botones
function agregarListenersCarrito() {
    document.querySelectorAll(".cantidad-input").forEach(input => {
        input.addEventListener("change", function() {
            const id = parseInt(this.dataset.id);
            let nuevaCant = parseInt(this.value);
            if (isNaN(nuevaCant) || nuevaCant < 6) nuevaCant = 6;

            // asegurar múltiplo de 6
            nuevaCant = Math.ceil(nuevaCant / 6) * 6;

            cambiarCantidad(id, nuevaCant);
        });
    });

    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", function() {
            const id = parseInt(this.dataset.id);
            eliminarDelCarrito(id);
        });
    });
}

// Cambiar cantidad de un producto
function cambiarCantidad(id, nuevaCantidad) {
    const item = carrito.find(i => i.id === id);
    if (!item) return;
    item.cantidad = nuevaCantidad;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// Eliminar producto del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(i => i.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}