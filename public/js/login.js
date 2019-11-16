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