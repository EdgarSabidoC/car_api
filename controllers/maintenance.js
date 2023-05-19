const { Op } = require("sequelize");
const {
	Maintenance,
	Dealership,
	PostalCode,
	State,
	Car,
	CarModel,
	CarMaker,
	Color,
	Transmission,
	CarCategory,
	MaintenanceType,
	CarCondition,
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
		const data = await Maintenance.findAll({
			include: [
				{
					model: MaintenanceType,
					as: "maintenance_maintenance_type",
					attributes: ["id", "concept", "price"],
					foreignKey: "maintenance_type",
				},
				{
					model: Car,
					as: "maintenance_car",
					attributes: ["vin", "mileage", "description", "sale_price"],
					foreignKey: "car",
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
									foreignKey: "car_category",
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
							foreignKey: "car_condition",
						},
					],
				},
			],
			transaction,
			order: [["createdAt", "ASC"]],
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
 * La función getItem busca y devuelve un elemento de la base de datos según el valor del parámetro appointmentIdOrDate.
 * @param {*} req El objeto de solicitud HTTP.
 * @param {*} res El objeto de respuesta HTTP.
 * @returns {Promise} - Promesa que resuelve con un objeto que contiene el elemento.
 * @throws {Error} - Si ocurre un error durante la transacción o si no se encuentra el elemento.
 */
const getItems = async (req, res) => {
	let transaction;
	try {
		const { maintenanceId, vin } = req.params;

		// Se obtiene una instancia de la transacción:
		transaction = await sequelize.transaction();

		// Se ejecuta la consulta dentro de la transacción:
		const data = await Maintenance.findAndCountAll({
			where: { [Op.and]: [{ maintenance_type: maintenanceId }, { car: vin }] },
			include: [
				{
					model: MaintenanceType,
					as: "maintenance_maintenance_type",
					attributes: ["id", "concept", "price"],
					foreignKey: "maintenance_type",
				},
				{
					model: Car,
					as: "maintenance_car",
					attributes: ["vin", "mileage", "description", "sale_price"],
					foreignKey: "car",
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
									foreignKey: "car_category",
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
							foreignKey: "car_condition",
						},
					],
				},
			],
			transaction,
			order: [["createdAt", "ASC"]],
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
		const data = await Maintenance.create(body, { transaction });

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
		const { maintenanceId, vin } = req.params;
		const { body } = req;

		// Se obtiene una instancia de la transacción:
		transaction = await sequelize.transaction();

		// Se busca el registro a actualizar:
		const data = await Maintenance.findOne({
			where: { [Op.and]: [{ maintenance_type: maintenanceId }, { car: vin }] },
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
		const { maintenanceId, vin } = req.params;

		// Se obtiene una instancia de la transacción:
		transaction = await sequelize.transaction();

		// Se ejecuta la consulta dentro de la transacción:
		const data = await Maintenance.findOne({
			where: { [Op.and]: [{ maintenance_type: maintenanceId }, { car: vin }] },
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
				where: {
					[Op.and]: [{ maintenance_type: maintenanceId }, { car: vin }],
				},
				transaction,
			}
		);

		// Actualiza la fecha de destrucción:
		await data.destroy({
			where: { [Op.and]: [{ maintenance_type: maintenanceId }, { car: vin }] },
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
