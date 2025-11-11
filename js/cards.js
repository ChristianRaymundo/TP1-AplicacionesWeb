                        // ajuste de paths según ubicación
const dentroDePages = window.location.href.includes("pages/");
const basePath = dentroDePages ? "../" : "";

                        // array de productos
const productos = [
    // Empanadas
    { categoria: "Empanadas", titulo: "Empanada Árabe", descripcion: "Carne, cebolla y tomate con especias, en masa fina y sabor casero.", precio: 8000, imagen: basePath + "assets/imagenes/empanadas-arabes.png" },
    { categoria: "Empanadas", titulo: "Empanada Criolla", descripcion: "Clásica argentina con carne, cebolla, pimiento y huevo duro.", precio: 8000, imagen: basePath + "assets/imagenes/empanadas-criollas.png" },
    { categoria: "Empanadas", titulo: "Empanada de Jamón y Queso", descripcion: "Jamón cocido y queso fundido, sabor suave y clásico.", precio: 8000, imagen: basePath + "assets/imagenes/empanadas-jamonyqueso.png" },

    // Pizzas
    { categoria: "Pizzas", titulo: "Pizza Muzarella", descripcion: "Clásica pizza con salsa de tomate, abundante queso y orégano.", precio: 6000, imagen: basePath + "assets/imagenes/pizza-muzza.png" },
    { categoria: "Pizzas", titulo: "Pizza con Huevo", descripcion: "Base de muzzarella clásica con huevo rallado por encima, suave y sabrosa.", precio: 6500, imagen: basePath + "assets/imagenes/pizza-huevo.png" },

    // Papas
    { categoria: "Papas", titulo: "Porción de Papas", descripcion: "Papas fritas doradas y crujientes, recién hechas.", precio: 3000, imagen: basePath + "assets/imagenes/papas.png" },
    { categoria: "Papas", titulo: "Porción de Papas con Huevo", descripcion: "Papas fritas mezcladas con huevo revuelto, una combinación clásica y deliciosa.", precio: 5000, imagen: basePath + "assets/imagenes/papas-huevo.png" },
    { categoria: "Papas", titulo: "Porción de Papas con Cheddar", descripcion: "Papas cubiertas con queso cheddar fundido, irresistibles.", precio: 6000, imagen: basePath + "assets/imagenes/papas-cheddar.png" },
    { categoria: "Papas", titulo: "Salchipapa", descripcion: "Porción de papas fritas con salchichas, sabor clásico y casero.", precio: 4000, imagen: basePath + "assets/imagenes/salchipapa.png" }
];

                           // función para generar las cards de productos
function generarCards(categoriaFiltro = null) {
    const contenedor = document.querySelector(".productos");
    if (!contenedor) return;
    contenedor.innerHTML = "";

    const productosFiltrados = categoriaFiltro ? productos.filter(p => p.categoria === categoriaFiltro) : productos;

    productosFiltrados.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${p.imagen}" alt="${p.titulo}">
            <h3>${p.titulo}</h3>
            <p>${p.descripcion}</p>
            <p class="precio">$${p.precio} la docena</p>
            <div class="acciones">
                <input type="number" min="1" value="1" class="cantidad">
                <button class="btn-comprar">Agregar al carrito</button>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

                              // ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.href.includes("categoria1.html")) generarCards("Empanadas");
    else if (window.location.href.includes("categoria2.html")) generarCards("Pizzas");
    else if (window.location.href.includes("categoria3.html")) generarCards("Papas");
});