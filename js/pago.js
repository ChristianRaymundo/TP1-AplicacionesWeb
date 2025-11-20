// abrir modal al presionar "Finalizar compra"
document.getElementById("btn-finalizar").addEventListener("click", function () {
    document.getElementById("modal-pago").style.display = "flex";
});

// procesa formulario de pago y redirige a la pagina de gracias
document.getElementById("form-pago").addEventListener("submit", function (e) {
    e.preventDefault();

    // vaciar carrito
    localStorage.removeItem("carrito");

    // redirigir a pagina de gracias
    window.location.href = "../pages/gracias.html";
});

// funcion para cerrar modal solo con botón
function cerrarModal() {
    document.getElementById("modal-pago").style.display = "none";
}