const { Log } = require("../models");
const { sequelize } = require("../config/mariadb");

/**
 * Middleware para registrar un registro en la bitácora de la base de datos.
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función de siguiente middleware.
 * @throws {Error} Si ocurre un error al registrar el log.
 */
const recordLog = async (req, res, next) => {
	let transaction;
	try {
		// Se obtiene una instancia de la transacción:
		transaction = await sequelize.transaction();
		const data = {
			ip: req.ip,
			event: "Client access from web",
			method: `${req.method}`,
			observation: "request",
			url: `${req.originalUrl}`,
			body: `${JSON.stringify(req.body)}`,
		};

		// Se ejecuta la consulta dentro de la transacción:
		const newData = await Log.create(data, { transaction });

		if (!newData) {
			throw new Error("LOG_NOT_RECORDED");
		}

		// Si la creación del elemento es exitosa, se confirma la transacción:
		await transaction.commit();
		next();
	} catch (err) {
		// Si hay un error, se deshace la transacción:
		if (transaction) await transaction.rollback();
		res.status(500);
		res.send({ errors: `INTERNAL_SERVER_ERROR_${err}` });
	}
};

module.exports = { recordLog };
