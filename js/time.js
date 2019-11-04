var times = data.times;
var pokemons = document.getElementsByClassName("pokemon");
var contador = 0;

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

    availablePokemons.innerHTML += `<div class="pokemon" idpokemon="${++contador}" onclick="adicionar(this)">${fixarCasas(contador)}</div>`;
}

contador = 0;

while (contador < pokemons.length) {
    
    pokemons[contador++].style.backgroundImage = `url("img/pokemons/${fixarCasas(contador)}.png")`;
}

function adicionar(e) {
    
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