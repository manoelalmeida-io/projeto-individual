var times = data.times;
var pokemonsData = data.pokemons;
var movimentosData = data.movimentos;
var pokemons = document.getElementsByClassName("pokemon");
var contador = 0;

var target;

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

teams.innerHTML += '<div onclick="novo()" class="add-team"></div>';

contador = 0;

while (contador < 151) {

    availablePokemons.innerHTML += `<div class="pokemon" idpokemon="${++contador}" onclick="openModal(this)">${fixarCasas(contador)}</div>`;
}

contador = 0;

while (contador < pokemons.length) {
    
    pokemons[contador++].style.backgroundImage = `url("img/pokemons/${fixarCasas(contador)}.png")`;
}

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

    if (id <= 6) {

        divTipos.innerHTML = '';
        divMovimentos.innerHTML = '';
        
        pkm_id.innerHTML = id;
        id = parseInt(id) - 1;
        modalPkmName.innerHTML = `${pokemonsData[id].nome} ~ ${fixarCasas(pokemonsData[id].id)}`
    
        for (var i = 0; i < pokemonsData[id].tipo.length; i++) {
    
            var etiqueta = document.createElement('span');
            etiqueta.classList.add('type');
            etiqueta.innerHTML = pokemonsData[id].tipo[i];
            colorirTipo(etiqueta);
    
            divTipos.appendChild(etiqueta);
        }

        for (var i = 0; i < pokemonsData[id].movimentos.length; i++) {

            var movimento = document.createElement('span');
            movimento.classList.add('move');
            movimento.innerHTML = movimentosData[pokemonsData[id].movimentos[i] - 1].nome;
    
            divMovimentos.appendChild(movimento);

            if (i == 1) {
                
                divMovimentos.innerHTML += '<br>';
            }
        }

        pkm_hp.innerHTML = pokemonsData[id].hp;
        pkm_ataque.innerHTML = pokemonsData[id].ataque;
        pkm_defesa.innerHTML = pokemonsData[id].defesa;
        pkm_spAtk.innerHTML = pokemonsData[id].ataqueEsp;
        pkm_spDef.innerHTML = pokemonsData[id].defesaEsp;
        pkm_velocidade.innerHTML = pokemonsData[id].velocidade;
    }


    modal.style.display = 'block';
}

function closeModal() {
    
    modal.style.display = 'none';
}