'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Pokemon = sequelize.define('Pokemon',{
		idpokemon: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		nome: {
			type: DataTypes.STRING,
			allowNull: false
		},
		hp: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		ataque: {
			type: DataTypes.INTEGER,
			allowNull: false
        },
        defesa: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		ataqueesp: {
			type: DataTypes.INTEGER,
			allowNull: false
        },
        defesaesp: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		velocidade: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, 
	{
		tableName: 'tbpokemon', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Pokemon;
};
