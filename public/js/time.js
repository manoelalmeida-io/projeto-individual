var times = data.times;
var pokemonsData = [];
var times = [];

var pokemons = document.getElementsByClassName("pokemon");
var contador = 0;
var finalizado_pokemons = false;
var finalizado_times = false;

var target;

function load() {
    
    consultaBanco();
    atualizarDados();
}

function atualizarDados() {
    
    var finalizado = finalizado_pokemons && finalizado_times;

    if (!finalizado) {
        
        setTimeout(atualizarDados, 1000);
    }
    else {

        preencherPokemons();
        preencherTimes();
    }
}

function consultaBanco() {
    
    fetch(`/pokemons`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

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

                    pokemonsData.push(
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
            
                                    var found = pokemonsData.find(element => {
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
                                    
                                    finalizado_pokemons = true;
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

    fetch(`/times/${sessionStorage.email_usuario_meuapp}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                var tamanho = resposta.length;

                for (i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];

                    times.push({
                        "id": registro.idtime,
                        "nome": registro.nome,
                        "fkusuario": registro.fkusuario,
                        "pokemons": []
                    });

                    fetch(`/times/pokemons/${registro.idtime}`, { cache: 'no-store' }).then(function (response) {
                        if (response.ok) {
                            response.json().then(function (resposta) {
            
                                for (let c = 0; c < resposta.length; c++) {
                                    var registro = resposta[c];
            
                                    var found = times.find(element => {
                                        return element.id == registro.fktime;
                                    });
            
                                    found.pokemons.push(registro.fkpokemon);
                                }

                                if ((i + 1) >= tamanho) {
                                    finalizado_times = true;
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

                finalizado_pokemons = true;

                if (resposta.length == 0) {
                    
                    finalizado_times = true;
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

function preencherTimes() {
    
    teams.innerHTML = '';

    for (var i = 0; i < times.length; i++) {

        var time = `<div class="team" timeid="${times[i].id}">`;
        time += '<div class="team-pokemons">';

        times[i].pokemons.forEach(element => {
            
            time += `<div style="background-image: url('img/pokemons/${fixarCasas(element)}.png')" idpoke="${element}" class="team-pokemon"></div>`;
        });
    
        time += '</div>';
        time += '<div class="team-info">';
        time += times[i].nome;
        time += '<div class="controls">'
        time += '<img src="img/icons/edit.svg" onclick="editar(this)">';
        time += '<img src="img/icons/delete.svg" onclick="deletar(this)">';
        time += '</div></div></div>';
        teams.innerHTML += time;
    }

    teams.innerHTML += '<div onclick="novo()" class="add-team"></div>';
}

function preencherPokemons() {
    
    for (var i = 0; i < pokemonsData.length; i++) {

        availablePokemons.innerHTML += `<div class="pokemon" idpokemon="${i + 1}" onclick="openModal(this)">${fixarCasas(i + 1)}</div>`;
        pokemons[i].style.backgroundImage = `url("img/pokemons/${fixarCasas(i + 1)}.png")`;
    }
}

/*
while (contador < times.length) {

    var posicaoPokemon = 0;
    var numeroPokemons = times[contador].pokemons.length; 

    var time = `<div class="team" timeid="${times[contador].id}">`;
    time += '<div class="team-pokemons">';

    while (posicaoPokemon < numeroPokemons) {
        
        time += `<div idpoke="${times[contador].pokemons[posicaoPokemon]}" class="team-pokemon"></div>`;
        posicaoPokemon++;
    }

    time += '</div>';
    time += '<div class="team-info">';
    time += times[contador].nome;
    time += '<div class="controls">'
    time += '<img src="img/icons/edit.svg" onclick="editar(this)">';
    time += '<img src="img/icons/delete.svg" onclick="deletar(this)">';
    time += '</div></div></div>';
    teams.innerHTML += time;

    contador++;
}


contador = 0;

var timePokemons = document.getElementsByClassName("team-pokemon");

while (contador < timePokemons.length) {
    
    var pokemon = timePokemons[contador];

    var id = pokemon.getAttribute('idpoke');
    pokemon.style.backgroundImage = `url("img/pokemons/${fixarCasas(id)}.png")`;

    contador++;
}

*/

function adicionar() {

    var e = target;

    if (selectedPokemons.childElementCount < 6) {
        
        // removendo classe selected para não remover a cor de seleção
        e.classList.remove('selected');

        // copiando o pokémon selecionado para a variavel clone
        var clone = e.cloneNode(true);
        clone.setAttribute('onclick', 'remover(this)');
        // movendo o pokémon clonado para a lista dos pokémon selecionados
        selectedPokemons.appendChild(clone);

        // adicionando classe selected novamente para o pokémon
        e.classList.add('selected');

        closeModal();
    }
}

function remover(e) {
    
    // pegando o id do pokemon guardado no atributo idpokemon
    var id = e.getAttribute('idpokemon');

    // setando o atributo idpokemon para '' para que o query selector encontre a outra versão do mesmo pokémon
    e.setAttribute('idpokemon', '');

    // query selector seleciona o pokemon com o atributo idpokemon correspondente
    var pokemon = document.querySelector(`.selected-pokemons [idpokemon='${id}'], .list [idpokemon='${id}']`);

    // remove a classe selected para que o pokémon apareça como ausente na lista de seleção
    pokemon.classList.remove('selected');

    // finalmente remove o pokémon da lista de seleção
    selectedPokemons.removeChild(e);
}

function novo() {
    
    var sPokemons = selectedPokemons.childNodes;
    
    while (selectedPokemons.childNodes.length > 0) {

        remover(sPokemons[0]);
    }
    
    nome.value = '';
    teamForm.style.display = 'block';
}

function editar(e) {

    // resetando o formulario de times para evitar que duplique os pokémons
    novo();

    var timeID = e.parentNode.parentNode.parentNode.getAttribute('timeid');
    var time = times[timeID - 1];

    nome.value = time.nome;

    for (var i = 0; i < time.pokemons.length; i++) {

        var idPokemon = time.pokemons[i];
        var pokemon = document.querySelector(`[idpokemon='${idPokemon}']`);

        var clone = pokemon.cloneNode(true);
        clone.setAttribute('onclick', 'remover(this)');
        pokemon.classList.add('selected');

        selectedPokemons.appendChild(clone);
    }

    teamForm.style.display = 'block';
}

function deletar(e) {
    
    teams.removeChild(e.parentNode.parentNode.parentNode);
}

function openModal(e) {
    
    target = e;

    var id = e.getAttribute('idpokemon');
    modalPkmImg.src = `img/pokemons/${fixarCasas(Number(id))}.png`;

    var selected = pokemonsData.find(element => {
        return element.idpokemon == id;
    });

    divTipos.innerHTML = '';
    divMovimentos.innerHTML = '';
    
    pkm_id.innerHTML = selected.idpokemon;
    modalPkmName.innerHTML = `${selected.nome} ~ ${fixarCasas(selected.idpokemon)}`

    for (var i = 0; i < selected.tipo.length; i++) {

        var etiqueta = document.createElement('span');
        etiqueta.classList.add('type');
        etiqueta.innerHTML = selected.tipo[i].nome;
        colorirTipo(etiqueta);

        divTipos.appendChild(etiqueta);
    }

    /*for (var i = 0; i < pokemonsData[id].movimentos.length; i++) {

        var movimento = document.createElement('span');
        movimento.classList.add('move');
        movimento.innerHTML = movimentosData[pokemonsData[id].movimentos[i] - 1].nome;

        divMovimentos.appendChild(movimento);

        if (i == 1) {
            
            divMovimentos.innerHTML += '<br>';
        }
    }*/

    pkm_hp.innerHTML = selected.hp;
    pkm_ataque.innerHTML = selected.atk;
    pkm_defesa.innerHTML = selected.def;
    pkm_spAtk.innerHTML = selected.spAtk;
    pkm_spDef.innerHTML = selected.spDef;
    pkm_velocidade.innerHTML = selected.vel;

    modal.style.display = 'block';
}

function closeModal() {
    
    modal.style.display = 'none';
}

function cadastrar() {
    
    var form = document.createElement('form');

    var tNome = document.createElement('input');
    tNome.name = 'nome';
    tNome.value = nome.value;

    for (var i = 0; i < selectedPokemons.childElementCount; i++) {

        var pk = document.createElement('input');
        pk.name = 'pokemons';
        pk.value = selectedPokemons.childNodes[i].getAttribute('idpokemon');

        form.appendChild(pk);
    }

    form.appendChild(tNome);

    var formCadastro = new URLSearchParams(new FormData(form));

    fetch(`/times/cadastrar/${sessionStorage.email_usuario_meuapp}`, {
        method: "POST",
        body: formCadastro
    }).then(resposta => {

        if (resposta.ok) {
            resposta.json().then(json => {

                console.log(json);
                window.location.reload(false);
            });

        } else {

            console.log('Erro ao Cadastrar!');

            response.text().then(texto => {
                console.error(texto);
                finalizar_aguardar(texto);
            });
        }
    });

    return false;
}

window.onload = load();