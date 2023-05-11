const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const createItemValidator = [
	check("googleId").exists().notEmpty().isAlphanumeric(),
	check("first_name").exists().notEmpty().isString().isLength({ max: 75 }),
	check("last_name_1").exists().notEmpty().isString().isLength({ max: 75 }),
	check("last_name_2").optional().notEmpty().isString().isLength({ max: 75 }),
	check("email").exists().notEmpty().isEmail(),
	check("dealership").optional().notEmpty().isInt(),
	check("user_role").optional().notEmpty().isInt(),
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
