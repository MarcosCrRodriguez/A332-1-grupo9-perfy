const apiUrl = 'https://api.jsonbin.io/v3/b/6691ca72acd3cb34a86553a4';
const apiKey = '$2a$10$M/W5eANQN34xOP01nuf5Du4w783lqxJGA/XMrvt3FxphmgrIQK3nu';

const commentsContainer = document.getElementById("comments-container");
const ratingFilter = document.getElementById("rating-filter");
const averageRatingElement = document.getElementById("average-rating");

let allComments = [];

async function loadComments() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'X-Master-Key': apiKey
            }
        });
        const data = await response.json();  
        allComments = data.record;
        updateAverageRating();
        showComments(allComments);
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

function updateAverageRating() {
    const totalRating = allComments.reduce((sum, comment) => sum + comment.calificacion, 0);
    const averageRating = totalRating / allComments.length;
    averageRatingElement.textContent = `Calificación promedio: ${averageRating.toFixed(1)} ⭐`;
}

function showComments(comentarios) {
    commentsContainer.innerHTML = '';
    comentarios.forEach(comentario => {
        const commentCard = createCommentCard(comentario);
        commentsContainer.appendChild(commentCard);
    });
}

function filterComments() {
    const selectedRating = parseInt(ratingFilter.value);
    if (selectedRating === 0) {
        showComments(allComments);
    } else {
        const filteredComments = allComments.filter(comment => comment.calificacion === selectedRating);
        showComments(filteredComments);
    }
}
function createCommentCard(comentario) {
    const div = document.createElement('div');
    div.className = 'col-md-4 mb-4';

    
    function getEmojiForRating(rating) {
        switch(rating) {
            case 1: return '🙂'; 
            case 2: return '😊'; 
            case 3: return '😄'; 
            case 4: return '😁'; 
            case 5: return '🤩';
            default: return '😊'; 
        }
    }

    const ratingEmoji = getEmojiForRating(comentario.calificacion);

    div.innerHTML = `
        <div class="comment-card">
            <div class="comment-header">
                <div class="comment-avatar">${ratingEmoji}</div>
                <div class="comment-user-info">
                    <h5 class="comment-username">${comentario.email}</h5>
                    <p class="comment-date">${comentario.fechaFormateada}</p>
                </div>
            </div>
            <div class="comment-rating">
                ${'★'.repeat(comentario.calificacion)}${'☆'.repeat(5 - comentario.calificacion)}
            </div>
            <p class="comment-content">${comentario.comentario}</p>
        </div>
    `;
    return div;
}

async function addComment(nuevoComentario) {
    const response = await fetch(apiUrl, {
        headers: {
            'X-Master-Key': apiKey
        }
    });
    const data = await response.json();  
    const comentariosExistentes = data.record;

    comentariosExistentes.push(nuevoComentario);

    const updateResponse = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': apiKey
        },
        body: JSON.stringify(comentariosExistentes)
    });

    if (updateResponse.ok) {
        loadComments();
    } else {
        console.error('Error al agregar el comentario');
    }
}

document.getElementById('formComentario').addEventListener('submit', (e) => {
    e.preventDefault();

    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleDateString('es-ES');

    const nuevoComentario = {
        email: document.getElementById('email').value,
        fechaFormateada,
        calificacion: parseInt(document.getElementById('calificacion').value),
        comentario: document.getElementById('comentario').value
    };

    addComment(nuevoComentario);
    e.target.reset();
});
ratingFilter.addEventListener('change', filterComments);

loadComments();