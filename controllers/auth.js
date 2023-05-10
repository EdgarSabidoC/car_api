const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const { sequelize } = require("../config/mariadb");
const { User } = require("../models");
const { Op } = require("sequelize");

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

// passport.use(
// 	new GoogleStrategy(
// 		{
// 			clientID: process.env.GOOGLE_CLIENT_ID,
// 			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// 			callbackURL: process.env.GOOGLE_CALLBACK_URL,
// 		},
// 		function (request, accessToken, refreshToken, profile, done) {
// 			return done(null, profile);
// 		}
// 	)
// );

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL,
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				// Busca al usuario por su email o su googleId
				const user = await User.findOne({
					where: {
						[Op.or]: [
							{ email: profile.emails[0].value },
							{ googleId: profile.id },
						],
					},
				});

				// Si el usuario ya existe, lo devuelve
				return done(null, user);
			} catch (error) {
				console.error(error);
				return done(error);
			}
		}
	)
);

const authenticate = passport.authenticate("google", {
	scope: ["email", "profile"],
});

const callback = passport.authenticate("google", {
	successRedirect: "/api/auth/protected",
	failureRedirect: "/api/auth/login",
});

module.exports = { authenticate, callback };
