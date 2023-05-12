const { matchedData } = require("express-validator");
const {
	Appointment,
	Dealership,
	PostalCode,
	State,
	Transmission,
	Car,
	CarModel,
	CarMaker,
	Color,
	CarCategory,
} = require("../models"); // Referencia a lo exportado en models/index.js
const { handleHttpError } = require("../utils/handleError");
const { sequelize } = require("../config/mariadb");

/**
 * Esta función obtiene una lista de elementos de la base de datos.
 * @param {*} req - El objeto de solicitud HTTP.
 * @param {*} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} - Una promesa que resuelve en un objeto JSON que contiene la lista de elementos.
 * @throws {Error} - Si ocurre un error durante la transaccióno si no se encuentra el elemento.
 */
const getAllItems = async (req, res) => {
	let transaction;
	try {
		transaction = await sequelize.transaction();

		// Parámetros de paginación:
		// const page = parseInt(req.query.page) || 1;
		// const limit = parseInt(req.query.limit) || 100;
		// const offset = (page - 1) * limit;

		// Se ejecuta la consulta dentro de la transacción:
		const data = await Appointment.findAll({
			include: [
				{
					model: Dealership,
					foreignKey: "dealership",
					as: "appointment_dealership",
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
							attributes: ["id", "code"],
							foreignKey: "postal_code",
							as: "dealership_postal_code",
							include: [
								{
									model: State,
									attributes: ["id", "name"],
									as: "postal_code_state",
									foreignKey: "state",
								},
							],
						},
					],
				},
				{
					model: Car,
					attributes: ["vin", "mileage", "description", "sale_price"],
					foreignKey: "car",
					include: [
						{
							model: CarModel,
							foreignKey: "model",
							as: "appointment_car",
							attributes: ["id", "name", "year"],
							include: [
								{
									model: CarMaker,
									as: "model_maker",
									attributes: ["id", "name"],
									foreignKey: "maker",
								},
								{
									model: Transmission,
									as: "model_transmission",
									attributes: ["id", "type"],
									foreignKey: "transmission",
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
					],
				},
			],
			transaction,
			order: [
				["appointment_date", "ASC"],
				["appointment_time", "ASC"],
			],
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
		handleHttpError(res, "ERROR_GET_ALL_ITEMS", 500);
	}
};

/**
 * Esta función busca y devuelve elementos de la base de datos según el valor de los parámetros date y time.
 * @param {*} req El objeto de solicitud HTTP.
 * @param {*} res El objeto de respuesta HTTP.
 * @returns {Promise} - Promesa que resuelve con un objeto que contiene el elemento.
 * @throws {Error} - Si ocurre un error durante la transacción o si no se encuentra el elemento.
 */
const getItems = async (req, res) => {
	let transaction;
	try {
		const { date, time } = req.params;

		// Se obtiene una instancia de la transacción:
		transaction = await sequelize.transaction();

		// Se ejecuta la consulta dentro de la transacción:
		const data = await Appointment.findAndCountAll({
			where: { appointment_date: date, appointment_time: time },
			include: [
				{
					model: Dealership,
					foreignKey: "dealership",
					as: "appointment_dealership",
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
							attributes: ["id", "code"],
							foreignKey: "postal_code",
							as: "dealership_postal_code",
							include: [
								{
									model: State,
									attributes: ["id", "name"],
									as: "postal_code_state",
									foreignKey: "state",
								},
							],
						},
					],
				},
				{
					model: Car,
					attributes: ["vin", "mileage", "description", "sale_price"],
					foreignKey: "car",
					include: [
						{
							model: CarModel,
							foreignKey: "model",
							as: "appointment_car",
							attributes: ["id", "name", "year"],
							include: [
								{
									model: CarMaker,
									as: "model_maker",
									attributes: ["id", "name"],
									foreignKey: "maker",
								},
								{
									model: Transmission,
									as: "model_transmission",
									attributes: ["id", "type"],
									foreignKey: "transmission",
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
					],
				},
			],
			transaction,
			order: [
				["appointment_date", "ASC"],
				["appointment_time", "ASC"],
			],
		});

		// Si no se encuentran los registros, se devuelve un error:
		if (!data) {
			handleHttpError(res, "ERROR_ITEMS_NOT_FOUND", 404);
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
		handleHttpError(res, "ERROR_GET_ITEMS", 500);
	}
};

/**
 * Obtiene una lista de elementos de la tabla appointment utilizando paginación y una transacción de base de datos.
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
		const data = await Appointment.create(body, { transaction });

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
 * Obtiene un elemento de la tabla appointment según su ID o código de producto, utilizando una transacción de base de datos.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise} - Promesa que resuelve con un objeto que contiene el elemento si la actualización fue exitosa.
 * @throws {Error} - Si ocurre un error durante la transacción o si no se encuentra el elemento.
 */
const updateItem = async (req, res) => {
	let transaction;
	try {
		const { appointmentId } = req.params;
		const { body } = req;

		// Se obtiene una instancia de la transacción:
		transaction = await sequelize.transaction();

		// Se busca el registro a actualizar:
		const data = await Appointment.findOne({
			where: { id: appointmentId },
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
		const { appointmentId } = req.params;

		// Se obtiene una instancia de la transacción:
		transaction = await sequelize.transaction();

		// Se ejecuta la consulta dentro de la transacción:
		const data = await Appointment.findOne({
			where: { id: appointmentId },
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
				where: { id: appointmentId },
				transaction,
			}
		);

		// Actualiza la fecha de destrucción:
		await data.destroy({
			where: { id: appointmentId },
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

module.exports = {
	getAllItems,
	getItems,
	updateItem,
	createItem,
	deleteItem,
};
