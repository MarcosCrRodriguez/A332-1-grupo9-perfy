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
    showToastMessage();
}

function showToastMessage() {
    const toast = document.getElementById('toast-message');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000); // El mensaje desaparece después de 3 segundos
}

function updateCartStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartDisplay() {
    const cartCounter = document.getElementById('cart-counter');
    if (cartCounter) {
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartCounter.textContent = itemCount;
        
        // Si quieres ocultar el contador cuando es cero:
        if (itemCount === 0) {
            cartCounter.style.display = 'none';
        } else {
            cartCounter.style.display = 'inline';
        }
    } else {
        console.error("Elemento 'cart-counter' no encontrado");
    }
}



document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.card');
        const productName = card.querySelector('.card-title').textContent;
        const price = parseFloat(card.querySelector('.card-text').textContent.replace('Precio - $', ''));
        addToCart(productName, price);
    });
});

// Actualiza el display cuando la página se carga
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
});
