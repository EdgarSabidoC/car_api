const { sequelize } = require("../../config/mariadb");
const { DataTypes } = require("sequelize");

// The first part is the structure of the schema:
const Car = sequelize.define(
	"car",
	{
		vin: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		mileage: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		purchase_price: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		sale_price: {
			type: DataTypes.NUMBER,
			allowNull: true,
		},
		maintenance_cost: {
			type: DataTypes.NUMBER,
			defaultValue: 0,
			allowNull: false,
		},
		model: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		car_condition: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		interior_color: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		exterior_color: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		dealership: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		sold: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = Car;
