var perfilPadrao = {
    nome: "Usuário",
    senha: 12345
};
function Login() {
    var nomeDigitado = document.getElementById("nome").value;
    var senhaDigitada = document.getElementById("senha").value;
    var cargoSelecionado = document.querySelector('input[name="Gerente"]:checked');

    if (nomeDigitado === perfilPadrao.nome && senhaDigitada === perfilPadrao.senha.toString()) {
        alert("Login bem-sucedido! Bem-vindo, " + perfilPadrao.nome + "!");
        window.location.href = "./painel.html";
    } else {
        alert("Login inválido, Tente novamente!!");
    }
}