const express = require("express");
const router = express.Router();
const {
	createItemValidator,
	getItemValidator,
} = require("../../validators/car_maker"); // Middlewares
const {
	getItems,
	getItem,
	createItem,
	updateItem,
	deleteItem,
} = require("../../controllers/car_maker"); // Controladores

// Middleware para requerir una API_KEY:
const customHeader = require("../../middleware/customHeader");

/* Obtiene una lista de elementos del registro */
router.get("/", getItems);

/* Obtiene un elemento del registro */
router.get("/:carMakerIdOrName", getItemValidator, getItem);

/* Crea un elemento en el registro */
router.post("/", createItem);

/* Actualiza un elemento del registro */
router.put("/:carMakerIdOrName", getItemValidator, updateItem);

/* Elimina un elemento del registro */
router.delete("/:carMakerIdOrName", getItemValidator, deleteItem);

module.exports = router;
