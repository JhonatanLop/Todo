// requisição get para trazer as tasks do banco de dados
fetch('http://localhost:8080/task') // Substitua pelo seu endpoint real
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao obter os dados');
        }
        return response.json();
    })
    .then(data => {
        // Manipular os dados recebidos do backend
        console.log(data); // Exemplo: Mostrar os dados no console
        // Aqui você pode manipular os dados e atualizar a página conforme necessário
    })
    .catch(error => {
        console.error('Erro de requisição:', error);
        // Tratar o erro, por exemplo, exibir uma mensagem de erro na página
    });