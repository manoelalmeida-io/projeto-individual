process.env.NODE_ENV = 'production';

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var pokemonsRouter = require('./routes/pokemons');
var tiposRouter = require('./routes/tipos');
var movimentosRouter = require('./routes/movimentos');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/pokemons', pokemonsRouter);
app.use('/tipos', tiposRouter);
app.use('/movimentos', movimentosRouter);

module.exports = app;
