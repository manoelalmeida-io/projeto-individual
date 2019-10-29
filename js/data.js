var data = {
    "pokemons": [
        {
            "id": 1,
            "nome": "Bulbasaur",
            "tipo": [ "Planta", "Veneno" ],
            "hp": 45,
            "ataque": 49,
            "defesa": 49,
            "ataqueEsp": 65,
            "defesaEsp": 65,
            "velocidade": 45
        },
        {
            "id": 2,
            "nome": "Ivysaur",
            "tipo": [ "Planta", "Veneno" ],
            "hp": 60,
            "ataque": 62,
            "defesa": 63,
            "ataqueEsp": 80,
            "defesaEsp": 80,
            "velocidade": 60
        },
        {
            "id": 3,
            "nome": "Venusaur",
            "tipo": [ "Planta", "Veneno" ],
            "hp": 80,
            "ataque": 82,
            "defesa": 83,
            "ataqueEsp": 100,
            "defesaEsp": 100,
            "velocidade": 80
        },
        {
            "id": 4,
            "nome": "Charmander",
            "tipo": [ "Fogo" ],
            "hp": 39,
            "ataque": 52,
            "defesa": 43,
            "ataqueEsp": 60,
            "defesaEsp": 50,
            "velocidade": 65
        },
        {
            "id": 5,
            "nome": "Charmeleon",
            "tipo": [ "Fogo" ],
            "hp": 58,
            "ataque": 64,
            "defesa": 58,
            "ataqueEsp": 80,
            "defesaEsp": 65,
            "velocidade": 80
        },
        {
            "id": 6,
            "nome": "Charizard",
            "tipo": [ "Fogo" ],
            "hp": 78,
            "ataque": 84,
            "defesa": 78,
            "ataqueEsp": 109,
            "defesaEsp": 85,
            "velocidade": 100
        }
    ],
    "movimentos": [
        {
            "id": 1,
            "nome": "Pound",
            "tipo": "Normal",
            "categoria": "Físico",
            "poder": 40,
            "precisao": 100
        },
        {
            "id": 2,
            "nome": "Karate Chop",
            "tipo": "Lutador",
            "categoria": "Físico",
            "poder": 50,
            "precisao": 100
        },
        {
            "id": 3,
            "nome": "Ember",
            "tipo": "Fogo",
            "categoria": "Especial",
            "poder": 40,
            "precisao": 100
        }
    ],
    "usuarios": [
        {
            "id": 1,
            "nome": "Usuário do Sistema",
            "email": "a@gmail.com",
            "senha": "1234"
        }
    ],
    "times": [
        {
            "id": 1,
            "nome": "Meu time 1",
            "pokemons": [ 1, 2, 3, 4, 5, 6 ]
        }
    ]
};

var tipos = {
    "Normal": 0,
    "Fogo": 1,
    "Água": 2,
    "Elétrico": 3,
    "Planta": 4,
    "Gelo": 5,
    "Lutador": 6,
    "Veneno": 7,
    "Terrestre": 8,
    "Voador": 9,
    "Psíquico": 10,
    "Inseto": 11,
    "Pedra": 12,
    "Fantasma": 13,
    "Dragão": 14,
    "Escuridão": 15,
    "Metálico": 16,
    "Fada": 17
};

var resistencia_tipo = [
    //NOR  FIR  WAT  ELE  GRA  ICE  FIG  POI  GRO  FLY  PSY  BUG  ROC  GHO  DRA  DAR  STE  FAI < DEFENSE
    [ 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 0.0, 1.0, 1.0, 0.5, 1.0 ], // NOR
    [ 1.0, 0.5, 0.5, 1.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 0.5, 1.0, 2.0, 1.0 ], // FIR
    [ 1.0, 2.0, 0.5, 1.0, 0.5, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 1.0, 1.0 ], // WAT
    [ 1.0, 1.0, 2.0, 0.5, 0.5, 1.0, 1.0, 1.0, 0.0, 2.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0 ], // ELE
    [ 1.0, 0.5, 2.0, 1.0, 0.5, 1.0, 1.0, 0.5, 2.0, 0.5, 1.0, 0.5, 2.0, 1.0, 0.5, 1.0, 0.5, 1.0 ], // GRA
    [ 1.0, 0.5, 0.5, 1.0, 2.0, 0.5, 1.0, 1.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1,0 ], // ICE
    [ 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 0.5, 0.5, 0.5, 2.0, 0.0, 1.0, 2.0, 2.0, 0.5 ], // FIG
    [ 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 0.5, 0.5, 1.0, 1.0, 1.0, 0.5, 0.5, 1.0, 1.0, 0.0, 2.0 ], // POI
    [ 1.0, 2.0, 1.0, 2.0, 0.5, 1.0, 1.0, 2.0, 1.0, 0.0, 1.0, 0.5, 2.0, 1.0, 1.0, 1.0, 2.0, 1.0 ], // GRO
    [ 1.0, 1.0, 1.0, 0.5, 2.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 1.0, 1.0, 0.5, 1.0 ], // FLY
    [ 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 0.0, 0.5, 1.0 ], // PSY
    [ 1.0, 0.5, 1.0, 1.0, 2.0, 1.0, 0.5, 0.5, 1.0, 0.5, 2.0, 1.0, 1.0, 0.5, 1.0, 2.0, 0.5, 0.5 ], // BUG
    [ 1.0, 2.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 0.5, 2.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0 ], // ROC
    [ 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 1.0 ], // GHO
    [ 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 0.0 ], // DRA
    [ 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 0.5 ], // DAR
    [ 1.0, 0.5, 0.5, 0.5, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 0.5, 2.0 ], // STE
    [ 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 0.5, 1.0 ]  // FAI
];

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