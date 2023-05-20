/**
 * Maneja un error HTTP y envía una respuesta de error al cliente.
 *
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} msg - Mensaje de error (por defecto: "Something happend").
 * @param {number} code - Código de error HTTP (por defecto: 403).
 */
const handleHttpError = (res, msg = "Something happend...", code = 403) => {
	res.status(code).send({ error: msg });
};

module.exports = { handleHttpError };
