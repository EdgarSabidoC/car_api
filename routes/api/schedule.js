const express = require("express");
const router = express.Router();
const {
	createItemValidator,
	getItemValidator,
} = require("../../validators/schedule"); // Middlewares para validar.
const {
	getItems,
	getItem,
	createItem,
	updateItem,
	deleteItem,
} = require("../../controllers/schedule"); // Controladores

// Middlewares:
const customHeader = require("../../middleware/customHeader"); // Middleware para requerir una API_KEY.
const { recordLog } = require("../../middleware/logRecord"); // Middleware para grabar en la bitácora.

/* Obtiene una lista de elementos */
router.get("/", recordLog, getItems);

/* Obtiene un elemento */
router.get("/:scheduleIdOrHour", recordLog, getItemValidator, getItem);

/* Crea un elemento en el registro */
router.post("/", recordLog, createItemValidator, createItem);

/* Actualiza un elemento del registro */
router.put("/:scheduleIdOrHour", recordLog, getItemValidator, updateItem);

/* Elimina un elemento del registro */
router.delete("/:scheduleIdOrHour", recordLog, getItemValidator, deleteItem);

module.exports = router;
