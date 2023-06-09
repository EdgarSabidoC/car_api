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
		tableName: "maintenance",
		paranoid: true,
	}
);

// Relación de claves foráneas:
Maintenance.belongsTo(MaintenanceType, {
	foreignKey: "maintenance_type",
	as: "maintenance_maintenance_type",
});

Maintenance.belongsTo(Car, {
	foreignKey: "car",
	as: "maintenance_car",
});

module.exports = Maintenance;
