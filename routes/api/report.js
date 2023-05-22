const express = require("express");
const router = express.Router();
const { createReportValidator } = require("../../validators/report"); // Middlewares para validar.

// Middlewares:
const { recordLog } = require("../../middleware/logRecord"); // Middleware para grabar en la bitácora.
const { authMiddleware } = require("../../middleware/session"); // Middleware de autenticación.
const { checkRole } = require("../../middleware/role"); // Middleware de verificación de rol.
const { buildReport } = require("../../services/excel-service"); // Servicio que genera un archivo de Excel.

/* Genera un reporte de ventas */
router.get(
	"/:year/:month",
	// authMiddleware,
	// recordLog,
	// checkRole(["admin"]),
	createReportValidator,
	buildReport
);

module.exports = router;
