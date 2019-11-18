
if (verificar_autenticacao()) {
    
    session_name.innerHTML = `Você está conectado como: <br> ${sessionStorage.nome_usuario_meuapp}`;
    session_options.innerHTML = '<a href="#" onclick="encerrar()">Finalizar sessão </a>';
}
else if (window.location.pathname == '/time.html') {
    
    redirecionar_login();
}

function encerrar() {
    
    finalizar_sessao();
    window.location = 'login.html#login';
}