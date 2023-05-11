const express = require("express");
const router = express.Router();
const {
	createItemValidator,
	getItemValidator,
} = require("../../validators/car_category"); // Middlewares
const {
	getItems,
	getItem,
	createItem,
	updateItem,
	deleteItem,
} = require("../../controllers/car_category"); // Controladores

// Middleware para requerir una API_KEY:
const customHeader = require("../../middleware/customHeader");

/* Obtiene una lista de elementos del registro */
router.get("/", getItems);

/* Obtiene un elemento del registro */
router.get("/:carCategoryIdOrName", getItemValidator, getItem);

/* Crea un elemento en el registro */
router.post("/", createItem);

/* Actualiza un elemento del registro */
router.put("/:carCategoryIdOrName", getItemValidator, updateItem);

/* Elimina un elemento del registro */
router.delete("/:carCategoryIdOrName", getItemValidator, deleteItem);

module.exports = router;
