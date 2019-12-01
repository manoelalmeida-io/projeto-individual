'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let TimePokemon = sequelize.define('TimePokemon',{
		fktime: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		fkpokemon: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		ocorrencia: {
			type: DataTypes.INTEGER,
			primaryKey: true
		}
	}, 
	{
		tableName: 'tbtime_pokemon', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return TimePokemon;
};
