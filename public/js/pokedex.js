var pokemons = data.pokemons;
var contador = 0;

fetch(`/pokemons`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
        response.json().then(function (resposta) {

            for (i = 0; i < resposta.length; i++) {
                var registro = resposta[i];
            
                // aqui, após 'registro.' use os nomes 
                // dos atributos que vem no JSON 
                // que gerou na consulta ao banco de dados

                var id = registro.idpokemon;
                var nome = registro.nome;
                //var tipo = registro.tipo;
                var hp = registro.hp;
                var atk = registro.ataque;
                var def = registro.defesa;
                var spAtk = registro.ataqueesp;
                var spDef = registro.defesaesp;
                var vel = registro.velocidade;
                var total = hp + atk + def + spAtk + spDef + vel; 

                var row = '<tr>';
                row += `<td class="id"><img src="img/pokemons/${fixarCasas(id)}.png">${fixarCasas(id)}</td>`;
                row += `<td>${nome}</td>`;
                row += `<td></td>`;
                //row += `<td><span class="type">${tipo[0]}</span><span class="type">${tipo[1]}</span></td>`;
                row += `<td><b>${total}</b></td>`;
                row += `<td>${hp}</td>`;
                row += `<td>${atk}</td>`;
                row += `<td>${def}</td>`;
                row += `<td>${spAtk}</td>`;
                row += `<td>${spDef}</td>`;
                row += `<td>${vel}</td>`;
                row += `<tr>`;

                pokemonTable.innerHTML += row;
            }
        });
    } else {
        console.error('Nenhum dado encontrado ou erro na API');
    }
})
.catch(function (error) {
    console.error(`Erro na obtenção dos dados dos Pokémons: ${error.message}`);
});

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