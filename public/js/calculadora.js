var pokemons = [];
var movimentos = [];

var reload = true;

function load() {
    
    consultaBanco();
    atualizarDados();
}

function atualizarDados() {

    if (reload) {
        
        reload = false;
        preencherCombo();
        setTimeout(atualizarDados, 1000);
    }
    else {

        preencherCombo();
    }
}

function consultaBanco() {

    fetch(`/pokemons`, { cache: 'no-store' }).then(function (response) {
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

                    pokemons.push(
                        {
                            "idpokemon": id,
                            "nome": nome,
                            "hp": hp,
                            "atk": atk,
                            "def": def,
                            "spAtk": spAtk,
                            "spDef": spDef,
                            "vel": vel,
                            "tipo": [],
                            "total": total
                        }
                    );

                    fetch(`/tipos/${id}`, { cache: 'no-store' }).then(function (response) {
                        if (response.ok) {
                            response.json().then(function (resposta) {
            
                                //var tipos = document.getElementsByName('tipo');
            
                                for (let c = 0; c < resposta.length; c++) {
                                    var registro = resposta[c];
            
                                    var found = pokemons.find(element => {
                                        return element.idpokemon == registro.idpokemon;
                                    });
            
                                    found.tipo.push(
                                        {
                                            "idtipo": registro.idtipo,
                                            "nome": registro.nome,
                                            "cor": registro.cor
                                        }
                                    );
                                }

                                reload = true;
                            });
                        } else {
                            console.error('Nenhum dado encontrado ou erro na API');
                        }
                    })
                    .catch(function (error) {
                        console.error(`Erro na obtenção dos dados dos tipos: ${error.message}`);
                    });
                }

                reload = true;
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados dos Pokémons: ${error.message}`);
    });

    fetch(`/movimentos/completo`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                for (i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];

                    var id = registro.idmovimento;
                    var nome = registro.nome;
                    var tipo = registro.tipo;
                    var categoria = registro.categoria;
                    var poder = registro.poder == null ? '-' : registro.poder;
                    var precisao = registro.precisao == null ? '-' : registro.precisao;
                    var pp = registro.pp == null ? '-' : registro.pp;
                    var efeito = registro.efeito;
                    var cor = registro.cor;

                    movimentos.push(
                        {
                            "idmovimento": id,
                            "nome": nome,
                            "tipo": tipo,
                            "categoria": categoria,
                            "poder": poder,
                            "precisao": precisao,
                            "pp": pp,
                            "efeito": efeito,
                            "cor": cor
                        }
                    );
                }

                reload = true;
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados dos tipos: ${error.message}`);
    });
}

function preencherCombo() {
    
    var pokemonOptions = '';
    var movimentoOptions = '';

    for (var i = 0; i < pokemons.length; i++) {
    
        var pokemon = pokemons[i];
        pokemonOptions += `<option value="${pokemon.idpokemon}">${pokemon.nome}</option>`;
    
    }

    attacker.innerHTML = pokemonOptions;
    defender.innerHTML = pokemonOptions;
    
    for (var i = 0; i < movimentos.length; i++) {
    
        var movimento = movimentos[i];
        movimentoOptions += `<option value="${movimento.idmovimento}">${movimento.nome}</option>`;
    }
    
    move.innerHTML = movimentoOptions;
}


function trocarPokemon(e) {

    var pokemonID = Number(e.value);
    var pokemon = pokemons[pokemonID - 1];

    if (e.id == 'attacker') {

        pk1_id.innerHTML = pokemon.idpokemon;
        pk1_nome.innerHTML = pokemon.nome;
        pk1_tipo.innerHTML = `${pokemon.tipo[0].nome}${pokemon.tipo[1] != undefined ? `, ${pokemon.tipo[1].nome}` : ''}`;
        pk1_hp.innerHTML = pokemon.hp;
        pk1_atk.innerHTML = pokemon.atk;
        pk1_def.innerHTML = pokemon.def;
        pk1_spAtk.innerHTML = pokemon.spAtk;
        pk1_spDef.innerHTML = pokemon.spDef;
        pk1_velocidade.innerHTML = pokemon.vel;

        pokemon1_img.src = `img/pokemons/${fixarCasas(pokemon.idpokemon)}.png`;
    }
    else {

        pk2_id.innerHTML = pokemon.idpokemon;
        pk2_nome.innerHTML = pokemon.nome;
        pk2_tipo.innerHTML = `${pokemon.tipo[0].nome}${pokemon.tipo[1] != undefined ? `, ${pokemon.tipo[1].nome}` : ''}`;
        pk2_hp.innerHTML = pokemon.hp;
        pk2_atk.innerHTML = pokemon.atk;
        pk2_def.innerHTML = pokemon.def;
        pk2_spAtk.innerHTML = pokemon.spAtk;
        pk2_spDef.innerHTML = pokemon.spDef;
        pk2_velocidade.innerHTML = pokemon.vel;

        pokemon2_img.src = `img/pokemons/${fixarCasas(pokemon.idpokemon)}.png`;
        hp.style.width = '300px';
    }
}

function ataque() {

    var movimento = movimentos.find(element => {
        return element.idmovimento == move.value;
    });

    var atacante = pokemons.find(element => {
        return element.idpokemon == attacker.value;
    });

    var defensor = pokemons.find(element => {
        return element.idpokemon == defender.value;
    });

    var lv = 1;

    if (movimento.categoria == 'Físico') {

        var ataque = atacante.atk;
        var defesa = defensor.def;
    }
    else {

        var ataque = atacante.spAtk;
        var defesa = defensor.spDef;
    }

    var poder = movimento.poder;

    if (movimento.tipo == atacante.tipo[0].nome || movimento.tipo == atacante.tipo[1].nome) {
        
        var STAB = 1.5;
    }
    else {

        var STAB = 1;
    }

    var resistencia = 1;
    var numeroAleatorio = 85 + Math.random() * 15; // um número aleatório entre 85 e 100 
 
    var dano = ((((2 * lv / 5 + 2) * ataque * poder / defesa) / 50) + 2) * STAB * resistencia * numeroAleatorio / 100;

    var multiplicador = 1;

    for (var i = 0; i < defensor.tipo.length; i++) {

        multiplicador *= resistencia_tipo[tipos[movimento.tipo]][tipos[defensor.tipo[i].nome]];
    }

    dano *= multiplicador;

    efetividade.innerHTML = '';

    if (multiplicador > 1) {
        
        efetividade.innerHTML = 'É super efetivo*';
    }

    if (multiplicador < 1) {
        
        efetividade.innerHTML = 'Não é muito efetivo*';
    }

    // valor correnspondete ao dano na barra de hp
    var porcentagemDano = dano * 100 / defensor.hp;
    var danoBarra = 300 - (300 * porcentagemDano / 100);

    if (danoBarra < 0) {
        
        danoBarra = 0;
    }

    hp.style.width = `${danoBarra}px`;
}

window.onload = load();