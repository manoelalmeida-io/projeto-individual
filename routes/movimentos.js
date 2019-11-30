var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Movimento = require('../models').Movimento;

/* Recuperar todos os movimentos */
router.get('/', function (req, res, next) {

    console.log('Recuperando todos os movimentos');
    
	Movimento.findAndCountAll().then(resultado => {

		console.log(`${resultado.count} registros`);
        res.json(resultado.rows);
        
	}).catch(erro => {

		console.error(erro);
		res.status(500).send(erro.message);
	});
});

/* Recuperando os movimentos completos */
router.get('/completo', function (req, res, next) {

    console.log(`Recuperando os movimentos completos`);

	const instrucaoSql = `select idmovimento, tbmovimento.nome, tbtipo.nome tipo, tbcategoria.nome categoria, 
							poder, precisao, pp, efeito, tbtipo.cor from tbmovimento
							inner join tbtipo on fktipo = idtipo
                            inner join tbcategoria on fkcategoria = idcategoria
                            order by tbmovimento.nome`;

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