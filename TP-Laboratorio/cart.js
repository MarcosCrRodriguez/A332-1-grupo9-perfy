// cart.js
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
    const cartBody = document.querySelector('.card-body');
    cartBody.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartBody.innerHTML += `
            <div class="row align-items-center mb-3">
                <div class="col-md-2 col-4">
                    <img src="img/perfy-${encodeURIComponent(item.name)}.png" alt="${item.name}" class="img-fluid">
                </div>
                <div class="col-md-4 col-8">
                    <h5>${item.name}</h5>
                    <p class="text-muted">Precio: $${item.price.toFixed(2)}</p>
                </div>
                <div class="col-md-3 col-6 mt-2">
                    <div class="input-group">
                        <button class="btn btn-custom-secondary" type="button" onclick="changeQuantity(${index}, -1)">-</button>
                        <input type="text" class="form-control text-center quantity-input" value="${item.quantity}" readonly>
                        <button class="btn btn-custom-secondary" type="button" onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <div class="col-md-2 col-4 mt-2 text-end">$${itemTotal.toFixed(2)}</div>
                <div class="col-md-1 col-2 mt-2 text-end">
                    <button class="btn btn-light" onclick="removeItem(${index})"><i class="bi bi-x-circle"></i>X</button>
                </div>
            </div>
        `;
    });

    updateSummary(total);
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