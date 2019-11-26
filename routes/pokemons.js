var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Pokemon = require('../models').Pokemon;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* Recuperar todos os Pokémons */
router.get('/', function (req, res, next) {
	console.log('Recuperando todos os Pokémons');
	Pokemon.findAndCountAll().then(resultado => {
		console.log(`${resultado.count} registros`);

		res.json(resultado.rows);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

/* Recuperar todos os Pokémons com base no texto da pesquisa */
router.get('/buscar/:texto', function (req, res, next) {
	console.log('Recuperando todos os Pokémons com base no texto da pesquisa');

	let texto = req.params.texto;

	Pokemon.findAndCountAll({ where: { nome: { [Op.like]: `%${texto}%` } } }).then(resultado => {
		console.log(`${resultado.count} registros`);

		res.json(resultado.rows);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

module.exports = router;