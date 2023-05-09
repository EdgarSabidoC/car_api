const { matchedData } = require("express-validator");
const { Color } = require("../models"); // Referencia a lo exportado en models/index.js
const { handleHttpError } = require("../utils/handleError");
const { sequelize } = require("../config/mariadb");
const ENGINE_DB = process.env.ENGINE_DB;

/**
 * getItems` es una función que obtiene todos los elementos de la base de datos.
 * @param req - El objeto de la petición.
 * @param res - El objeto de la respuesta.
 */
const getItems = async (req, res) => {
	let transaction;
	try {
		transaction = await sequelize.transaction();

		// Parámetros de paginación:
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 100;
		const offset = (page - 1) * limit;

		// Se ejecuta la consulta dentro de la transacción:
		const data = await Color.findAll({
			transaction,
			offset,
			limit,
			order: [["id", "ASC"]],
		});
		// Se confirma la transacción si la consulta se ejecuta correctamente:
		await transaction.commit();

		if (data.length === 0) {
			handleHttpError(res, "ITEMS_NOT_FOUND", 404);
		}
		res.send({ data });
	} catch (err) {
		// Se deshace la transacción en caso de un error:
		if (transaction) await transaction.rollback();

		// Se envía el error:
		handleHttpError(res, "ERROR_GET_ITEMS", 500);
	}
};

/**
 * `getItem` es una función que toma una petición y una respuesta y retorna nada.
 * @param req - El objeto de la petición.
 * @param res - El objeto de la respuesta.
 */
const getItem = async (req, res) => {
	let transaction;
	try {
		const { colorIdOrName } = req.params;

		// Se obtiene una instancia de la transacción:
		transaction = await sequelize.transaction();

		// Se ejecuta la consulta dentro de la transacción:
		const data = await Color.findOne({
			where: isNaN(colorIdOrName)
				? { name: colorIdOrName }
				: { id: colorIdOrName },
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
		const { body } = req;

		// Se obtiene una instancia de la transacción:
		transaction = await sequelize.transaction();

		// Se ejecuta la consulta dentro de la transacción:
		const data = await Color.create(body, { transaction });

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
		const { colorIdOrName } = req.params;
		const { body } = req;

		// Se obtiene una instancia de la transacción:
		transaction = await sequelize.transaction();

		// Busca el registro a actualizar:
		const data = await Color.findOne({
			where: isNaN(colorIdOrName)
				? { name: colorIdOrName }
				: { id: colorIdOrName },
			transaction,
		});

		// Si no se encuentra el registro, se devuelve un error:
		if (!data) {
			throw new Error("Color not found");
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

		// Devuelve los datos actualizados
		res.send({ message: "Elemento actualizado correctamente" });
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
	let transaction;
	try {
		const { colorIdOrName } = req.params;

		// Se obtiene una instancia de la transacción:
		transaction = await sequelize.transaction();

		// Se ejecuta la consulta dentro de la transacción:
		const data = await Color.findOne({
			where: isNaN(colorIdOrName)
				? { name: colorIdOrName }
				: { id: colorIdOrName },
			transaction,
		});

		// Si no se encuentra el registro, lanza un error:
		if (!data) {
			handleHttpError(res, "ITEM_NOT_FOUND", 404);
			return;
		}

		// Establece el campo "deleted" a true en lugar de eliminar el registro:
		await data.update(
			{ deletedAt: new Date() },
			{
				where: isNaN(colorIdOrName)
					? { name: colorIdOrName }
					: { id: colorIdOrName },
				transaction,
			}
		);

		// Si la eliminación del elemento es exitosa, se confirma la transacción:
		await transaction.commit();

		// Enviar una respuesta indicando que la eliminación fue exitosa
		res.send({ message: "Elemento eliminado correctamente" });
	} catch (err) {
		// Si hay un error, se deshace la transacción:
		if (transaction) await transaction.rollback();

		handleHttpError(res, "ERROR_DELETE_ITEM");
	}
};

module.exports = { getItems, getItem, updateItem, createItem, deleteItem };
