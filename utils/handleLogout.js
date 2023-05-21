const LOGIN_URL = process.env.LOGIN_URL;
const WEBSITE_URL = process.env.WEBSITE_URL;
/**
 * Cierra la sesión del usuario y realiza la redirección a la página de inicio de sesión.
 *
 * @param {object} req - Objeto de solicitud.
 * @param {object} res - Objeto de respuesta.
 */
const logOut = (req, res) => {
	req.session.destroy(); // Se destruye la sesión.
	res.cookie("token", "", { maxAge: 0, httpOnly: true }); // Se destruye la cookie con el token.
	// Se configuran los encabezados:
	res.setHeader("Access-Control-Allow-Origin", `${WEBSITE_URL}`);
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.redirect(`${LOGIN_URL}`);
};

// (req, res) => {
// 	req.session.destroy(); // Se destruye la sesión.
// 	res.cookie("token", "", { maxAge: 0, httpOnly: true }); // Se destruye la cookie con el token.
// 	// Se configuran los encabezados:
// 	res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
// 	res.setHeader("Access-Control-Allow-Credentials", "true");

// 	// Se envía el estado de la respuesta:
// 	res.status(200).json({ message: "Logout successful!" });
// };

module.exports = { logOut };
