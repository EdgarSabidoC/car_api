const { sequelize } = require("../../config/mariadb");
const { DataTypes } = require("sequelize");

// Estructura del schema:
const CarCategory = sequelize.define(
	"car_category",
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
		deleted: { type: DataTypes.BOOLEAN },
		deletedAt: { type: DataTypes.DATE },
	},
	{
		timestamps: true,
		tableName: "car_category",
		paranoid: true,
	}
);

module.exports = CarCategory;
