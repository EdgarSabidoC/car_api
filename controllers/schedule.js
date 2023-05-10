const { matchedData } = require("express-validator");
const { Schedule } = require("../models"); // Referencia a lo exportado en models/index.js
const { handleHttpError } = require("../utils/handleError");
const { sequelize } = require("../config/mariadb");
const isTime = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;

/**
 * Esta función obtiene una lista de elementos de la base de datos.
 * @param {*} req - El objeto de solicitud HTTP.
 * @param {*} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} - Una promesa que resuelve en un objeto JSON que contiene la lista de elementos.
 * @throws {Error} - Si ocurre un error durante la transaccióno si no se encuentra el elemento.
 */
const getItems = async (req, res) => {
	let transaction;
	try {
		transaction = await sequelize.transaction();

		// Parámetros de paginación:
		// const page = parseInt(req.query.page) || 1;
		// const limit = parseInt(req.query.limit) || 100;
		// const offset = (page - 1) * limit;

		// Se ejecuta la consulta dentro de la transacción:
		const data = await Schedule.findAll({
			transaction,
			order: [["id", "ASC"]],
		});

		// Si no se encuentra ningún registro, se devuelve un error:
		if (data.length === 0) {
			handleHttpError(res, "ERROR_ITEMS_NOT_FOUND", 404);
			return;
		}

		// Se confirma la transacción si la consulta se ejecuta correctamente:
		await transaction.commit();

		// Devuelve los elementos:
		res.send({ data });
	} catch (err) {
		// Se deshace la transacción en caso de un error:
		if (transaction) await transaction.rollback();

		// Se envía el error:
		handleHttpError(res, "ERROR_GET_ITEMS", 500);
	}
};

/**
 * La función getItem busca y devuelve un elemento de la base de datos según el valor del parámetro scheduleIdOrHour.
 * @param {*} req El objeto de solicitud HTTP.
 * @param {*} res El objeto de respuesta HTTP.
 * @returns {Promise} - Promesa que resuelve con un objeto que contiene el elemento.
 * @throws {Error} - Si ocurre un error durante la transacción o si no se encuentra el elemento.
 */
const getItem = async (req, res) => {
	let transaction;
	try {
		const { scheduleIdOrHour } = req.params;

		// Se obtiene una instancia de la transacción:
		transaction = await sequelize.transaction();

		// Se ejecuta la consulta dentro de la transacción:
		const data = await Schedule.findOne({
			attributes: [
				"id",
				[sequelize.literal('DATE_FORMAT(hour, "%H:%i")'), "hour"],
				"createdAt",
				"updatedAt",
				"deleted",
				"deletedAt",
			],
			where: isTime.test(scheduleIdOrHour)
				? { hour: scheduleIdOrHour }
				: { id: scheduleIdOrHour },
			transaction,
		});

		// Si no se encuentra el registro, se devuelve un error:
		if (!data) {
			handleHttpError(res, "ITEM_NOT_FOUND", 404);
			return;
		}

		// Se confirma la transacción si la consulta se ejecuta correctamente:
		await transaction.commit();

		// Devuelve el elemento:
		res.send({ data });
	} catch (err) {
		// Se deshace la transacción en caso de un error:
		if (transaction) await transaction.rollback();

		// Se envía el error:
		handleHttpError(res, "ERROR_GET_ITEM", 500);
	}
};

/**
 * Obtiene una lista de elementos de la tabla schedule utilizando paginación y una transacción de base de datos.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise} - Promesa que resuelve con un objeto que contiene la lista de elementos si la creación fue exitosa.
 * @throws {Error} - Si ocurre un error durante la transacción o si no se encuentra ningún elemento.
 */
const createItem = async (req, res) => {
	let transaction;
	try {
		const { body } = req;

		// Se obtiene una instancia de la transacción:
		transaction = await sequelize.transaction();

		// Se ejecuta la consulta dentro de la transacción:
		const data = await Schedule.create(body, { transaction });

		// Si la creación del elemento es exitosa, se confirma la transacción:
		await transaction.commit();

		// Devuelve los datos creados y un mensaje:
		res.send({ message: "ITEM_CREATED_SUCCESSFULLY", data });
	} catch (err) {
		// Si hay un error, se deshace la transacción:
		if (transaction) await transaction.rollback();

		handleHttpError(res, "ERROR_CREATE_ITEM", 500);
	}
};

/**
 * Obtiene un elemento de la tabla schedule según su ID o código de producto, utilizando una transacción de base de datos.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise} - Promesa que resuelve con un objeto que contiene el elemento si la actualización fue exitosa.
 * @throws {Error} - Si ocurre un error durante la transacción o si no se encuentra el elemento.
 */
const updateItem = async (req, res) => {
	let transaction;
	try {
		const { scheduleIdOrHour } = req.params;
		const { body } = req;

		// Se obtiene una instancia de la transacción:
		transaction = await sequelize.transaction();

		// Se busca el registro a actualizar:
		const data = await Schedule.findOne({
			where: isTime.test(scheduleIdOrHour)
				? { hour: scheduleIdOrHour }
				: { id: scheduleIdOrHour },
			transaction,
		});

		// Si no se encuentra el registro, se devuelve un error:
		if (!data) {
			handleHttpError(res, "ERROR_ITEM_NOT_FOUND", 404);
			return;
		}

		// Agrega el campo updatedAt en los datos que se pasan al método update
		const now = new Date();
		body.updatedAt = now;

		// Actualiza el registro encontrado con los nuevos datos:
		await data.update(body, {
			transaction,
		});

		// Si la actualización del elemento es exitosa, se confirma la transacción:
		await transaction.commit();

		// Devuelve los datos actualizados y un mensaje:
		res.send({ message: "ITEM_UPDATED_SUCCESSFULLY", data });
	} catch (err) {
		// Si hay un error, se deshace la transacción:
		if (transaction) await transaction.rollback();

		handleHttpError(res, "ERROR_UPDATE_ITEM", 500);
	}
};

/**
 * Elimina un elemento de la base de datos.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Object} Un objeto con un mensaje de éxito si la eliminación del elemento es exitosa.
 * @throws {Error} - Si ocurre un error durante la transacción o si no se encuentra el elemento.
 */
const deleteItem = async (req, res) => {
	let transaction;
	try {
		const { scheduleIdOrHour } = req.params;

		// Se obtiene una instancia de la transacción:
		transaction = await sequelize.transaction();

		// Se ejecuta la consulta dentro de la transacción:
		const data = await Schedule.findOne({
			where: isTime.test(scheduleIdOrHour)
				? { hour: scheduleIdOrHour }
				: { id: scheduleIdOrHour },
			transaction,
		});

		// Si no se encuentra el registro, lanza un error:
		if (!data) {
			handleHttpError(res, "ITEM_NOT_FOUND", 404);
			return;
		}

		// Establece el campo "deleted" a true en lugar de eliminar el registro:
		await data.update(
			{ deleted: true },
			{
				where: isTime.test(scheduleIdOrHour)
					? { hour: scheduleIdOrHour }
					: { id: scheduleIdOrHour },
				transaction,
			}
		);

		// Actualiza la fecha de destrucción:
		await data.destroy({
			where: isTime.test(scheduleIdOrHour)
				? { hour: scheduleIdOrHour }
				: { id: scheduleIdOrHour },
			transaction,
		});

		// Si la eliminación del elemento es exitosa, se confirma la transacción:
		await transaction.commit();

		// Enviar una respuesta indicando que la eliminación fue exitosa
		res.send({ message: "ELEMENT_DELETED_SUCCESSFULLY", data });
	} catch (err) {
		// Si hay un error, se deshace la transacción:
		if (transaction) await transaction.rollback();

		handleHttpError(res, "ERROR_DELETE_ITEM", 500);
	}
};

module.exports = { getItems, getItem, updateItem, createItem, deleteItem };
