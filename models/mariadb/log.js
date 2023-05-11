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
		user: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: "id",
			},
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
		observation: {
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

Log.belongsTo(User, {
	foreignKey: "user",
	as: "log_user_as",
});

module.exports = Log;
