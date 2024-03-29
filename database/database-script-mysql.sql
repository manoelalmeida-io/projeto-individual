create database pokemon;
	use pokemon;
    
-- construindo as tabelas --

create table tbusuario (
	idusuario int primary key auto_increment,
    nome varchar(40),
    email varchar(50),
    senha varchar(50),
    unique (email)
);

create table tbpokemon (
	idpokemon int primary key,
    nome varchar(40),
    hp int,
    ataque int,
    defesa int,
    ataqueesp int,
    defesaesp int,
    velocidade int
);

create table tbtime (
	idtime int primary key auto_increment,
    nome varchar(40),
    fkusuario int,
    foreign key (fkusuario) references tbusuario(idusuario)
);

create table tbtipo (
	idtipo int primary key auto_increment,
    nome varchar(40),
    cor char(7)
);

create table tbcategoria (
	idcategoria int primary key auto_increment,
    nome varchar(20)
);

create table tbmovimento (
	idmovimento int primary key auto_increment,
    nome varchar(40),
    fktipo int,
    fkcategoria int,
    poder int,
    precisao int,
    pp int,
    efeito varchar(255),
    foreign key (fktipo) references tbtipo(idtipo),
    foreign key (fkcategoria) references tbcategoria(idcategoria)
);

-- construindo as relações --

create table tbtime_pokemon (
	fktime int,
    fkpokemon int,
    ocorrencia int,
    foreign key (fktime) references tbtime (idtime),
    foreign key (fkpokemon) references tbpokemon (idpokemon),
    primary key (fktime, fkpokemon, ocorrencia)
);

create table tbpokemon_tipo (
	fkpokemon int,
    fktipo int,
    foreign key (fkpokemon) references tbpokemon (idpokemon),
    foreign key (fktipo) references tbtipo (idtipo),
    primary key (fkpokemon, fktipo)
);

create table tbpokemon_movimento (
	fkpokemon int,
    fkmovimento int,
    foreign key (fkpokemon) references tbpokemon (idpokemon),
    foreign key (fkmovimento) references tbmovimento (idmovimento),
    primary key (fkpokemon, fkmovimento)
);