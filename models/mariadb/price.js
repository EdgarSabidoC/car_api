const { sequelize } = require("../../config/mariadb");
const { DataTypes } = require("sequelize");

// Estructura del schema:
const Price = sequelize.define(
	"price",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
		},
		concept: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		percentage: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		deleted: { type: DataTypes.BOOLEAN },
		deletedAt: { type: DataTypes.DATE },
	},
	{
		timestamps: true,
		tableName: "price",
		paranoid: true,
	}
);

module.exports = Price;
