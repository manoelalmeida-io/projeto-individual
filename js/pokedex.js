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
    row += `<td><span class="type">${tipo[0]}</span><span class="type">${tipo[1]}</span></td>`;
    row += `<td><b>${total}</b></td>`;
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

var etiquetasTipo = document.getElementsByClassName("type");
contador = 0;

while (contador < etiquetasTipo.length) {
    
    var etiqueta = etiquetasTipo[contador];

    if (etiqueta.innerHTML == 'Inseto') {
        etiqueta.style.backgroundColor = '#558b2f';
    }

    if (etiqueta.innerHTML == 'Escuridão') {
        etiqueta.style.backgroundColor = '#707070';
    }

    if (etiqueta.innerHTML == 'Dragão') {
        etiqueta.style.backgroundColor = '#7038F8';
    }

    if (etiqueta.innerHTML == 'Elétrico') {
        etiqueta.style.backgroundColor = '#969101';
    }

    if (etiqueta.innerHTML == 'Fada') {
        etiqueta.style.backgroundColor = '#F87EA7';
    }

    if (etiqueta.innerHTML == 'Luta') {
        etiqueta.style.backgroundColor = '#C03028';
    }

    if (etiqueta.innerHTML == 'Fogo') {
        etiqueta.style.backgroundColor = '#F08030';
    }

    if (etiqueta.innerHTML == 'Voador') {
        etiqueta.style.backgroundColor = '#A890F0';
    }

    if (etiqueta.innerHTML == 'Fantasma') {
        etiqueta.style.backgroundColor = '#705898';
    }

    if (etiqueta.innerHTML == 'Planta') {
        etiqueta.style.backgroundColor = '#204000';
    }

    if (etiqueta.innerHTML == 'Terrestre') {
        etiqueta.style.backgroundColor = '#BFAC21';
    }

    if (etiqueta.innerHTML == 'Gelo') {
        etiqueta.style.backgroundColor = '#1995A1';
    }

    if (etiqueta.innerHTML == 'Normal') {
        etiqueta.style.backgroundColor = '#A8A878';
    }

    if (etiqueta.innerHTML == 'Veneno') {
        etiqueta.style.backgroundColor = '#A040A0';
    }

    if (etiqueta.innerHTML == 'Psíquico') {
        etiqueta.style.backgroundColor = '#F85888';
    }

    if (etiqueta.innerHTML == 'Pedra') {
        etiqueta.style.backgroundColor = '#776A3E';
    }

    if (etiqueta.innerHTML == 'Metálico') {
        etiqueta.style.backgroundColor = '#7B8E8A';
    }

    if (etiqueta.innerHTML == 'Água') {
        etiqueta.style.backgroundColor = '#6890F0';
    }

    if (etiqueta.innerHTML == 'undefined') {
        etiqueta.style.display = 'none';
    }

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