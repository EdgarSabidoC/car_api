const { sequelize } = require("../../config/mariadb");
const { DataTypes } = require("sequelize");

// Modelos de sequelize:
const Dealership = require("./dealership");

// Estructura del schema:
const Employee = sequelize.define(
	"employee",
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
		dealership: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Dealership,
				key: "id",
			},
		},
		email: {
			type: DataTypes.STRING,
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
		tableName: "employee",
		paranoid: true,
	}
);

// Relación de claves foráneas:
Employee.belongsTo(Dealership, {
	foreignKey: "dealership",
	as: "employee_dealership_as",
});

module.exports = Employee;
