const express = require("express");
const router = express.Router();
const {
	createItemValidator,
	getItemValidator,
} = require("../../validators/postal_code"); // Middlewares para validar.
const {
	getItems,
	getItem,
	createItem,
	updateItem,
	deleteItem,
} = require("../../controllers/postal_code"); // Controladores

// Middlewares:
const { recordLog } = require("../../middleware/logRecord"); // Middleware para grabar en la bitácora.
const { authMiddleware } = require("../../middleware/session"); // Middleware de autenticación.
const { checkRole } = require("../../middleware/role"); // Middleware de verificación de rol.

/* Obtiene una lista de elementos */
router.get("/", getItems);

/* Obtiene un elemento */
router.get("/:code", getItemValidator, getItem);

/* Crea un elemento en el registro */
router.post(
	"/",
	authMiddleware,
	checkRole(["admin", "capturist"]),
	recordLog,
	createItemValidator,
	createItem
);

/* Actualiza un elemento del registro */
router.put(
	"/:code",
	authMiddleware,
	checkRole(["admin", "capturist"]),
	recordLog,
	getItemValidator,
	updateItem
);

/* Elimina un elemento del registro */
router.delete(
	"/:code",
	authMiddleware,
	checkRole(["admin"]),
	recordLog,
	getItemValidator,
	deleteItem
);

module.exports = router;
