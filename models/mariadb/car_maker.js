const { sequelize } = require("../../config/mariadb");
const { DataTypes } = require("sequelize");

// Estructura del schema:
const CarMaker = sequelize.define(
	"maker",
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
		logo: {
			type: DataTypes.TEXT,
			allowNull: true,
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
		tableName: "maker",
		paranoid: true,
	}
);

module.exports = CarMaker;
