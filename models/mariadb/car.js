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
			allowNull: true,
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
		},
		model: {
			type: DataTypes.INTEGER,
			references: {
				model: CarModel,
				key: "id",
			},
			allowNull: false,
		},
		ccondition: {
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
			defaultValue: false,
		},
		photo_url: {
			type: DataTypes.TEXT,
			allowNull: true,
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
		tableName: "car",
		paranoid: true,
	}
);

// Relación de claves foráneas:
Car.belongsTo(CarModel, {
	foreignKey: "model",
	as: "car_model",
});

Car.belongsTo(CarCondition, {
	foreignKey: "ccondition",
	as: "car_condition",
});

Car.belongsTo(Color, {
	foreignKey: "interior_color",
	as: "car_interior_color",
});

Car.belongsTo(Color, {
	foreignKey: "exterior_color",
	as: "car_exterior_color",
});

Car.belongsTo(Dealership, {
	foreignKey: "dealership",
	as: "car_dealership",
});

module.exports = Car;
