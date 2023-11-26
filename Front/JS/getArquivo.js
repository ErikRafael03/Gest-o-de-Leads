function uploadFile() {
  var formData = new FormData();
  var fileInput = document.getElementById('fileInput');

  // Verifica se um arquivo foi selecionado
  if (!fileInput.files || fileInput.files.length === 0) {
    alert('Por favor, selecione um arquivo!!');
    return;
  }

  // Adiciona o arquivo ao objeto FormData
  formData.append('file', fileInput.files[0]);

  // Faz uma requisição AJAX usando o fetch
  fetch('/upload', {
    method: 'POST',
    body: formData,
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na resposta do servidor.');
    }
    return response.text();
  })
  .then(message => {
    alert('Arquivo enviado com sucesso!');
    console.log(message);
    // Adicione aqui qualquer lógica adicional após o envio bem-sucedido
  })
  .catch(error => {
    alert('Erro no envio do arquivo. Por favor, tente novamente.');
    console.error('Erro no envio do arquivo:', error);
  });
}
