const express = require("express");
const router = express.Router();
const {
	createItemValidator,
	getItemsValidator,
	getItemValidator,
} = require("../../validators/appointment"); // Middlewares para validar.
const {
	getAllItems,
	getItems,
	createItem,
	updateItem,
	deleteItem,
} = require("../../controllers/appointment"); // Controladores

// Middlewares:
// const customHeader = require("../../middleware/customHeader"); // Middleware para requerir una API_KEY.
const { recordLog } = require("../../middleware/logRecord"); // Middleware para grabar en la bitácora.
const { authMiddleware } = require("../../middleware/session"); // Middleware de autenticación.
const { checkRole } = require("../../middleware/role"); // Middleware de verificación de rol.
const { buildPdf } = require("../../services/pdf-service"); // Servicio que genera un PDF.
const { sendPdfToEmail } = require("../../services/email-service"); // Servicio que manda un correo electrónico.
/* Obtiene una lista de elementos del registro */
router.get("/", getAllItems);

/* Manda un PDF a un correo electrónico */
router.get("/pdf", buildPdf, sendPdfToEmail);

/* Obtiene un elemento del registro */
router.get("/:date/:time", getItemsValidator, getItems);

// Agregar middleware para enviar correo electrónico.
/* Crea un elemento en el registro */
router.post(
	"/",
	recordLog,
	createItemValidator,
	createItem,
	buildPdf,
	sendPdfToEmail
);

/* Actualiza un elemento del registro */
router.put(
	"/:appointmentId",
	authMiddleware,
	checkRole(["admin", "capturist"]),
	recordLog,
	getItemValidator,
	updateItem
);

/* Elimina un elemento del registro */
router.delete(
	"/:appointmentId",
	authMiddleware,
	checkRole(["admin"]),
	recordLog,
	getItemValidator,
	deleteItem
);

module.exports = router;
