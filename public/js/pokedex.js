var pokemons = [];

async function load() {

    await fetch(`/tipos`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                for (i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];

                    // aqui, após 'registro.' use os nomes 
                    // dos atributos que vem no JSON 
                    // que gerou na consulta ao banco de dados

                    type.innerHTML += `<option value="${registro.idtipo}">${registro.nome}</option>`;
                }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados dos tipos: ${error.message}`);
        });

    await fetch(`/pokemons`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                corpoTabela.innerHTML = '';

                for (i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];

                    var id = registro.idpokemon;
                    var nome = registro.nome;
                    var hp = registro.hp;
                    var atk = registro.ataque;
                    var def = registro.defesa;
                    var spAtk = registro.ataqueesp;
                    var spDef = registro.defesaesp;
                    var vel = registro.velocidade;
                    var total = hp + atk + def + spAtk + spDef + vel;

                    pokemons.push(
                        {
                            "id": id,
                            "nome": nome,
                            "hp": hp,
                            "atk": atk,
                            "def": def,
                            "spAtk": spAtk,
                            "spDef": spDef,
                            "vel": vel,
                            "tipo": [],
                            "total": hp + atk + def + spAtk + spDef + vel
                        }
                    );

                    /*var row = '<tr>';
                    row += `<td class="id"><img src="img/pokemons/${fixarCasas(id)}.png">${fixarCasas(id)}</td>`;
                    row += `<td>${nome}</td>`;
                    row += `<td name="tipo"></td>`;
                    row += `<td><b>${total}</b></td>`;
                    row += `<td>${hp}</td>`;
                    row += `<td>${atk}</td>`;
                    row += `<td>${def}</td>`;
                    row += `<td>${spAtk}</td>`;
                    row += `<td>${spDef}</td>`;
                    row += `<td>${vel}</td>`;
                    row += `<tr>`;
                    
                    corpoTabela.innerHTML += row;*/
                }

                colocarTipos(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados dos Pokémons: ${error.message}`);
        });
}

function colocarTipos(pokemons) {

    for (let i = 0; i < pokemons.length; i++) {

        let id = pokemons[i].idpokemon;

        fetch(`/tipos/${id}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {

                    //var tipos = document.getElementsByName('tipo');

                    for (let c = 0; c < resposta.length; c++) {
                        var registro = resposta[c];

                        /*var tipo = document.createElement('span');
                        tipo.classList.add('type');
                        tipo.innerHTML = registro.nome;
                        tipo.style.backgroundColor = registro.cor;
    
                        tipos[i].appendChild(tipo);*/

                        var found = pokemons.find(element => {
                            return element.idpokemon == registro.idpokemon;
                        });

                        found.tipo.push(registro.nome);

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
}

function buscar() {

    var textoPesquisa = pesquisa.value;
    var url;

    if (textoPesquisa.length > 1) {

        url = `/pokemons/buscar/${textoPesquisa}`;
    }
    else {

        url = `/pokemons`;
    }

    fetch(url, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                corpoTabela.innerHTML = '';

                for (i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];

                    var id = registro.idpokemon;
                    var nome = registro.nome;
                    var hp = registro.hp;
                    var atk = registro.ataque;
                    var def = registro.defesa;
                    var spAtk = registro.ataqueesp;
                    var spDef = registro.defesaesp;
                    var vel = registro.velocidade;
                    var total = hp + atk + def + spAtk + spDef + vel;

                    var row = '<tr>';
                    row += `<td class="id"><img src="img/pokemons/${fixarCasas(id)}.png">${fixarCasas(id)}</td>`;
                    row += `<td>${nome}</td>`;
                    row += `<td name="tipo"></td>`;
                    row += `<td><b>${total}</b></td>`;
                    row += `<td>${hp}</td>`;
                    row += `<td>${atk}</td>`;
                    row += `<td>${def}</td>`;
                    row += `<td>${spAtk}</td>`;
                    row += `<td>${spDef}</td>`;
                    row += `<td>${vel}</td>`;
                    row += `<tr>`;

                    corpoTabela.innerHTML += row;
                }

                colocarTipos(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados dos Pokémons: ${error.message}`);
        });
}

window.onload = load();