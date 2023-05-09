const { sequelize } = require("../../config/mariadb");
const { DataTypes } = require("sequelize");

// Estructura del schema:
const Schedule = sequelize.define(
	"schedule",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
		},
		hour: {
			type: DataTypes.TIME,
			allowNull: false,
		},
	},
	{
		timestamps: false,
		tableName: "schedule",
	}
);

module.exports = Schedule;
