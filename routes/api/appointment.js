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
const customHeader = require("../../middleware/customHeader"); // Middleware para requerir una API_KEY.
const { recordLog } = require("../../middleware/logRecord"); // Middleware para grabar en la bitácora.

/* Obtiene una lista de elementos del registro */
router.get("/", recordLog, getAllItems);

/* Obtiene un elemento del registro */
router.get("/:date/:time", recordLog, getItemsValidator, getItems);

/* Crea un elemento en el registro */
router.post("/", recordLog, createItemValidator, createItem);

/* Actualiza un elemento del registro */
router.put("/:appointmentId", recordLog, getItemValidator, updateItem);

/* Elimina un elemento del registro */
router.delete("/:appointmentId", recordLog, getItemValidator, deleteItem);

module.exports = router;
