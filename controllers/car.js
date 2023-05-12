const { matchedData } = require("express-validator");
const {
	Car,
	CarModel,
	Dealership,
	CarCategory,
	PostalCode,
	CarMaker,
	Transmission,
	Color,
	State,
	CarCondition,
} = require("../models"); // Referencia a lo exportado en models/index.js
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
		const data = await Car.findAll({
			include: [
				{
					model: CarModel,
					attributes: ["id", "name", "year"],
					include: [
						{
							model: CarMaker,
							attributes: ["id", "name"],
							foreignKey: "maker",
						},
						{
							model: Transmission,
							attributes: ["id", "type"],
							foreignKey: "transmission",
						},
						{
							model: CarCategory,
							attributes: ["id", "name"],
							foreignKey: "category",
						},
					],
					foreignKey: "model",
				},
				{
					model: Color,
					attributes: ["id", "name"],
					foreignKey: "interior_color",
				},
				{
					model: Color,
					attributes: ["id", "name"],
					foreignKey: "exterior_color",
				},
				{
					model: Dealership,
					foreignKey: "dealership",
					attributes: [
						"id",
						"name",
						"description",
						"street",
						"exterior_number",
						"neighborhood",
						"country",
					],
					include: [
						{
							model: PostalCode,
							attributes: ["id", "code"],
							foreignKey: "postal_code",
							include: [
								{
									model: State,
									attributes: ["id", "name"],
									foreignKey: "state",
								},
							],
						},
					],
				},
				{
					model: CarCondition,
					attributes: ["id", "type"],
					foreignKey: "car_condition",
				},
			],
			transaction,
			order: [["vin", "ASC"]],
		});

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
		const { vin } = req.query;

		// Se obtiene una instancia de la transacción:
		transaction = await sequelize.transaction();

		// Se ejecuta la consulta dentro de la transacción:
		const data = await Car.findOne({
			where: { vin: vin },
			include: [
				{
					model: CarModel,
					foreignKey: "model",
					attributes: ["id", "name", "year"],
					include: [
						{
							model: CarMaker,
							attributes: ["id", "name"],
							foreignKey: "maker",
						},
						{
							model: Transmission,
							attributes: ["id", "type"],
							foreignKey: "transmission",
						},
						{
							model: CarCategory,
							attributes: ["id", "name"],
							foreignKey: "category",
						},
					],
				},
				{
					model: Color,
					attributes: ["id", "name"],
					foreignKey: "interior_color",
				},
				{
					model: Color,
					attributes: ["id", "name"],
					foreignKey: "exterior_color",
				},
				{
					model: Dealership,
					foreignKey: "dealership",
					attributes: [
						"id",
						"name",
						"description",
						"street",
						"exterior_number",
						"neighborhood",
						"country",
					],
					include: [
						{
							model: PostalCode,
							attributes: ["id", "code"],
							foreignKey: "postal_code",
							include: [
								{
									model: State,
									attributes: ["id", "name"],
									foreignKey: "state",
								},
							],
						},
					],
				},
				{
					model: CarCondition,
					attributes: ["id", "type"],
					foreignKey: "car_condition",
				},
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
