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
router.get("/logout", logOut);

module.exports = router;
