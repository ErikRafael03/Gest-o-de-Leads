function uploadFile() {
  var fileInput = document.getElementById('fileInput');

  // Verifica se um arquivo foi selecionado
  if (!fileInput.files || fileInput.files.length === 0) {
    alert('Por favor, selecione um arquivo!!');
    return;
  }

  // Armazena o arquivo na variável
  var arquivoSelecionado = fileInput.files[0];
  console.log(fileInput, arquivoSelecionado);
  // Cria um objeto FormData e adiciona o arquivo
  var formData = new FormData();
  formData.append('file', arquivoSelecionado);

  console.log(formData);
  // Faz uma requisição AJAX usando o Axios
  axios.post('http://localhost:2000/', formData,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(response => {
      alert('Arquivo enviado com sucesso!');
      console.log(response.data);
      // Adicione aqui qualquer lógica adicional após o envio bem-sucedido
    })
    .catch(error => {
      alert('Erro no envio do arquivo. Por favor, tente novamente.');
      console.error('Erro no envio do arquivo:', error);
    });
}



// const ipconfig = "10.100.7.140"
// const baseURL = `http://${ipconfig}:2000/`

// try {
//   const response = await fetch(baseURL, {
//     method: 'POST',
//     body: formData,
//   });

//   if (!response.ok) {
//     throw new Error('Erro ao enviar o arquivo');
//   }

//   const data = await response.json();
//   console.log('Resposta do servidor: ', data);
//   } catch (error) {
//   console.error('Erro: ', error);
//  }


  
// }
