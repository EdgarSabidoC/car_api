const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");
const ENGINE_DB = process.env.ENGINE_DB;

const createItemValidator = [
	check("vin")
		.exists()
		.notEmpty()
		.matches(/^[A-HJ-NPR-Z\d]{8}[X\d][A-HJ-NPR-Z\d]{2}\d{6}$/),
	check("mileage").exists().notEmpty().isInt(),
	check("description").optional().notEmpty().isString(),
	check("purchase_price")
		.exists()
		.notEmpty()
		.isDecimal({ decimal_digits: "1,4" }),
	check("sale_price")
		.optional()
		.notEmpty()
		.isDecimal({ decimal_digits: "1,4" }),
	check("maintenance_cost")
		.optional()
		.notEmpty()
		.isDecimal({ decimal_digits: "1,4" }),
	check("model").exists().notEmpty().isInt(),
	check("car_condition").exists().notEmpty().isInt(),
	check("interior_color").exists().notEmpty().isInt(),
	check("exterior_color").exists().notEmpty().isInt(),
	check("dealership").exists().notEmpty().isInt(),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

const getItemValidator = [
	check("vin")
		.exists()
		.notEmpty()
		.matches(/^[A-HJ-NPR-Z\d]{8}[X\d][A-HJ-NPR-Z\d]{2}\d{6}$/),
	(req, res, next) => {
		return validateResults(req, res, next);
	},
];

module.exports = { createItemValidator, getItemValidator };
