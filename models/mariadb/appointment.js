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
			autoIncrement: true,
			allowNull: false,
		},
		client_firstname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		client_lastname_1: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		client_lastname_2: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		telephone: {
			type: DataTypes.STRING,
			allowNull: true,
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
		tableName: "appointment",
		paranoid: true,
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
