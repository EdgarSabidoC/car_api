const express = require("express");
const router = express.Router();
const {
	getItems,
	getItem,
	createItem,
	updateItem,
	deleteItem,
} = require("../../controllers/car"); // Controladores

// Middlewares:
const { recordLog } = require("../../middleware/logRecord"); // Middleware para grabar en la bitácora.
const { authMiddleware } = require("../../middleware/session"); // Middleware de autenticación.
const { checkRole } = require("../../middleware/role"); // Middleware de verificación de rol.
const {
	createStorageMiddleware,
	updateStorageMiddleware,
} = require("../../utils/handleStorage"); // Middlewares para almacenar una imagen.
const {
	createItemValidator,
	getItemValidator,
} = require("../../validators/car"); // Middlewares para validar.

/* Obtiene una lista de elementos del registro */
router.get("/", getItems);

/* Obtiene un elemento del registro */
router.get("/:vin", getItemValidator, getItem);

/* Crea un elemento en el registro */
router.post(
	"/",
	// authMiddleware,
	// checkRole(["admin", "capturist"]),
	// recordLog,
	// createItemValidator,
	createStorageMiddleware.single("car_image"),
	createItem
);

/* Actualiza un elemento del registro */
router.put(
	"/:vin",
	// authMiddleware,
	// checkRole(["admin", "capturist"]),
	// recordLog,
	getItemValidator,
	updateStorageMiddleware.single("car_image"),
	updateItem
);

/* Elimina un elemento del registro */
router.delete(
	"/:vin",
	// authMiddleware,
	// checkRole(["admin"]),
	// recordLog,
	getItemValidator,
	deleteItem
);

module.exports = router;
