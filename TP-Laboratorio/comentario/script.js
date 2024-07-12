const apiUrl = 'https://api.jsonbin.io/v3/b/66917958ad19ca34f886abab';
const apiKey = '$2a$10$sNZLYjuLxN.hrL29yzXdle31WS4a/q7cFSwcwduy382aB11WfnSZO';

const contenedor = document.getElementById("contenedor");

// cargo los comentarios
async function loadComments() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'X-Master-Key': apiKey
            }
        });
        const data = await response.json();  
        //console.log(data.record);

        showComments(data.record);
        
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}
function showComments(comentarios){
    // let comentarios = [];
   
        comentarios.forEach(comentario => {
            // Crea elementos HTML para mostrar cada atributo
            const div = document.createElement('div');
            div.classList.add('comment-box');

            const emailElement = document.createElement('p');
            emailElement.textContent = `Email: ${comentario.email}`;

            const fechaElement = document.createElement('p');
            fechaElement.textContent = `Fecha: ${comentario.fechaFormateada}`;

            const calificacionElement = document.createElement('p');
            calificacionElement.textContent = `Calificación: ${comentario.calificacion}`;

            const comentarioElement = document.createElement('p');
            comentarioElement.textContent = `Comentario: ${comentario.comentario}`;

            // Agrega los elementos al contenedor principal
            div.appendChild(emailElement);
            div.appendChild(fechaElement);
            div.appendChild(calificacionElement);
            div.appendChild(comentarioElement);

            contenedor.appendChild(div);
        });           
        //contenedor.innerHTML = comentarios;

}

//agregar comentario

async function addComment(nuevoComentario) {
    //traigo comentarios
    const response = await fetch(apiUrl, {
        headers: {
            'X-Master-Key': apiKey
        }
    });
    const data = await response.json();  
    //console.log(data.record);
    const comentariosExistentes = data.record;

    //agrego comentarios
    comentariosExistentes.push(nuevoComentario)

    const updateResponse = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': apiKey
        },
        body: JSON.stringify(comentariosExistentes)
    });

    if (updateResponse.ok) {
        loadComments(); // Actualizar los comentarios después de agregar uno nuevo
    } else {
        console.error('Error al agregar el comentario');
    }
}

document.getElementById('formComentario').addEventListener('submit', (e) => {
    e.preventDefault();

        const fechaActual = new Date();

        // Obtener los componentes de la fecha
        const dia = String(fechaActual.getDate()).padStart(2, '0'); // Día con dos dígitos
        const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Mes con dos dígitos (los meses empiezan en 0)
        const año = fechaActual.getFullYear(); // Año

        // Formatear la fecha en formato día/mes/año
        const fechaFormateada = `${dia}/${mes}/${año}`;
        console.log(fechaFormateada);
        // Mostrar la fecha en el documento HTML
        //document.getElementById('fecha').textContent = `Fecha Actual: ${fechaFormateada}`;

        const nuevoComentario = {
        email: document.getElementById('email').value,
        fechaFormateada,
        calificacion: document.getElementById('calificacion').value,
        comentario: document.getElementById('comentario').value
        };

    addComment(nuevoComentario);
});

loadComments();