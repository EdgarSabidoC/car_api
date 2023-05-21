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
const PUBLIC_URL = process.env.PUBLIC_URL;

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
		const data = await Car.findAll({
			include: [
				{
					model: CarModel,
					as: "car_model",
					foreignKey: "model",
					attributes: ["id", "name", "year"],
					include: [
						{
							model: Transmission,
							as: "model_transmission",
							attributes: ["id", "type"],
							foreignKey: "transmission",
						},
						{
							model: Color,
							as: "model_color",
							attributes: ["id", "name"],
							foreignKey: "color",
						},
						{
							model: CarMaker,
							as: "model_maker",
							attributes: ["id", "name"],
							foreignKey: "maker",
						},
						{
							model: CarCategory,
							as: "model_category",
							attributes: ["id", "name"],
							foreignKey: "category",
						},
					],
				},
				{
					model: Color,
					as: "car_interior_color",
					attributes: ["id", "name"],
					foreignKey: "interior_color",
				},
				{
					model: Color,
					as: "car_exterior_color",
					attributes: ["id", "name"],
					foreignKey: "exterior_color",
				},
				{
					model: Dealership,
					as: "car_dealership",
					foreignKey: "dealership",
					attributes: [
						"id",
						"name",
						"description",
						"street",
						"exterior_number",
						"neighborhood",
					],
					include: [
						{
							model: PostalCode,
							as: "dealership_postal_code",
							attributes: ["id", "code"],
							foreignKey: "postal_code",
							include: [
								{
									model: State,
									as: "postal_code_state",
									attributes: ["id", "name"],
									foreignKey: "state",
								},
							],
						},
					],
				},
				{
					model: CarCondition,
					as: "car_condition",
					attributes: ["id", "type"],
					foreignKey: "ccondition",
				},
			],
			transaction,
			order: [["vin", "ASC"]],
		});

		if (data.length === 0) {
			handleHttpError(res, "ITEMS_NOT_FOUND", 404);
			return;
		}

		// Se hace el commit de la transacción:
		await transaction.commit();

		res.send({ data });
	} catch (err) {
		console.log("ERROR: ", err);
		// Se deshace la transacción en caso de un error:
		if (transaction) await transaction.rollback();

		// Se envía el error:
		handleHttpError(res, "ERROR_GET_ITEMS", 500);
	}
};

/**
 * La función getItem busca y devuelve un elemento de la base de datos según el valor del parámetro pcIdOrPc.
 * @param {*} req El objeto de solicitud HTTP.
 * @param {*} res El objeto de respuesta HTTP.
 * @returns {Promise} - Promesa que resuelve con un objeto que contiene el elemento.
 * @throws {Error} - Si ocurre un error durante la transaccióno si no se encuentra el elemento.
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
					as: "car_model",
					foreignKey: "model",
					attributes: ["id", "name", "year"],
					include: [
						{
							model: Transmission,
							as: "model_transmission",
							attributes: ["id", "type"],
							foreignKey: "transmission",
						},
						{
							model: Color,
							as: "model_color",
							attributes: ["id", "name"],
							foreignKey: "color",
						},
						{
							model: CarMaker,
							as: "model_maker",
							attributes: ["id", "name"],
							foreignKey: "maker",
						},
						{
							model: CarCategory,
							as: "model_category",
							attributes: ["id", "name"],
							foreignKey: "category",
						},
					],
				},
				{
					model: Color,
					as: "car_interior_color",
					attributes: ["id", "name"],
					foreignKey: "interior_color",
				},
				{
					model: Color,
					as: "car_exterior_color",
					attributes: ["id", "name"],
					foreignKey: "exterior_color",
				},
				{
					model: Dealership,
					as: "car_dealership",
					foreignKey: "dealership",
					attributes: [
						"id",
						"name",
						"description",
						"street",
						"exterior_number",
						"neighborhood",
					],
					include: [
						{
							model: PostalCode,
							as: "dealership_postal_code",
							attributes: ["id", "code"],
							foreignKey: "postal_code",
							include: [
								{
									model: State,
									as: "postal_code_state",
									attributes: ["id", "name"],
									foreignKey: "state",
								},
							],
						},
					],
				},
				{
					model: CarCondition,
					as: "car_condition",
					attributes: ["id", "type"],
					foreignKey: "ccondition",
				},
			],
			transaction,
		});

		if (!data) {
			handleHttpError(res, "ITEM_NOT_FOUND", 404);
			return;
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
 * Obtiene una lista de elementos de la tabla car utilizando paginación y una transacción de base de datos.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise} - Promesa que resuelve con un objeto que contiene la lista de elementos si la creación fue exitosa.
 * @throws {Error} - Si ocurre un error durante la transacción o si no se encuentra ningún elemento.
 */
const createItem = async (req, res) => {
	let transaction;
	try {
		// Verificar si el archivo ya existe
		if (req.skipFileUpload) {
			handleHttpError(res, "ERROR_FILE_ALREADY_EXISTS", 409);
			return;
		}
		const body = req.body;

		// Nombre de la imagen desde req:
		const imageFilename = req.imageFilename;
		body.car_image = imageFilename;

		// Se obtiene una instancia de la transacción:
		transaction = await sequelize.transaction();

		const data = await Car.create(body, { transaction });

		if (!data) {
			handleHttpError(res, "ERROR_CREATE_ITEM", 500);
			return;
		}

		// Si la creación del elemento es exitosa, se confirma la transacción:
		await transaction.commit();

		res.send({ data });
	} catch (err) {
		console.log("ERROR: ", err);
		// Si hay un error, se deshace la transacción:
		if (transaction) await transaction.rollback();

		handleHttpError(res, "ERROR_CREATE_ITEM", 500);
	}
};

/**
 * Obtiene un elemento de la tabla car según su VIN, utilizando una transacción de base de datos.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise} - Promesa que resuelve con un objeto que contiene el elemento si la actualización fue exitosa.
 * @throws {Error} - Si ocurre un error durante la transacción o si no se encuentra el elemento.
 */
const updateItem = async (req, res) => {
	let transaction;
	try {
		const { vin } = req.params;
		const body = req.body;

		// Nombre de la imagen desde req:
		const imageFilename = req.imageFilename;
		body.car_image = imageFilename;

		// Se obtiene una instancia de la transacción:
		transaction = await sequelize.transaction();

		// Se busca el registro a actualizar:
		const data = await Car.findOne({ where: { vin: vin }, transaction });

		if (!data) {
			handleHttpError(res, "ERROR_UPDATE_ITEM", 500);
			return;
		}

		// Actualiza el registro encontrado con los nuevos datos:
		await data.update(body, {
			transaction,
		});

		// Si la creación del elemento es exitosa, se confirma la transacción:
		await transaction.commit();

		res.send({ data });
	} catch (err) {
		console.log("ERROR: ", err);
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
		const { vin } = req.params;

		// Se obtiene una instancia de la transacción:
		transaction = await sequelize.transaction();

		// Se ejecuta la consulta dentro de la transacción:
		const data = await Car.findOne({
			where: { vin: vin },
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
				where: { vin: vin },
				transaction,
			}
		);

		// Actualiza la fecha de destrucción:
		await data.destroy({
			where: { vin: vin },
			transaction,
		});

		// Si la eliminación del elemento es exitosa, se confirma la transacción:
		await transaction.commit();

		// Enviar una respuesta indicando que la eliminación fue exitosa
		res.send({ message: "ELEMENT_DELETED_SUCCESSFULLY", data });
	} catch (err) {
		console.log("ERROR: ", err);
		// Si hay un error, se deshace la transacción:
		if (transaction) await transaction.rollback();

		handleHttpError(res, "ERROR_DELETE_ITEM", 500);
	}
};

module.exports = { getItems, getItem, updateItem, createItem, deleteItem };
