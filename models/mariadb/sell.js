const { sequelize } = require("../../config/mariadb");
const { DataTypes } = require("sequelize");

// Modelos de sequelize:
const Appointment = require("./appointment");
const Employee = require("./employee");

// Estructura del schema:
const Sell = sequelize.define(
	"sell",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
		},
		appointment: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Appointment,
				key: "id",
			},
		},
		employee: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Employee,
				key: "id",
			},
		},
		sold_price: {
			type: DataTypes.DECIMAL,
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
		tableName: "sell",
		paranoid: true,
		indexes: [
			{
				unique: true,
				fields: ["appointment", "car", "employee"],
			},
		],
	}
);

// Relación de claves foráneas:
Sell.belongsTo(Appointment, {
	foreignKey: "appointment",
	as: "sell_appointment_as",
});

Sell.belongsTo(Employee, {
	foreignKey: "employee",
	as: "sell_employee_as",
});

module.exports = Sell;
