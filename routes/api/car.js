const express = require("express");
const router = express.Router();
const {
	createItemValidator,
	getItemValidator,
} = require("../../validators/car"); // Middlewares
const {
	getItems,
	getItem,
	createItem,
	updateItem,
	deleteItem,
} = require("../../controllers/car"); // Controladores

// Middleware para requerir una API_KEY:
const customHeader = require("../../middleware/customHeader");

/* Obtiene una lista de elementos del registro */
router.get("/", getItems);

/* Obtiene un elemento del registro */
router.get("/", getItemValidator, getItem);

/* Crea un elemento en el registro */
router.post("/", createItemValidator, createItem);

/* Actualiza un elemento del registro */
router.put("/:id", getItemValidator, createItemValidator, updateItem);

/* Elimina un elemento del registro */
router.delete("/:id", getItemValidator, deleteItem);

module.exports = router;
