const { sequelize } = require("../../config/mariadb");
const { DataTypes } = require("sequelize");

// The first part is the structure of the schema:
const Storage = sequelize.define(
	"storages",
	{
		url: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		filename: {
			type: DataTypes.STRING,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = Storage;
