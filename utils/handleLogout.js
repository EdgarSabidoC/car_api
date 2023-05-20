const LOGIN_URL = process.env.LOGIN_URL;

/**
 * Cierra la sesión del usuario y realiza la redirección a la página de inicio de sesión.
 *
 * @param {object} req - Objeto de solicitud.
 * @param {object} res - Objeto de respuesta.
 */
const logOut = (req, res) => {
	req.session.destroy();
	res.cookie("token", "", { maxAge: 0, httpOnly: true });
	res.redirect(`${LOGIN_URL}`);
};

module.exports = { logOut };
