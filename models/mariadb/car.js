const { sequelize } = require("../../config/mariadb");
const { DataTypes } = require("sequelize");

// The first part is the structure of the schema:
const Car = sequelize.define(
	"tracks",
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		album: {
			type: DataTypes.STRING,
		},
		cover: {
			type: DataTypes.STRING,
		},
		artist_name: {
			type: DataTypes.STRING,
		},
		artist_nickname: {
			type: DataTypes.STRING,
		},
		artist_nationality: {
			type: DataTypes.STRING,
		},
		duration_start: {
			type: DataTypes.NUMBER,
		},
		duration_end: {
			type: DataTypes.NUMBER,
		},
		mediaId: {
			type: DataTypes.NUMBER,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = Car;
