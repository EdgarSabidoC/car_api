const express = require("express");
const router = express.Router();
const { createReportValidator } = require("../../validators/report"); // Middlewares para validar.

// Middlewares:
// const customHeader = require("../../middleware/customHeader"); // Middleware para requerir una API_KEY.
const { recordLog } = require("../../middleware/logRecord"); // Middleware para grabar en la bitácora.
const { authMiddleware } = require("../../middleware/session"); // Middleware de autenticación.
const { checkRole } = require("../../middleware/role"); // Middleware de verificación de rol.
const { buildReport } = require("../../services/xlsx-service"); // Servicio que genera un archivo de Excel.

/* Crea un elemento en el registro */
router.get("/:year/:month", recordLog, createReportValidator, buildReport);

module.exports = router;
