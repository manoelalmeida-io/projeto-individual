var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Time = require('../models').Time;
var TimePokemon = require('../models').TimePokemon;

/* Recuperar todos os times */
router.get('/', function (req, res, next) {

    console.log('Recuperando todos os times');
    
	Time.findAndCountAll().then(resultado => {

		console.log(`${resultado.count} registros`);
        res.json(resultado.rows);
        
	}).catch(erro => {

		console.error(erro);
		res.status(500).send(erro.message);
	});
});

/* Recuperando os times do usuário */
router.get('/:login', function (req, res, next) {

    console.log(`Recuperando os times do usuário`);

    let login = req.params.login;

	const instrucaoSql = `select tbtime.* from tbtime
                            inner join tbusuario on fkusuario = idusuario
                            where email = '${login}'`;

	sequelize.query(instrucaoSql, {
        type: sequelize.QueryTypes.SELECT
    })
    .then(resultado => {

        console.log(`Encontrados: ${resultado.length}`);
        res.json(resultado);

    }).catch(erro => {

        console.error(erro);
        res.status(500).send(erro.message);
    });
});

/* Recuperar todos os pokemons de times */
router.get('/pokemons', function (req, res, next) {

    console.log('Recuperando todos os pokemons de times');
    
	TimePokemon.findAndCountAll().then(resultado => {

		console.log(`${resultado.count} registros`);
        res.json(resultado.rows);
        
	}).catch(erro => {

		console.error(erro);
		res.status(500).send(erro.message);
	});
});

/* Recuperar todos os pokemons de um time */
router.get('/pokemons/:id', function (req, res, next) {

    console.log('Recuperar todos os pokemons de um time');
    
	let id = req.params.id;

	const instrucaoSql = `select * from tbtime_pokemon where fktime = ${id}`;

	sequelize.query(instrucaoSql, {
        type: sequelize.QueryTypes.SELECT
    })
    .then(resultado => {

        console.log(`Encontrados: ${resultado.length}`);
        res.json(resultado);

    }).catch(erro => {

        console.error(erro);
        res.status(500).send(erro.message);
    });
});

/* Cadastrar time */
router.post('/cadastrar/:login', function (req, res, next) {
	console.log('Criando um time');

    let login = req.params.login;

    const instrucaoSql = `select idusuario from tbusuario where email = '${login}'`;

	sequelize.query(instrucaoSql, {
        type: sequelize.QueryTypes.SELECT
    })
    .then(resultado => {

        var fkusuario = resultado[0].idusuario;
        var nome = req.body.nome;
        var pokemons = req.body.pokemons;

        console.log(`Encontrados: ${resultado.length}`);

        Time.create({
            nome: nome,
            fkusuario: fkusuario
        }).then(resultado => {
            console.log(`Time criado: ${resultado}`);

            for (var i = 0; i < pokemons.length; i++) {

                TimePokemon.create({
                    fktime: resultado.idtime,
                    fkpokemon: pokemons[i],
                    ocorrencia: 1
                }).then(resultado => {
                    console.log(`Pokemon do time criado: ${resultado}`);
                }).catch(erro => {
                    console.error(erro);
                    res.status(500).send(erro.message);
                });
            }
            
            res.send(resultado);

        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });

    }).catch(erro => {

        console.error(erro);
        res.status(500).send(erro.message);
    });
});

module.exports = router;