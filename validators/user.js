const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const createItemValidator = [
	check("googleId").exists().notEmpty().isAlphanumeric(),
	check("first_name").exists().notEmpty().isAlpha(),
	check("last_name_1").exists().notEmpty().isAlpha(),
	check("email").exists().notEmpty().isEmail(),
	check("dealership").exists().notEmpty().isNumeric(),
	check("user_role").exists().notEmpty().isNumeric(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

const getItemValidator = [
	check("userIdOrEmail").exists().notEmpty(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

module.exports = { createItemValidator, getItemValidator };
