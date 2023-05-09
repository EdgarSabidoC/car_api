const { sequelize } = require("../../config/mariadb");
const { DataTypes } = require("sequelize");

// Modelos de sequelize de las tablas de la DB:
const CarModel = require("./car_model");
const CarCondition = require("./car_condition");
const Color = require("./color");
const Dealership = require("./dealership");

// Estructura del schema:
const Car = sequelize.define(
	"car",
	{
		vin: {
			type: DataTypes.STRING,
			primaryKey: true,
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
			type: DataTypes.DECIMAL,
			allowNull: false,
		},
		sale_price: {
			type: DataTypes.DECIMAL,
			allowNull: true,
		},
		maintenance_cost: {
			type: DataTypes.DECIMAL,
			defaultValue: 0,
			allowNull: false,
		},
		model: {
			type: DataTypes.INTEGER,
			references: {
				model: CarModel,
				key: "id",
			},
			allowNull: false,
		},
		car_condition: {
			type: DataTypes.INTEGER,
			references: {
				model: CarCondition,
				key: "id",
			},
			allowNull: false,
		},
		interior_color: {
			type: DataTypes.INTEGER,
			references: {
				model: Color,
				key: "id",
			},
			allowNull: false,
		},
		exterior_color: {
			type: DataTypes.INTEGER,
			references: {
				model: Color,
				key: "id",
			},
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
		sold: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
	},
	{
		timestamps: true,
		tableName: "car",
	}
);

// Relación de claves foráneas:
Car.belongsTo(CarModel, {
	foreignKey: "fk_model",
	as: "car_model",
});

Car.belongsTo(CarCondition, {
	foreignKey: "fk_car_condition",
	as: "car_condition_as",
});

Car.belongsTo(Color, {
	foreignKey: "fk_interior_color",
	as: "car_interior_color_as",
});

Car.belongsTo(Color, {
	foreignKey: "fk_exterior_color",
	as: "car_exterior_color_as",
});

Car.belongsTo(Dealership, {
	foreignKey: "fk_dealership_2",
	as: "car_dealership_as",
});

module.exports = Car;
