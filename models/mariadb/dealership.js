const { sequelize } = require("../../config/mariadb");
const { DataTypes } = require("sequelize");

// Modelos de sequelize:
const PostalCode = require("./postal_code");

// Estructura del schema:
const Dealership = sequelize.define(
	"dealership",
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
		description: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		street: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		exterior_number: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		neighborhood: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		postal_code: {
			type: DataTypes.INTEGER,
			references: {
				model: PostalCode,
				key: "id",
			},
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
		tableName: "dealership",
		paranoid: true,
	}
);

// Relación de claves foráneas:
Dealership.belongsTo(PostalCode, {
	foreignKey: "postal_code",
	as: "dealership_postal_code",
});

module.exports = Dealership;
