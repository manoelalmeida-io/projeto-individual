var local = window.location.hash;
div_cadastro.style.display = 'none';

if (local == '#login') {
    
    div_cadastro.style.display = 'none'
    div_login.style.display = 'block';
}

if (local == '#cadastro') {
    
    div_cadastro.style.display = 'block'
    div_login.style.display = 'none';
}

function cadastro() {
    
    document.title = 'Cadastro';

    div_login.style.display = 'none';
    div_cadastro.style.display = 'block';
}

function login() {
    
    document.title = 'Login';

    div_login.style.display = 'block';
    div_cadastro.style.display = 'none';
}

function entrar() {

    if (login_email.value == data.usuarios[0].email && login_senha.value == data.usuarios[0].senha) {
        
        window.location.href = 'index.html';
    }
    else {
        alert('Usuário ou senha incorretos');
    }
}

function validarCadastro() {
    
    var nome = cadastroNome.value;
    var email = cadastroEmail.value;
    var senha = cadastroSenha.value;

    event.preventDefault();

    if (nome == '') {
        return;
    }
    else if (email == '') {
        return;
    }
    else if (senha == '') {
        return;
    }
    else {
        cadastrar();
    }
}

function cadastrar() {
    
    var formCadastro = new URLSearchParams(new FormData(form_cadastro));

    fetch("/usuarios/cadastrar", {
        method: "POST",
        body: formCadastro
    }).then(resposta => {

        if (resposta.ok) {
            resposta.json().then(json => {

                sessionStorage.nome_usuario_meuapp = json.nome;
                sessionStorage.email_usuario_meuapp = json.email;
                sessionStorage.senha_usuario_meuapp = json.senha;

                window.location.href = 'login.html';
            });

        } else {

            console.log('Erro ao Cadastrar!');

            error2.style.display = "block"

            response.text().then(texto => {
                console.error(texto);
                finalizar_aguardar(texto);
            });
        }
    });

    return false;
}