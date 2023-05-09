const { sequelize } = require("../../config/mariadb");
const { DataTypes } = require("sequelize");

// Modelos de sequelize:
const Dealership = require("./dealership");
const Car = require("./car");

// Estructura del schema:
const Appointment = sequelize.define(
	"appointment",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
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
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		telephone: {
			type: DataTypes.STRING,
		},
		appointment_date: {
			type: DataTypes.DATE,
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
		car: {
			type: DataTypes.STRING,
			references: {
				model: Car,
				key: "vin",
			},
			allowNull: false,
		},
	},
	{
		timestamps: true,
		tableName: "appointment",
	}
);

// Relación de claves foráneas:
Appointment.belongsTo(Dealership, {
	foreignKey: "fk_dealership_3",
	as: "appointment_dealership",
});

Appointment.belongsTo(Car, {
	foreignKey: "fk_car",
	as: "appointment_car",
});

module.exports = Appointment;
