'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Time = sequelize.define('Time',{
		idtime: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nome: {
			type: DataTypes.STRING,
			allowNull: false
		},
		fkusuario: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, 
	{
		tableName: 'tbtime', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Time;
};
