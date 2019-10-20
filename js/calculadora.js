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

function trocarPokemon(e) {

    var pokemonID = Number(e.value);
    var pokemon = pokemons[pokemonID - 1];

    if (e.id == 'attacker') {

        pk1_id.innerHTML = pokemon.id;
        pk1_nome.innerHTML = pokemon.nome;
        pk1_tipo.innerHTML = pokemon.tipo;
        pk1_hp.innerHTML = pokemon.hp;
        pk1_atk.innerHTML = pokemon.ataque;
        pk1_def.innerHTML = pokemon.defesa;
        pk1_spAtk.innerHTML = pokemon.ataqueEsp;
        pk1_spDef.innerHTML = pokemon.defesaEsp;
        pk1_velocidade.innerHTML = pokemon.velocidade;

        pokemon1_img.src = `img/pokemons/${fixarCasas(pokemon.id)}.png`;
    }
    else {

        pk2_id.innerHTML = pokemon.id;
        pk2_nome.innerHTML = pokemon.nome;
        pk2_tipo.innerHTML = pokemon.tipo;
        pk2_hp.innerHTML = pokemon.hp;
        pk2_atk.innerHTML = pokemon.ataque;
        pk2_def.innerHTML = pokemon.defesa;
        pk2_spAtk.innerHTML = pokemon.ataqueEsp;
        pk2_spDef.innerHTML = pokemon.defesaEsp;
        pk2_velocidade.innerHTML = pokemon.velocidade;

        pokemon2_img.src = `img/pokemons/${fixarCasas(pokemon.id)}.png`;
        hp.style.width = '300px';
    }
}

function ataque() {

    var movimento = movimentos[Number(move.value) - 1];
    var atacante = pokemons[Number(attacker.value) - 1];
    var defensor = pokemons[Number(defender.value) - 1];

    var lv = 100;

    if (movimento.categoria == 'Físico') {

        var ataque = atacante.ataque;
        var defesa = defensor.defesa;
    }
    else {

        var ataque = atacante.ataqueEsp;
        var defesa = defensor.defesaEsp;
    }

    var poder = movimento.poder;

    if (movimento.tipo == atacante.tipo[0] || movimento.tipo == atacante.tipo[1]) {
        
        var STAB = 1.5;
    }
    else {

        var STAB = 1;
    }

    var resistencia = 1;
    var numeroAleatorio = 85 + Math.random() * 15; // um número aleatório entre 85 e 100 
 
    var dano = ((((2 * lv / 5 + 2) * ataque * poder / defesa) / 50) + 2) * STAB * resistencia * numeroAleatorio / 100;

    // valor correnspondete ao dano na barra de hp
    var porcentagemDano = dano * 100 / pokemon.hp;
    var danoBarra = 300 - (300 * porcentagemDano / 100);

    if (danoBarra < 0) {
        
        danoBarra = 0;
    }

    hp.style.width = `${danoBarra}px`;
}