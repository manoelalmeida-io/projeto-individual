'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Movimento = sequelize.define('Movimento',{
		idmovimento: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		nome: {
			type: DataTypes.STRING,
			allowNull: false
		},
		fktipo: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		fkcategoria: {
			type: DataTypes.INTEGER,
			allowNull: false
        },
        poder: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		precisao: {
			type: DataTypes.INTEGER,
			allowNull: false
        },
        pp: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		efeito: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, 
	{
		tableName: 'tbmovimento', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Movimento;
};
