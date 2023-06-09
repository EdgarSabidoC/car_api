const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { sequelize } = require("../config/mariadb");
const { User } = require("../models");
const WEBSITE_URL = process.env.WEBSITE_URL;

/**
 * Middleware para autenticación y verificación del token JWT.
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar al siguiente middleware.
 * @returns {Promise<void>} Promesa que indica la finalización del middleware.
 * @throws {Error} Si ocurre un error al autenticar al usuario.
 */
const authMiddleware = async (req, res, next) => {
	try {
		if (!req.session || !req.session.cookie || !req.session.cookie.expires) {
			if (res.cookie) {
				res.cookie("token", "", { maxAge: 0, httpOnly: true }); // Se destruye la cookie con el token si existe.
			}
			// La sesión ha caducado.
			res.setHeader("Access-Control-Allow-Origin", `${WEBSITE_URL}`);
			res.setHeader("Access-Control-Allow-Credentials", "true");
			res.status(200).json({ message: "Logout successful!" });
		}

		if (!req.cookies.token) {
			handleHttpError(res, "ERROR_TOKEN_NOT_FOUND", 401);
			return;
		}

		const token = req.cookies.token; //  Obtiene el token de la cookie httpOnly
		const tokenData = await verifyToken(token);

		if (!tokenData) {
			handleHttpError(res, "ERROR_PAYLOAD_DATA_NOT_FOUND", 401);
			return;
		}

		// Se busca el usuario por correo electrónico:
		const query = { email: tokenData.email };

		// Se obtiene una instancia de la transacción:
		const transaction = await sequelize.transaction();

		// Se ejecuta la consulta dentro de la transacción:
		const user = await User.findOne({
			where: query,
			transaction,
		});

		// Si no se encuentra el usuario, se lanza un error:
		if (!user) {
			handleHttpError(res, "USER_NOT_FOUND", 404);
			return;
		}

		// Establece el campo "googleId" si está vacío:
		await user.update(
			{ googleId: tokenData.id },
			{
				where: { query, googleId: null },
				transaction,
			}
		);

		// Si la eliminación del elemento es exitosa, se confirma la transacción:
		await transaction.commit();
		req.user = user;
		next();
	} catch (err) {
		console.log("ERROR: ", err);
		handleHttpError(res, "ERROR_SESSION_NOT_FOUND", 401);
	}
};

module.exports = { authMiddleware };
