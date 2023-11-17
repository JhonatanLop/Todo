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

                const deleteButton = document.createElement('button');
                deleteButton.innerHTML = '&#x2715;'; // Ou o ícone de lixo
                deleteButton.classList.add('delete-button');
                deleteButton.addEventListener('click', () => {
                    deleteCard(item.id, card); // Chame a função para excluir o card pelo ID
                });

                cardHeader.appendChild(deleteButton);

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
