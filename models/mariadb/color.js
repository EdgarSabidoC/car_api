const { sequelize } = require("../../config/mariadb");
const { DataTypes } = require("sequelize");

// Estructura del schema:
const Color = sequelize.define(
	"color",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		deleted: { type: DataTypes.BOOLEAN },
		deletedAt: { type: DataTypes.DATE, allowNull: true },
	},
	{
		timestamps: true,
		tableName: "color",
		paranoid: true,
	}
);

module.exports = Color;
