const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const { User } = require("../models");
const { Op } = require("sequelize");
const FAILURE_URL = process.env.FAILURE_URL;

/**
 * Serializa al usuario para almacenar su identificación en la sesión.
 * @param {Object} user - Objeto que representa al usuario.
 * @param {function} done - Función de callback para indicar la finalización.
 */
passport.serializeUser(function (user, done) {
	done(null, user);
});

/**
 * Deserializa al usuario a partir de su identificación almacenada en la sesión.
 * @param {Object} user - Objeto que representa al usuario.
 * @param {function} done - Función de callback para indicar la finalización.
 */
passport.deserializeUser(function (user, done) {
	done(null, user);
});

/**
 * Configuración de la estrategia de autenticación de Google.
 * @param {Object} options - Opciones de configuración de la estrategia.
 * @param {string} options.clientID - ID del cliente de Google.
 * @param {string} options.clientSecret - Clave secreta del cliente de Google.
 * @param {string} options.callbackURL - URL de devolución de llamada de Google.
 * @param {boolean} options.passReqToCallback - Indica si se pasa la solicitud a la función de devolución de llamada.
 * @param {function} verify - Función de devolución de llamada para verificar y autenticar al usuario.
 */
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL,
			passReqToCallback: true,
		},
		async (req, accessToken, refreshToken, profile, done) => {
			try {
				// Se busca al usuario por su email o su googleId:
				const user = await User.findOne({
					where: {
						[Op.or]: [
							{ email: profile.emails[0].value },
							{ googleId: profile.id },
						],
					},
				});

				//Si el usuario no existe:
				if (!user) {
					throw new Error("USER_NOT_FOUND");
				}

				// Si el usuario ya existe, lo devuelve
				return done(null, user);
			} catch (error) {
				return done(null, null, error);
			}
		}
	)
);

/**
 * Middleware para autenticar al usuario utilizando la estrategia de Google.
 * @type {function}
 */
const authenticate = passport.authenticate("google", {
	scope: ["email", "profile"],
});

/**
 * Callback para manejar el resultado de la autenticación de Google.
 * @type {function}
 * @param {string} failureRedirect - URL de redirección en caso de fallo en la autenticación.
 */
const callback = passport.authenticate("google", {
	failureRedirect: `${FAILURE_URL}`,
});

module.exports = { authenticate, callback };
