const { matchedData } = require("express-validator");
const { Car } = require("../models"); // Referencia a lo exportado en models/index.js
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
		const data = await Car.findAll({ transaction });
		const searchedBy = {
			vin: car.vin,
			purchase_price: car.purchase_price,
			model: car.model,
		};
		await transaction.commit();
		if (data.length === 0) {
			handleHttpError(res, "ITEMS_NOT_FOUND", 404);
		}
		res.send({ data, searchedBy });
	} catch (err) {
		// Se deshace la transacción en caso de un error:
		if (transaction) await transaction.rollback();

		// Se envía el error:
		handleHttpError(res, "ERROR_GET_ITEMS", 500);
	}
};

/**
 * `getItem` es una función que toma una petición y una respuesta y retorna nada.
 * @param req - The request object.
 * @param res - The response object.
 */
const getItem = async (req, res) => {
	let transaction;
	try {
		const { field, value } = req.query;

		// Se obtiene una instancia de la transacción:
		transaction = await sequelize.transaction();

		// Se ejecuta la consulta dentro de la transacción:
		const data = await Car.findOne({
			where: { [field]: value },
			include: [
				{ model: CarModel },
				{ model: CarCondition },
				{ model: Color },
				{ model: Dealership },
			],
			transaction,
		});

		if (!data) {
			handleHttpError(res, "ITEM_NOT_FOUND", 404);
		}

		// Se confirma la transacción si la consulta se ejecuta correctamente:
		await transaction.commit();

		res.send({ data });
	} catch (err) {
		// Se deshace la transacción en caso de un error:
		if (transaction) await transaction.rollback();

		// Se envía el error:
		handleHttpError(res, "ERROR_GET_ITEM", 500);
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
	let transaction;
	try {
		const body = matchedData(req);

		// Se obtiene una instancia de la transacción:
		transaction = await sequelize.transaction();

		const data = await Car.create(body, { transaction });

		// Si la creación del elemento es exitosa, se confirma la transacción:
		await transaction.commit();

		res.send({ data });
	} catch (err) {
		// Si hay un error, se deshace la transacción:
		if (transaction) await transaction.rollback();

		handleHttpError(res, "ERROR_CREATE_ITEM", 500);
	}
};

/**
 * This function updates an item in the database.
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
const updateItem = async (req, res) => {
	let transaction;
	try {
		const { id, ...body } = matchedData(req);
		// Se obtiene una instancia de la transacción:
		transaction = await sequelize.transaction();

		const data = await Car.findOneAndUpdate(id, body, { transaction });

		// Si la creación del elemento es exitosa, se confirma la transacción:
		await transaction.commit();

		res.send({ data });
	} catch (err) {
		// Si hay un error, se deshace la transacción:
		if (transaction) await transaction.rollback();

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
		const data = await Car.delete({ _id: id }); // Soft delete (el registro no se elimina en la DB).
		// const data = await Car.deleteOne({ _id: id }); // Deletes in DB the register.
		res.send({ data });
	} catch (err) {
		handleHttpError(res, "ERROR_DELETE_ITEM");
	}
};

module.exports = { getItems, getItem, updateItem, createItem, deleteItem };
