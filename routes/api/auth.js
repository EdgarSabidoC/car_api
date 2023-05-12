const express = require("express");
// const cookieParser = require("cookie-parser");
const router = express.Router();
const { authenticate, callback } = require("../../controllers/auth"); // Controladores
// Middlewares:
const { recordLog } = require("../../middleware/logRecord"); // Middleware para grabar en la bitácora.
const handleAuthCallback = require("../../utils/handleAuthCallback");

// Ruta de autenticación de Google:
router.get("/google", recordLog, authenticate);

// Ruta del callback:
router.get("/google/callback", recordLog, callback, handleAuthCallback);

// Ruta de cierre de sesión:
router.get("/logout", recordLog, (req, res) => {
	req.logout();
	req.session.destroy();
	res.cookie("token", "", { maxAge: 0, httpOnly: true, secure: true });
	res.redirect("http://localhost:4200/home");
});

module.exports = router;
