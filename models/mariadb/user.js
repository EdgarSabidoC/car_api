const { sequelize } = require("../../config/mariadb");
const { DataTypes } = require("sequelize");

const Dealership = require("./dealership");
const Role = require("./role");

const User = sequelize.define(
	"user",
	{
		googleId: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: true,
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		last_name_1: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		last_name_2: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		dealership: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: Dealership,
				key: "id",
			},
		},
		user_role: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: Role,
				key: "id",
			},
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
		tableName: "user",
		paranoid: true,
	}
);

User.belongsTo(Dealership, {
	foreignKey: "dealership",
	as: "user_dealership_as",
});

User.belongsTo(Role, {
	foreignKey: "user_role",
	as: "user_role_as",
});

module.exports = User;
