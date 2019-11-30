var movimentos = data.movimentos;
var contador = 0;

async function load() {

    await fetch(`/movimentos`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                for (i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];

                    var nome = registro.nome;
                    var tipo = registro.fktipo;
                    var categoria = registro.fkcategoria;
                    var poder = registro.poder;
                    var precisao = registro.precisao;
                    var pp = registro.pp;
                    var efeito = registro.efeito;

                    var row = '<tr>';
                    row += `<td>${nome}</td>`;
                    row += `<td>${tipo}</td>`;
                    row += `<td>${categoria}</td>`;
                    row += `<td>${poder}</td>`;
                    row += `<td>${precisao}</td>`;
                    row += `<td>${pp}</td>`;
                    row += `<td>${efeito}</td>`;
                    row += `<tr>`;

                    moveTable.innerHTML += row;
                }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados dos tipos: ${error.message}`);
        });
}

window.onload = load();