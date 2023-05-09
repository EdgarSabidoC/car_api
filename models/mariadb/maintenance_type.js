const { sequelize } = require("../../config/mariadb");
const { DataTypes } = require("sequelize");

// Estructura del schema:
const MaintenanceType = sequelize.define(
	"maintenance_type",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
		},
		concept: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price: {
			type: DataTypes.DECIMAL,
			allowNull: false,
		},
	},
	{
		timestamps: false,
		tableName: "maintenance_type",
	}
);

module.exports = MaintenanceType;
