const express = require("express");
const router = express.Router();
const {
	createItemValidator,
	getItemValidator,
} = require("../../validators/state"); // Middlewares
const {
	getItems,
	getItem,
	createItem,
	updateItem,
	deleteItem,
} = require("../../controllers/state"); // Controladores

// Middleware para requerir una API_KEY:
const customHeader = require("../../middleware/customHeader");

/* Obtiene una lista de elementos del registro */
router.get("/", getItems);

/* Obtiene un elemento del registro */
router.get("/:stateIdOrName", getItemValidator, getItem);

/* Crea un elemento en el registro */
router.post("/", createItem);

/* Actualiza un elemento del registro */
router.put("/:stateIdOrName", getItemValidator, updateItem);

/* Elimina un elemento del registro */
router.delete("/:stateIdOrName", getItemValidator, deleteItem);

module.exports = router;
