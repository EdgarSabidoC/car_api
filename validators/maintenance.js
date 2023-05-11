const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const createItemValidator = [
	check("maintenance_type").exists().notEmpty().isInt(),
	check("car").exists().notEmpty().isString().isLength({ min: 17, max: 17 }),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

const getItemValidator = [
	check("maintenanceId").exists().notEmpty().isInt(),
	check("vin").exists().notEmpty().isString().isLength({ min: 17, max: 17 }),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

module.exports = { createItemValidator, getItemValidator };
