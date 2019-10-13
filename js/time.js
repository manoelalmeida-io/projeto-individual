var times = data.times;
var pokemons = document.getElementsByClassName("pokemon");
var contador = 0;

while (contador < times.length) {

    var posicaoPokemon = 0;
    var numeroPokemons = times[contador].pokémons.length; 

    var time = '<div class="team">';

    while (posicaoPokemon < numeroPokemons) {
        
        time += `<div idpokemon="${times[contador].pokémons[posicaoPokemon]}" class="team-pokemon"></div>`;
        posicaoPokemon++;
    }

    time += '</div>';
    teams.innerHTML += time;

    contador++;
}

contador = 0;

var timePokemons = document.getElementsByClassName("team-pokemon");

while (contador < timePokemons.length) {
    
    var pokemon = timePokemons[contador];

    var id = pokemon.getAttribute('idpokemon');
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
    
    teamForm.style.display = 'block';
}

function fixarCasas(numero) {

    if (numero < 10) {
        
        return "00" + numero;
    }

    if (numero >= 10 && numero < 100) {

        return "0" + numero;
    }

    if (numero >= 100) {
        
        return "" + numero;
    }
}