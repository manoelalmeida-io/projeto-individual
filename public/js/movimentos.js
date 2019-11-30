var movimentos = [];
var finalizado = false;

function load() {
    
    consultaBanco();
    atualizarDados();
}

function atualizarDados() {
    
    if (!finalizado) {
        
        setTimeout(atualizarDados, 1000);
    }
    else {

        preencherTabela(movimentos);
    }
}

function consultaBanco() {

    fetch(`/movimentos/completo`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                for (i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];

                    var id = registro.idmovimento;
                    var nome = registro.nome;
                    var tipo = registro.tipo;
                    var categoria = registro.categoria;
                    var poder = registro.poder == null ? '-' : registro.poder;
                    var precisao = registro.precisao == null ? '-' : registro.precisao;
                    var pp = registro.pp == null ? '-' : registro.pp;
                    var efeito = registro.efeito;
                    var cor = registro.cor;

                    movimentos.push(
                        {
                            "idmovimento": id,
                            "nome": nome,
                            "tipo": tipo,
                            "categoria": categoria,
                            "poder": poder,
                            "precisao": precisao,
                            "pp": pp,
                            "efeito": efeito,
                            "cor": cor
                        }
                    );
                }

                finalizado = true;
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados dos tipos: ${error.message}`);
        });
}

async function preencherTabela(lista) {
    
    corpoTabela.innerHTML = '';
    var tablerow = '';

    for (var i = 0; i < lista.length; i++) {

        var movimento = lista[i];

        var nome = movimento.nome;
        var tipo = movimento.tipo;
        var categoria = movimento.categoria;
        var poder = movimento.poder;
        var precisao = movimento.precisao;
        var pp = movimento.pp;
        var efeito = movimento.efeito;
        var cor = movimento.cor;

        var row = '<tr>';
        row += `<td>${nome}</td>`;
        row += `<td><span class="type" style="background-color: ${cor}">${tipo}</span></td>`;
        row += `<td>${categoria}</td>`;
        row += `<td>${poder}</td>`;
        row += `<td>${precisao}</td>`;
        row += `<td>${pp}</td>`;
        row += `<td>${efeito}</td>`;
        row += `<tr>`;
        
        tablerow += row;
    }

    corpoTabela.innerHTML = tablerow;
}

function buscar() {

    var textoPesquisa = pesquisa.value.toLowerCase();

    if (textoPesquisa == '') {
        
        preencherTabela(movimentos);
        return;
    }

    var busca = movimentos.filter(registro => {

        return registro.nome.toLowerCase().includes(textoPesquisa);
    });

    preencherTabela(busca);
}

window.onload = load();