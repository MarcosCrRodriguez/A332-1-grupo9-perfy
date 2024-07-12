const apiUrl = 'https://api.jsonbin.io/v3/b/66917958ad19ca34f886abab';
const apiKey = '$2a$10$sNZLYjuLxN.hrL29yzXdle31WS4a/q7cFSwcwduy382aB11WfnSZO';

const commentsContainer = document.getElementById("comments-container");

async function loadComments() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'X-Master-Key': apiKey
            }
        });
        const data = await response.json();  
        showComments(data.record);
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

function showComments(comentarios) {
    commentsContainer.innerHTML = '';
    comentarios.forEach(comentario => {
        const commentCard = createCommentCard(comentario);
        commentsContainer.appendChild(commentCard);
    });
}

function createCommentCard(comentario) {
    const div = document.createElement('div');
    div.className = 'col-md-4 mb-4';
    div.innerHTML = `
        <div class="comment-card">
            <div class="comment-header">
                <div class="comment-avatar">😊</div>
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

loadComments();