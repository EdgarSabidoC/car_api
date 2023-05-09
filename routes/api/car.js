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
} = require("../../controllers/car");
// const customHeader = require("../middleware/customHeader");

/* Obtiene una lista de elementos */
router.get("/", getItems);

/* Obtiene un elemento */
router.get("/", getItemValidator, getItem);

/* Crea un registro de un elemento si el usuario es admin */
router.post("/", createItemValidator, createItem);

/* Updates an item register */
router.put("/:id", getItemValidator, createItemValidator, updateItem);

/* Deletes an item register */
router.delete("/:id", getItemValidator, deleteItem);

module.exports = router;
