'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Tipo = sequelize.define('Tipo',{
		idtipo: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		nome: {
			type: DataTypes.STRING,
			allowNull: false
		},
		cor: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, 
	{
		tableName: 'tbtipo', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Tipo;
};