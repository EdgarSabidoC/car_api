const { sequelize } = require("../../config/mariadb");
const { DataTypes } = require("sequelize");

// Modelos de sequelize:
const Appointment = require("./appointment");
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
		employee: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			references: {
				model: Employee,
				key: "id",
			},
		},
		final_sale_price: {
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
	foreignKey: "appointment",
	as: "sell_appointment",
});

Sell.belongsTo(Employee, {
	foreignKey: "employee",
	as: "sell_employee",
});

module.exports = Sell;
