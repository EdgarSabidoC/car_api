const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");
const ENGINE_DB = process.env.ENGINE_DB;

const createItemValidator = [
	check("name").exists().notEmpty().isLength({ min: 5, max: 90 }),
	check("album").exists().notEmpty().isLength({ min: 5, max: 90 }),
	check("cover").exists().notEmpty().isLength({ min: 5, max: 90 }),
	check("artist_name").exists().notEmpty(),
	check("artist_nickname").exists().notEmpty(),
	check("artist_nationality").exists().notEmpty(),
	check("duration_start").exists().notEmpty(),
	check("duration_end").exists().notEmpty(),
	check("mediaId").exists().notEmpty().isNumeric(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

const getItemValidator = [
	check("id").exists().notEmpty().isMongoId(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

module.exports = { createItemValidator, getItemValidator };
