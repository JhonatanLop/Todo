document.addEventListener('DOMContentLoaded', () => {
    getDadosDoBackend();
});

function getDadosDoBackend() {
    const dadosDiv = document.getElementById('panel');

    fetch('http://localhost:8080/task')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('card');

                const cardHeader = document.createElement('div');
                cardHeader.classList.add('card_header');

                const title = document.createElement('h4');
                title.textContent = item.name;

                cardHeader.appendChild(title);

                const cardContent = document.createElement('div');
                cardContent.classList.add('card_content');
                cardContent.innerHTML = `
                    <p>${item.description}</p>
                    <p>Prazo: ${item.dueDate ? item.dueDate : 'Não especificado'}</p>
                    <p>Concluída: ${item.completed ? 'Sim' : 'Não'}</p>
                `;

                card.appendChild(cardHeader);
                card.appendChild(cardContent);

                dadosDiv.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            // Trate possíveis erros
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('myModal');
    const btn = document.getElementById('insert_task');
    const span = document.getElementsByClassName('close')[0];

    btn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    span.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', event => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    const form = document.getElementById('taskForm');
    form.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(form);
        const taskData = {
            name: formData.get('name'),
            description: formData.get('description'),
            dueDate: formData.get('dueDate'),
            completed: formData.get('completed') === 'on'
        };

        fetch('http://localhost:8080/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar os dados para o servidor.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Nova tarefa criada:', data);
            modal.style.display = 'none';
            form.reset();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    });
});
