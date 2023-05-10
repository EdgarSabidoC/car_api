const { sequelize } = require("../../config/mariadb");
const { DataTypes } = require("sequelize");

// Modelos de sequelize:
const Appointment = require("./appointment");
const Car = require("./car");
const Employee = require("./employee");

// Estructura del schema:
const Sell = sequelize.define(
	"sell",
	{
		appointment: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			references: {
				model: Appointment,
				key: "id",
			},
		},
		car: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
			references: {
				model: Car,
				key: "vin",
			},
		},
		employee: {
			type: DataTypes.INTEGER,
			primaryKey: true,
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
	}
);

// Relación de claves foráneas:
Sell.belongsTo(Appointment, {
	foreignKey: "fk_appointment",
	as: "sell_appointment_as",
});

Sell.belongsTo(Car, {
	foreignKey: "fk_car_3",
	as: "sell_car_as",
});

Sell.belongsTo(Employee, {
	foreignKey: "fk_employee",
	as: "sell_employee_as",
});

module.exports = Sell;
