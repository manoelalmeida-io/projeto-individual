var pokemons = [];
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

        preencherTabela(pokemons);
    }
}

function consultaBanco() {

    fetch(`/tipos`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                for (i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];

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

    fetch(`/pokemons`, { cache: 'no-store' }).then(function (response) {
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
                            "idpokemon": id,
                            "nome": nome,
                            "hp": hp,
                            "atk": atk,
                            "def": def,
                            "spAtk": spAtk,
                            "spDef": spDef,
                            "vel": vel,
                            "tipo": [],
                            "total": total
                        }
                    );

                    fetch(`/tipos/${id}`, { cache: 'no-store' }).then(function (response) {
                        if (response.ok) {
                            response.json().then(function (resposta) {
            
                                //var tipos = document.getElementsByName('tipo');
            
                                for (let c = 0; c < resposta.length; c++) {
                                    var registro = resposta[c];
            
                                    var found = pokemons.find(element => {
                                        return element.idpokemon == registro.idpokemon;
                                    });
            
                                    found.tipo.push(
                                        {
                                            "idtipo": registro.idtipo,
                                            "nome": registro.nome,
                                            "cor": registro.cor
                                        }
                                    );
                                }

                                if (id == 151) {
                                    
                                    finalizado = true;
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
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados dos Pokémons: ${error.message}`);
    });
}

async function preencherTabela(lista) {
    
    corpoTabela.innerHTML = '';
    var tablerow = '';

    for (var i = 0; i < lista.length; i++) {

        var pokemon = lista[i];

        var id = pokemon.idpokemon;
        var nome = pokemon.nome;
        var hp = pokemon.hp;
        var atk = pokemon.atk;
        var def = pokemon.def;
        var spAtk = pokemon.spAtk;
        var spDef = pokemon.spDef;
        var vel = pokemon.vel;
        var total = pokemon.total;
        var tipos = pokemon.tipo;

        var row = '<tr>';
        row += `<td class="id"><img src="img/pokemons/${fixarCasas(id)}.png">${fixarCasas(id)}</td>`;
        row += `<td>${nome}</td>`;
        row += `<td>`;

        tipos.forEach(element => {
            
            row += `<span class="type" style="background-color: ${element.cor}">${element.nome}</span>`;
        });

        row += `</td>`;

        row += `<td><b>${total}</b></td>`;
        row += `<td>${hp}</td>`;
        row += `<td>${atk}</td>`;
        row += `<td>${def}</td>`;
        row += `<td>${spAtk}</td>`;
        row += `<td>${spDef}</td>`;
        row += `<td>${vel}</td>`;
        row += `<tr>`;
        
        tablerow += row;
    }

    corpoTabela.innerHTML = tablerow;
}

function buscar() {

    var textoPesquisa = pesquisa.value.toLowerCase();

    if (textoPesquisa == '') {
        
        preencherTabela(pokemons);
        return;
    }

    var busca = pokemons.filter(registro => {

        return registro.nome.toLowerCase().includes(textoPesquisa);
    });

    preencherTabela(busca);
}

window.onload = load();