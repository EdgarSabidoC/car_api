const { sequelize } = require("../../config/mariadb");
const { DataTypes } = require("sequelize");

function createSessionModel() {
	const Session = sequelize.define(
		"session",
		{
			sid: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: false,
			},
			expires: {
				type: DataTypes.DATE,
			},
			data: {
				type: DataTypes.TEXT,
			},
		},
		{ tableName: "session" }
	);
	return Session;
}

module.exports = createSessionModel;
