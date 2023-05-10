const { sequelize } = require("../../config/mariadb");
const { DataTypes } = require("sequelize");

const Dealership = require("./dealership");

const User = sequelize.define(
	"user",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
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
		displayName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		googleId: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		user_role: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		dealership: {
			type: DataTypes.INTEGER,
			references: {
				model: Dealership,
				key: "id",
			},
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal(
				"CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
			),
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

module.exports = User;
