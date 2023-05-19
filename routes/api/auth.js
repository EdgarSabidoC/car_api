const express = require("express");
const router = express.Router();
const { authenticate, callback } = require("../../controllers/auth"); // Controladores
// Middlewares:
const { recordLog } = require("../../middleware/logRecord"); // Middleware para grabar en la bitácora.
const handleAuthCallback = require("../../utils/handleAuthCallback");
const { isLoggedIn } = require("../../middleware/loggedIn"); // Middleware para grabar en la bitácora.
const { logOut } = require("../../utils/handleLogout");

// Ruta de autenticación de Google:
router.get("/google", recordLog, authenticate);

// Ruta del callback:
router.get("/google/callback", recordLog, callback, handleAuthCallback);

router.get("/loggedin", isLoggedIn);

// Ruta de cierre de sesión:
router.get("/logout", (req, res) => {
	req.session.destroy(); // Se destruye la sesión.
	res.cookie("token", "", { maxAge: 0, httpOnly: true }); // Se destruye la cookie con el token.
	// Se configuran los encabezados:
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
	res.setHeader("Access-Control-Allow-Credentials", "true");

	// Se envía el estado de la respuesta:
	res.status(200).json({ message: "Logout successful!" });
});

module.exports = router;
