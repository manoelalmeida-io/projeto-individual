let email_usuario;
let nome_usuario;

function redirecionar_login() {
    window.location.href = '../login.html';
}

function verificar_autenticacao() {
    email_usuario = sessionStorage.email_usuario_meuapp;
    nome_usuario = sessionStorage.nome_usuario_meuapp;

    if (email_usuario == undefined) {
        return false;
    } else {
        validar_sessao();
        return true;
    }
}

function logoff() {
    finalizar_sessao();
    sessionStorage.clear();
    redirecionar_login();
}

function validar_sessao() {
    fetch(`/usuarios/sessao/${email_usuario}`, {
        cache: 'no-store'
    })
    .then(resposta => {
        if (resposta.ok) {
            resposta.text().then(texto => {
                console.log('Sessão :) ', texto);
            });
        } else {
            console.error('Sessão :.( ');
            logoff();
        }
    });
}

function finalizar_sessao() {
    fetch(`/usuarios/sair/${email_usuario}`, {
        cache: 'no-store'
    });
}