document.addEventListener('DOMContentLoaded', () => {
    getData();
    const searcbutton = document.getElementById('search_button');
    searcbutton.addEventListener('click', () => {
        enviarRequisicao();
    })
}
);

// Função para buscar os dados do backend
function getData(url) {
    const dadosDiv = document.getElementById('panel');

    fetch(url)
        .then(response => response.json())
        .then(data => {
            dadosDiv.innerHTML = ''; // Limpa o painel antes de adicionar novos cards

            data.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('card');

                const cardHeader = document.createElement('div');
                cardHeader.classList.add('card_header');

                const title = document.createElement('h4');
                title.textContent = item.name;

                cardHeader.appendChild(title);

                const deleteButton = document.createElement('button');
                deleteButton.innerHTML = '&#x2715;'; // Ou o ícone de lixo
                deleteButton.classList.add('delete-button');
                deleteButton.addEventListener('click', () => {
                    deleteCard(item.id, card); // Chame a função para excluir o card pelo ID
                });

                cardHeader.appendChild(deleteButton);

                const editButton = document.createElement('button');
                editButton.innerHTML = 'Editar';
                editButton.classList.add('edit-button');
                editButton.addEventListener('click', () => {
                    // abre formulário para edição
                    atualizarTarefa(item.id); // Chame a função para editar a tarefa pelo ID
                });

                cardHeader.appendChild(editButton);

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
        .catch(error => { //crie uma função para atualizar o objeto com base no id. deve-se abrir o mesmo formulário para criação. a função deve 
            console.error('Erro na requisição:', error);
            // Trate possíveis erros
        });
}


function deleteCard(cardId, cardElement) {
    fetch(`http://localhost:8080/task/${cardId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao excluir o card.');
            }
            console.log('Card excluído com sucesso!');
            cardElement.remove(); // Remove o card da interface após a exclusão
        })
        .catch(error => {
            console.error('Erro ao excluir o card:', error);
            // Trate possíveis erros
        });
}



function enviarRequisicao() {
    const input = document.getElementById('search'); // substitua 'inputId' pelo ID do seu input
    const inputValue = input.value;

    fetch(`http://localhost:8080/task/${encodeURIComponent(inputValue)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Dados recebidos:', data);
            getData(`http://localhost:8080/task/${encodeURIComponent(inputValue)}`)
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            // Trate possíveis erros
        });
}

// evento para abrir o formulário de edição
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

getData('http://localhost:8080/task');