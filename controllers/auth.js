const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
// const { sequelize } = require("../config/mariadb");
const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { signToken } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");
const { User } = require("../models");
const { Op } = require("sequelize");
const ENGINE_DB = process.env.ENGINE_DB;

/**
 * El controlador registra a un usuario.
 * @param {*} req
 * @param {*} res
 */
const registerCtrl = async (req, res) => {
	try {
		req = matchedData(req);
		const password = await encrypt(req.password); // Plain text password.
		const body = { ...req, password };
		const userData = await User.create(body);
		// Filters the password attribute for security reasons because create method doesn't filter the data:
		userData.set("password", undefined, { strict: false });

		const data = {
			token: await signToken(userData),
			user: userData,
		};

		// Se guarda el token en una cookie:
		res.cookie("token", data.token, { httpOnly: true, maxAge: 3600000 }); // La cookie expira en 1h.

		res.send({ data });
	} catch (err) {
		handleHttpError(res, "ERROR_USER_REGISTER");
	}
};

/**
 * El controlador inicia la sesión de un usuario:
 * @param {*} req
 * @param {*} res
 */
const loginCtrl = async (req, res) => {
	try {
		req = matchedData(req);
		const user = await usersModel.findOne({ where: { email: req.email } });

		if (!user) {
			handleHttpError(res, "USER_NOT_EXISTS", 404);
			return;
		}
		const passwordHash = user.get("password");
		const check = await compare(req.password, passwordHash);

		if (!check) {
			handleHttpError(res, "INVALID_PASSWORD", 401);
			return;
		}

		user.set("password", undefined, { strict: false });
		const data = {
			token: await signToken(user),
			user,
		};

		res.send({ data });
	} catch (err) {
		handleHttpError(res, "ERROR_USER_LOGIN");
	}
};

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL,
		},
		async (request, accessToken, refreshToken, profile, done) => {
			await signToken(profile);
			request.res.cookie("token", data.token, {
				httpOnly: true,
				maxAge: 3600000,
			}); // La cookie expira en 1h.
			return done(null, profile); // Éxito
			// return done(null, null); // Falla.
		}
	)
);

// passport.use(
// 	new GoogleStrategy(
// 		{
// 			clientID: process.env.GOOGLE_CLIENT_ID,
// 			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// 			callbackURL: process.env.GOOGLE_CALLBACK_URL,
// 		},
// 		async (accessToken, refreshToken, profile, done) => {
// 			try {
// 				// Busca al usuario por su email o su googleId
// 				const user = await User.findOne({
// 					where: {
// 						[Op.or]: [
// 							{ email: profile.emails[0].value },
// 							{ googleId: profile.id },
// 						],
// 					},
// 				});
// //Si el usuario no existe:
// if (!user) {
// 	return done("USER_NOT_FOUND");
// }

// // Si el usuario existe, se genera la cookie:
// await signToken(user);
// request.res.cookie("token", data.token, {
// 	httpOnly: true,
// 	maxAge: 3600000,
// });
// 				// Si el usuario ya existe, lo devuelve
// 				return done(null, user);
// 			} catch (error) {
// 				console.error(error);
// 				return done(error);
// 			}
// 		}
// 	)
// );

const authenticate = passport.authenticate("google", {
	scope: ["email", "profile"],
});

const callback = passport.authenticate("google", {
	successRedirect: "http://localhost:4200/home",
	failureRedirect: "http://localhost:4200/login",
});

module.exports = { authenticate, callback, registerCtrl, loginCtrl };
