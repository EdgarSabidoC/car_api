const { sequelize } = require("../../config/mariadb");
const { DataTypes } = require("sequelize");

// Modelos de sequelize:
const MaintenanceType = require("./maintenance_type");
const Car = require("./car");

// Estructura del schema:
const Maintenance = sequelize.define(
	"maintenance",
	{
		maintenance_type: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			references: {
				model: MaintenanceType,
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
	},
	{
		timestamps: true,
		tableName: "maintenance",
	}
);

// Relación de claves foráneas:
Maintenance.belongsTo(MaintenanceType, {
	foreignKey: "fk_maintenance_type",
	as: "maintenance_maintenance_type",
});

Maintenance.belongsTo(Car, {
	foreignKey: "fk_car_2",
	as: "maintenance_car",
});

module.exports = Maintenance;
