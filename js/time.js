var pokemons = document.getElementsByClassName("pokemon");
var contador = 0;

while (contador < 150) {

    availablePokemons.innerHTML += `<div class="pokemon" onclick="selecionar(this)">${fixarCasas(++contador)}</div>`;
}

contador = 0;

while (contador < pokemons.length) {
    
    pokemons[contador++].style.backgroundImage = `url("img/pokemons/${fixarCasas(contador)}.png")`;
}

function selecionar(e) {
    
    if (selectedPokemons.childElementCount < 6) {
        
        var clone = e.cloneNode(true);
        selectedPokemons.appendChild(clone);
    }
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