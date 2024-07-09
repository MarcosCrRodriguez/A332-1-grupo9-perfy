// script.js

let currentIndex = 1; // La tarjeta en el centro inicialmente

function rotateLeft() {
    currentIndex = (currentIndex - 1 + 3) % 3;
    updateCards();
}

function rotateRight() {
    currentIndex = (currentIndex + 1) % 3;
    updateCards();
}

function selectCard(index) {
    console.log("current index:", currentIndex);
    console.log("index:", index);
    if (index === (currentIndex - 1 + 3) % 3) {
        rotateRight();
    }
    else if(index === currentIndex){
        rotateLeft();
    }
}

function updateCards() {
    const cards = document.querySelectorAll('.carousel-container .card');

    cards.forEach((card, i) => {
        const newIndex = (i - currentIndex + 3) % 3;
        
        switch (newIndex) {
            case 0: // Izquierda
                card.style.transform = 'translateX(-60%) scale(0.8)';
                card.style.opacity = 0.7;
                card.style.zIndex = 1;
                break;
            case 1: // Centro
                card.style.transform = 'translateX(0%) scale(1.05)';
                card.style.opacity = 1;
                card.style.zIndex = 2;
                break;
            case 2: // Derecha
                card.style.transform = 'translateX(60%) scale(0.8)';
                card.style.opacity = 0.7;
                card.style.zIndex = 1;
                break;
        }
    });
}

// Inicializar posiciones
updateCards();
