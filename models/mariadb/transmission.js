const { sequelize } = require("../../config/mariadb");
const { DataTypes } = require("sequelize");

// Estructura del schema:
const Transmission = sequelize.define(
	"transmission",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		deleted: { type: DataTypes.BOOLEAN },
		deletedAt: { type: DataTypes.DATE },
	},
	{
		timestamps: true,
		tableName: "transmission",
		paranoid: true,
	}
);

module.exports = Transmission;
