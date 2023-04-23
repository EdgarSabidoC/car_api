const { Sequelize } = require("sequelize");
const database = process.env.MARIADB_DATABASE;
const username = process.env.MARIADB_USER;
const password = process.env.MARIADB_PASSWORD;
const host = process.env.MARIADB_HOST;

const sequelize = new Sequelize(database, username, password, {
	host,
	dialect: "mariadb",
	operatorsAliases: 0,
});

const dbConnectMariaDB = async () => {
	try {
		await sequelize.authenticate();
		console.log("*** SUCCESSFUL CONNECTION ***");
	} catch (err) {
		console.log("*** ERROR: CANNOT CONNECT TO DB ***");
	}
};

module.exports = { sequelize, dbConnectMariaDB };
