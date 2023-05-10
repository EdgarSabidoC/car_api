const express = require("express");
const { authenticate, callback } = require("../../controllers/auth");
const { isLoggedIn } = require("../../middleware/loggedIn");

const router = express.Router();

// Ruta de autenticación de Google:
router.get("/google", authenticate);

// Ruta del callback:
router.get("/google/callback", callback);

// Ruta protegida:
router.get("/protected", isLoggedIn, (req, res) => {
	res.send("Hello!");
});

// Se cierra la sesión:
router.get("/logout", (req, res) => {
	req.logout();
	req.session.destroy();
	res.send("Goodbye!");
});

module.exports = router;
