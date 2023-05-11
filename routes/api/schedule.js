const express = require("express");
const router = express.Router();
const {
	createItemValidator,
	getItemValidator,
} = require("../../validators/schedule"); // Middlewares
const {
	getItems,
	getItem,
	createItem,
	updateItem,
	deleteItem,
} = require("../../controllers/schedule"); // Controladores

// Middleware para requerir una API_KEY:
const customHeader = require("../../middleware/customHeader");

/* Obtiene una lista de elementos */
router.get("/", getItems);

/* Obtiene un elemento */
router.get("/:scheduleIdOrHour", getItemValidator, getItem);

/* Crea un elemento en el registro */
router.post("/", createItem);

/* Actualiza un elemento del registro */
router.put("/:scheduleIdOrHour", getItemValidator, updateItem);

/* Elimina un elemento del registro */
router.delete("/:scheduleIdOrHour", getItemValidator, deleteItem);

module.exports = router;
