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