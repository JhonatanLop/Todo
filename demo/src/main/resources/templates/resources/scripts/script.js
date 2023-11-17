function getDadosDoBackend() {
    fetch('http://localhost:8080/task') // Atualize com a URL correta do seu backend
        .then(response => response.json())
        .then(data => {
            const dadosDiv = document.getElementById('teste');

            // Transforma o objeto JSON em string e exibe na div
            dadosDiv.textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            // Trate possíveis erros
        });
}

window.onload = getDadosDoBackend;
