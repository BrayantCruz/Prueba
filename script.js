let carrito = [];
let cartCount = 0;

// Agregar productos al carrito
document.querySelectorAll(".producto button").forEach((boton) => {
  boton.addEventListener("click", () => {
    const producto = boton.parentElement;
    const nombre = producto.querySelector("h3").textContent;
    const seleccion = producto.querySelector("select");
    const precio = parseFloat(seleccion.value);
    const opcionTexto = seleccion.options[seleccion.selectedIndex].text;
    
    carrito.push({ nombre, opcion: opcionTexto, precio });
    
    cartCount++;
    document.querySelector(".cart-count").textContent = cartCount;
    
    alert(`${nombre} (${opcionTexto}) añadido al carrito`);
  });
});

// Mostrar carrito
const carritoIcon = document.querySelector('nav ul li a[href="#"]');
if (carritoIcon) {
  carritoIcon.addEventListener("click", () => {
    const modal = document.getElementById("modal-carrito");
    const lista = document.getElementById("lista-carrito");
    const total = document.getElementById("total-carrito");

    lista.innerHTML = "";
    let sumaTotal = 0;

    carrito.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.nombre} - ${item.opcion} - $${item.precio.toFixed(2)}`;
      lista.appendChild(li);
      sumaTotal += item.precio;
    });

    total.textContent = `Total: $${sumaTotal.toFixed(2)}`;
    modal.style.display = "flex";
  });
}

// Finalizar compra
const finalizarCompraBtn = document.getElementById("finalizar-compra");
if (finalizarCompraBtn) {
  finalizarCompraBtn.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    alert("¡Gracias por tu compra!");

    carrito = [];
    cartCount = 0;
    document.querySelector(".cart-count").textContent = cartCount;
    document.getElementById("modal-carrito").style.display = "none";
  });
}

// Manejo de login y usuario
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  const userIcon = document.getElementById('user-icon');
  const userNameDisplay = document.getElementById('user-name');
  const dropdownMenu = document.getElementById('user-dropdown');
  const cerrarSesionBtn = document.getElementById('cerrar-sesion');

  // Si estamos en login.html
  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const nombre = document.getElementById('nombre').value;
      const correo = document.getElementById('correo').value;
      const contraseña = document.getElementById('contraseña').value;

      if (correo && contraseña && nombre) {
        localStorage.setItem('usuarioNombre', nombre);
        window.location.href = 'index.html'; // Redirigir al inicio
      } else {
        alert('Por favor, completa todos los campos.');
      }
    });
  }

  // Mostrar nombre de usuario si ya inició sesión
  const nombreGuardado = localStorage.getItem('usuarioNombre');
  if (nombreGuardado && userNameDisplay) {
    userNameDisplay.textContent = nombreGuardado;
    userNameDisplay.style.display = 'inline-block';
    if (dropdownMenu) {
      dropdownMenu.style.display = 'none'; // Ocultar por defecto
    }
  }

  // Botón cerrar sesión
  if (cerrarSesionBtn) {
    cerrarSesionBtn.addEventListener('click', function() {
      localStorage.removeItem('usuarioNombre');
      window.location.href = 'index.html';
    });
  }

  // Mostrar y ocultar el menú desplegable al hacer clic en el icono o nombre
  if (userIcon && dropdownMenu) {
    userIcon.addEventListener('click', function(event) {
      event.stopPropagation(); // Para no cerrar inmediatamente
      dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    userNameDisplay.addEventListener('click', function(event) {
      event.stopPropagation();
      dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Cerrar el menú si se hace clic fuera
    document.addEventListener('click', function() {
      dropdownMenu.style.display = 'none';
    });
  }
});
