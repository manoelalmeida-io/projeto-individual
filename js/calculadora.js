var pokemons = data.pokemons;
var movimentos = data.movimentos;

var contador = 0;

while (contador < pokemons.length) {
    
    var pokemon = pokemons[contador];
    var item = `<option value="${pokemon.id}">${pokemon.nome}</option>`;

    attacker.innerHTML += item;
    defender.innerHTML += item;

    contador++;
}

contador = 0;

while (contador < movimentos.length) {
    
    var movimento = movimentos[contador];
    var item = `<option value="${movimento.id}">${movimento.nome}</option>`;

    move.innerHTML += item;

    contador++;
}