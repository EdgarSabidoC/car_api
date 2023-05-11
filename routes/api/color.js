const express = require("express");
const router = express.Router();
const {
	createItemValidator,
	getItemValidator,
} = require("../../validators/color"); // Middlewares
const {
	getItems,
	getItem,
	createItem,
	updateItem,
	deleteItem,
} = require("../../controllers/color"); // Controladores

// Middleware para requerir una API_KEY:
const customHeader = require("../../middleware/customHeader");

/* Obtiene una lista de elementos del registro */
router.get("/", getItems);

/* Obtiene un elemento del registro */
router.get("/:colorIdOrName", getItemValidator, getItem);

/* Crea un elemento en el registro */
router.post("/", createItem);

/* Actualiza un elemento del registro */
router.put("/:colorIdOrName", getItemValidator, updateItem);

/* Elimina un elemento del registro */
router.delete("/:colorIdOrName", getItemValidator, deleteItem);

module.exports = router;
