const { sequelize } = require("../../config/mariadb");
const { DataTypes } = require("sequelize");

// Modelos de sequelize:
const Transmission = require("./transmission");
const Color = require("./color");
const CarCategory = require("./car_category");
const CarMaker = require("./car_maker");

// Estructura del schema:
const CarModel = sequelize.define(
	"car_model",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		year: {
			type: DataTypes.NUMBER,
			allowNull: true,
		},
		factory_price: {
			type: DataTypes.DECIMAL,
			allowNull: true,
		},
		transmission: {
			type: DataTypes.INTEGER,
			references: {
				model: Transmission,
				key: "id",
			},
			allowNull: false,
		},
		color: {
			type: DataTypes.INTEGER,
			references: {
				model: Color,
				key: "id",
			},
			allowNull: false,
		},
		category: {
			type: DataTypes.INTEGER,
			references: {
				model: CarCategory,
				key: "id",
			},
			allowNull: false,
		},
		maker: {
			type: DataTypes.INTEGER,
			references: {
				model: CarMaker,
				key: "id",
			},
			allowNull: false,
		},
	},
	{
		timestamps: true,
		tableName: "car_model",
	}
);

// Relación de claves foráneas:
CarModel.belongsTo(Transmission, {
	foreignKey: "fk_transmission",
	as: "model_transmission",
});

CarModel.belongsTo(Color, {
	foreignKey: "fk_color",
	as: "model_color",
});

CarModel.belongsTo(CarCategory, {
	foreignKey: "fk_car_category",
	as: "model_category",
});

CarModel.belongsTo(CarMaker, {
	foreignKey: "fk_maker",
	as: "model_maker",
});

module.exports = CarModel;
