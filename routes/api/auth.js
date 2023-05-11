const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../../middleware/loggedIn"); // Middlewares para validar.
const { authenticate, callback } = require("../../controllers/auth"); // Controladores
// Middlewares:
const { recordLog } = require("../../middleware/logRecord"); // Middleware para grabar en la bitácora.

// Ruta de autenticación de Google:
router.get("/google", recordLog, authenticate);

// Ruta del callback:
router.get("/google/callback", recordLog, callback);

// Ruta protegida:
router.get("/protected", recordLog);

// Ruta de cierre de sesión:
router.get("/logout", recordLog, (req, res) => {
	req.logout();
	req.session.destroy();
	res.send("Goodbye!");
});

module.exports = router;
