const { sequelize } = require("../../config/mariadb");
const { DataTypes } = require("sequelize");

const State = require("./state");

// Estructura del schema:
const PostalCode = sequelize.define(
	"postal_code",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		code: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		state: {
			type: DataTypes.INTEGER,
			references: {
				model: State,
				key: "id",
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
		tableName: "postal_code",
		paranoid: true,
	}
);

// Relación de claves foráneas:
PostalCode.belongsTo(State, {
	foreignKey: "state",
	as: "postal_code_state",
});

module.exports = PostalCode;
