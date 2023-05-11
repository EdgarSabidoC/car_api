const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../../middleware/loggedIn"); // Middlware
const { authenticate, callback } = require("../../controllers/auth"); // Controladores

// Ruta de autenticación de Google:
router.get("/google", authenticate);

// Ruta del callback:
router.get("/google/callback", callback);

// Ruta protegida:
router.get("/protected", isLoggedIn, (req, res) => {
	res.send("Hello!");
});

// Ruta de cierre de sesión:
router.get("/logout", (req, res) => {
	req.logout();
	req.session.destroy();
	res.send("Goodbye!");
});

module.exports = router;
