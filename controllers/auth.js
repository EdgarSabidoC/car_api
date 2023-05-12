const passport = require("passport");
const cookieParser = require("cookie-parser");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { signToken } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");
const { User } = require("../models");
const { Op } = require("sequelize");
const ENGINE_DB = process.env.ENGINE_DB;
const handleAuthCallback = require("../utils/handleAuthCallback");

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

const authenticate = passport.authenticate("google", {
	scope: ["email", "profile"],
});

const callback = passport.authenticate("google", {
	failureRedirect: "http://localhost:4200/login",
	failureFlash: true,
});

module.exports = { authenticate, callback };
