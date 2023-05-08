const { matchedData } = require("express-validator");
const { carModel } = require("../models"); // Referencia a lo exportado en models/index.js
const { handleHttpError } = require("../utils/handleError");
const { sequelize } = require("../config/mariadb");
const ENGINE_DB = process.env.ENGINE_DB;

/**
 * Esta función obtiene todos los elementos de la base de datos.
 * @param req - The request object. This is an object that represents the HTTP request that the client
 * made to the server.
 * @param res - The response object.
 */
const getItems = async (req, res) => {
	let transaction;
	try {
		transaction = await sequelize.transaction();
		const car = req.car;
		console.log(car);
		const data = await carModel.findAll({ transaction });
		const searchedBy = {
			vin: car.vin,
			purchase_price: car.purchase_price,
			model: car.model,
		};
		await transaction.commit();
		res.send({ data, searchedBy });
	} catch (err) {
		if (transaction) await transaction.rollback();
		let message = err.message;
		if (err instanceof Error && err.name === "SequelizeDatabaseError") {
			message = err.parent.sqlMessage;
		}
		res.status(500).send({ error: message });
		// handleHttpError(res, "ERROR_GET_ITEMS:", err);
	}
};

/**
 * `getItem` es una función que toma una petición y una respuesta y retorna nada.
 * @param req - The request object.
 * @param res - The response object.
 */
const getItem = async (req, res) => {
	try {
		req = matchedData(req);
		const { id } = req;
		const data =
			ENGINE_DB === "mongodb"
				? await carModel.findById(id)
				: await carModel.findOne({ where: { id } });
		res.send({ data });
	} catch (err) {
		handleHttpError(res, "ERROR_GET_ITEM");
	}
};

/**
 * This function creates a new item in the database.
 * @param req - The request object. This is an object that represents the HTTP request that the client
 * sent to the server. It contains information about the request, including the URL, the HTTP headers,
 * and much more.
 * @param res - The response object.
 */
const createItem = async (req, res) => {
	try {
		const body = matchedData(req);
		const data = await carModel.create(body);
		res.send({ data });
	} catch (err) {
		handleHttpError(res, "ERROR_CREATE_ITEM");
	}
};

/**
 * This function updates an item in the database.
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
const updateItem = async (req, res) => {
	try {
		const { id, ...body } = matchedData(req);
		const data = await carModel.findOneAndUpdate(id, body);
		res.send({ data });
	} catch (err) {
		handleHttpError(res, "ERROR_UPDATE_ITEM");
	}
};

/**
 * This function deletes an item from the database.
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
const deleteItem = async (req, res) => {
	try {
		req = matchedData(req);
		const { id } = req;
		const data = await carModel.delete({ _id: id }); // Soft delete (el registro no se elimina en la DB).
		// const data = await carModel.deleteOne({ _id: id }); // Deletes in DB the register.
		res.send({ data });
	} catch (err) {
		handleHttpError(res, "ERROR_DELETE_ITEM");
	}
};

module.exports = { getItems, getItem, updateItem, createItem, deleteItem };
