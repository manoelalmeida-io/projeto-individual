var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Tipo = require('../models').Tipo;

/* Recuperar todos os Pokémons */
router.get('/', function (req, res, next) {

    console.log('Recuperando todos os Pokémons');
    
	Tipo.findAndCountAll().then(resultado => {

		console.log(`${resultado.count} registros`);
        res.json(resultado.rows);
        
	}).catch(erro => {

		console.error(erro);
		res.status(500).send(erro.message);
	});
});

/* Recuperar os tipos de um pokémon */
router.get('/:idpokemon', function (req, res, next) {

    console.log(`Recuperar os tipos de um pokémon`);
    
    let idpokemon = req.params.idpokemon;

	const instrucaoSql = `select idpokemon, idtipo, tbtipo.nome, cor from tbpokemon 
                            inner join tbpokemon_tipo on fkpokemon = idpokemon
                            inner join tbtipo on fktipo = idtipo
                            where idpokemon = ${idpokemon}`;

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

module.exports = router;