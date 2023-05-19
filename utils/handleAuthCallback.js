const { signToken } = require("../utils/handleJwt");
const HOME_URL = process.env.HOME_URL;

// Nueva función que maneja la redirección de autenticación
const handleAuthCallback = async (req, res, next) => {
	try {
		// Se obtiene el usuario que inició sesión:
		const user = req.user;

		// Se verifica si está en modo desarrollador:
		const dev = process.env.NODE_ENV !== "development";

		// Se genera el token:
		const data = await signToken(user);

		// Configuramos la cookie con el token
		res.cookie("token", data, {
			httpOnly: dev,
			secure: dev,
			maxAge: 3600000,
		}); // La cookie dura 1h.

		// Se almacena el rol del usuario en la sesión:
		const role = user.user_role;
		req.session.role = role;

		if (role === 1) {
			// Si es admin:
			res.redirect(`${HOME_URL}`);
		}
		// } else if (role === 2) {
		// 	// Si es capturist:
		// 	res.redirect("http://localhost:4200/cars-for-sale");
		// }
		// // Si no es un usuario:
		// res.redirect("http://localhost:4200/login");
	} catch (error) {
		console.error(error);
	}
};

module.exports = handleAuthCallback;
