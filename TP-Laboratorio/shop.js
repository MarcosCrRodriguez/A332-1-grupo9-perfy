// shop.js
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }
    updateCartStorage();
    updateCartDisplay();
}

function updateCartStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartDisplay() {
    const cartIcon = document.getElementById('carrito');
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartIcon.setAttribute('data-count', itemCount);
}

// Agregar event listeners a los botones "Agregar al carrito"
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.card');
        const productName = card.querySelector('.card-title').textContent;
        const price = parseFloat(card.querySelector('.card-text').textContent.replace('Precio - $', ''));
        addToCart(productName, price);
    });
});

// Inicializar la visualización del carrito
updateCartDisplay();