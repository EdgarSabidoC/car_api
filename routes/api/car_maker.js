const express = require("express");
const router = express.Router();
const {
	createItemValidator,
	getItemValidator,
} = require("../../validators/car_maker"); // Middlewares para validar.
const {
	getItems,
	getItem,
	createItem,
	updateItem,
	deleteItem,
} = require("../../controllers/car_maker"); // Controladores

// Middlewares:
const customHeader = require("../../middleware/customHeader"); // Middleware para requerir una API_KEY.
const { recordLog } = require("../../middleware/logRecord"); // Middleware para grabar en la bitácora.
const { authMiddleware } = require("../../middleware/session"); // Middleware de autenticación.
const { checkRole } = require("../../middleware/role"); // Middleware de verificación de rol.
process.env.NODE_ENV;

/* Obtiene una lista de elementos del registro */
router.get("/", recordLog, getItems);

/* Obtiene un elemento del registro */
router.get("/:carMakerIdOrName", recordLog, getItemValidator, getItem);

/* Crea un elemento en el registro */
router.post("/", recordLog, createItemValidator, createItem);

/* Actualiza un elemento del registro */
router.put("/:carMakerIdOrName", recordLog, getItemValidator, updateItem);

/* Elimina un elemento del registro */
router.delete("/:carMakerIdOrName", recordLog, getItemValidator, deleteItem);

module.exports = router;
