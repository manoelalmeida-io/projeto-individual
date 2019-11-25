async function load() {
    
    await fetch(`/tipos`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
    
                for (i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];
                
                    // aqui, após 'registro.' use os nomes 
                    // dos atributos que vem no JSON 
                    // que gerou na consulta ao banco de dados
    
                    type.innerHTML += `<option value="${registro.idtipo}">${registro.nome}</option>`;
                }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados dos tipos: ${error.message}`);
    });

    await fetch(`/pokemons`, { cache: 'no-store' }).then(function (response) {
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
    
                    var row = '<tr>';
                    row += `<td class="id"><img src="img/pokemons/${fixarCasas(id)}.png">${fixarCasas(id)}</td>`;
                    row += `<td>${nome}</td>`;
                    row += `<td name="tipo"></td>`;

                    fetch(`/tipos/${id}`, { cache: 'no-store' }).then(function (response) {
                        if (response.ok) {
                            response.json().then(function (resposta) {
                    
                                var tipos = document.getElementsByName('tipo');

                                for (i = 0; i < resposta.length; i++) {
                                    var registro = resposta[i];

                                    var tipo = document.createElement('span');
                                    tipo.classList.add('type');
                                    tipo.innerHTML = registro.nome;
                                    tipo.style.backgroundColor = registro.cor;

                                    tipos[registro.idpokemon - 1].appendChild(tipo);
                                }
                            });
                        } else {
                            console.error('Nenhum dado encontrado ou erro na API');
                        }
                    })
                    .catch(function (error) {
                        console.error(`Erro na obtenção dos dados dos tipos: ${error.message}`);
                    });

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
}

window.onload = load();