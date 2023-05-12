const { signToken } = require("../utils/handleJwt");

// Nueva función que maneja la redirección de autenticación
const handleAuthCallback = async (req, res) => {
	try {
		const user = req.user;

		// Generamos el token
		const data = await signToken(user);

		// Configuramos la cookie con el token
		res.cookie("token", data, {
			httpOnly: true,
			maxAge: 3600000,
		}); // La cookie dura 1h.

		res.redirect("http://localhost:4200/home");
	} catch (error) {
		console.error(error);
	}
};

module.exports = handleAuthCallback;
