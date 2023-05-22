const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { sequelize } = require("./mariadb");
const createSessionModel = require("../models/mariadb/session")();
const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionConf = {
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
		model: createSessionModel,
		table: "session",
		modelKey: "sid",
		expiration: 60 * 60 * 1000 * 6, // 6h
	}),
	cookie: {
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 60 * 60 * 1000 * 6, // 6h
	},
};

module.exports = session(sessionConf);
