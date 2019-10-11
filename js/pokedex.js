var pokemons = data.pokemons;
var contador = 0;

while (contador < pokemons.length) {
    
    var id = pokemons[contador].id;
    var nome = pokemons[contador].nome;
    var tipo = pokemons[contador].tipo;
    var hp = pokemons[contador].hp;
    var atk = pokemons[contador].ataque;
    var def = pokemons[contador].defesa;
    var spAtk = pokemons[contador].ataqueEsp;
    var spDef = pokemons[contador].defesaEsp;
    var vel = pokemons[contador].velocidade;
    var total = hp + atk + def + spAtk + spDef + vel; 

    var row = '<tr>';
    row += `<td>${fixarCasas(id)}</td>`;
    row += `<td>${nome}</td>`;
    row += `<td>${tipo[0]}/${tipo[1]}</td>`;
    row += `<td>${total}</td>`;
    row += `<td>${hp}</td>`;
    row += `<td>${atk}</td>`;
    row += `<td>${def}</td>`;
    row += `<td>${spAtk}</td>`;
    row += `<td>${spDef}</td>`;
    row += `<td>${vel}</td>`;
    row += `<tr>`;

    pokemonTable.innerHTML += row;
    contador++;
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