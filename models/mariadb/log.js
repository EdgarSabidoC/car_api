const { sequelize } = require("../../config/mariadb");
const { DataTypes } = require("sequelize");

const User = require("./user");

const Log = sequelize.define(
	"log",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		ip: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		event: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		method: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		observation: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		url: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		body: {
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
		tableName: "log",
		paranoid: true,
	}
);

module.exports = Log;
