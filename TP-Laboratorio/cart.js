// cart.js
let cart = JSON.parse(localStorage.getItem('cart')) || [];


function renderCart() {
    const cartItems = document.querySelector('.card-body');
    const summaryContainer = document.querySelector('.card-body:last-child');
    const checkoutButton = document.querySelector('#checkoutButton');
    const checkoutButtonContainer = document.querySelector('#checkoutButtonContainer');
    const cardContainer = document.querySelector('#cardContainer');
    
    
    if (cart.length === 0) {
        // Carrito vacío
        cartItems.innerHTML = `
            <div class="text-center my-5">
                <h3>Tu carrito está vacío</h3>
                <p>¡Agrega algunos productos para comenzar!</p>
                <a href="shop.html" class="btn btn-custom-primary mt-3">Ir a la tienda</a>
            </div>
        `;
        summaryContainer.style.display = 'none'; // Oculta el resumen
        checkoutButton.style.display = 'none'; 
        checkoutButtonContainer.style.display = 'none';
        cardContainer.style.display = 'none';
    } else {
        // Carrito con productos
        summaryContainer.style.display = 'block'; // Muestra el resumen
        checkoutButton.style.display = 'block';
        checkoutButtonContainer.style.display = 'block';
        cardContainer.style.display = 'block';
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
    
            cartItems.innerHTML += `
                <div class="row mb-3">
                    <div class="col-4 col-md-2">
                        <img src="img/perfy-${encodeURIComponent(item.name)}.png" alt="${item.name}" class="img-fluid">
                    </div>
                    <div class="col-8 col-md-4">
                        <h5>${item.name.toUpperCase()}</h5>
                        <p class="text-muted">Precio: $${item.price.toFixed(2)}</p>
                    </div>
                    <div class="col-6 col-md-3 mt-2 mt-md-0">
                        <div class="input-group">
                            <button class="btn btn-custom-secondary" type="button" onclick="changeQuantity(${index}, -1)">-</button>
                            <input type="text" class="form-control text-center quantity-input" value="${item.quantity}" readonly>
                            <button class="btn btn-custom-secondary" type="button" onclick="changeQuantity(${index}, 1)">+</button>
                        </div>
                    </div>
                    <div class="col-4 col-md-2 mt-2 mt-md-0 text-end">
                        <strong>$${itemTotal.toFixed(2)}</strong>
                    </div>
                    <div class="col-2 col-md-1 mt-2 mt-md-0 text-end">
                        <button class="btn btn-light" onclick="removeItem(${index})">X</button>
                    </div>
                </div>
            `;
        });

        updateSummary(total);
    }
}
function changeQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity < 1) {
        cart.splice(index, 1);
    }
    updateCartStorage();
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartStorage();
    renderCart();
}

function updateSummary(total) {
    const summaryBody = document.querySelector('.card-body:last-child');
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    summaryBody.innerHTML = `
    <div class="container">
    
        <h5 class="card-title">RESUMEN</h5>
        <div class="row mb-2">
            <div class="col-8">CANTIDAD DE ELEMENTOS</div>
            <div class="col-4 text-end">${itemCount}</div>
        </div>
        <div class="row mb-2">
            <div class="col-8">SUBTOTAL</div>
            <div class="col-4 text-end">$${total.toFixed(2)}</div>
        </div>
        <div class="row mb-2">
            <div class="col-8">ENVIO</div>
            <div class="col-4 text-end">$0.00</div>
        </div>
        <div class="row fw-bold">
            <div class="col-8">TOTAL</div>
            <div class="col-4 text-end">$${total.toFixed(2)}</div>
        </div>
        </div>
    `;
}

function updateCartStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Inicializar la visualización del carrito
renderCart();