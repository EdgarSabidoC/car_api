const express = require("express");
const router = express.Router();
const {
	createItemValidator,
	getItemValidator,
} = require("../../validators/state"); // Middlewares para validar.
const {
	getItems,
	getItem,
	createItem,
	updateItem,
	deleteItem,
} = require("../../controllers/state"); // Controladores

// Middlewares:
const { recordLog } = require("../../middleware/logRecord"); // Middleware para grabar en la bitácora.
const { authMiddleware } = require("../../middleware/session"); // Middleware de autenticación.
const { checkRole } = require("../../middleware/role"); // Middleware de verificación de rol.

/* Obtiene una lista de elementos del registro */
router.get("/", getItems);

/* Obtiene un elemento del registro */
router.get("/:stateIdOrName", getItemValidator, getItem);

/* Crea un elemento en el registro */
router.post(
	"/",
	recordLog,
	authMiddleware,
	checkRole(["admin", "capturist"]),
	createItemValidator,
	createItem
);

/* Actualiza un elemento del registro */
router.put(
	"/:stateIdOrName",
	authMiddleware,
	checkRole(["admin"]),
	recordLog,
	getItemValidator,
	updateItem
);

/* Elimina un elemento del registro */
router.delete(
	"/:stateIdOrName",
	authMiddleware,
	checkRole(["admin"]),
	recordLog,
	getItemValidator,
	deleteItem
);

module.exports = router;
