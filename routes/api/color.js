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
} = require("../../controllers/color");
// const customHeader = require("../middleware/customHeader");

/* Obtiene una lista de elementos */
router.get("/", getItems);

/* Obtiene un elemento */
router.get("/:colorIdOrName", getItemValidator, getItem);

/* Elimina un elemento del registro */
router.delete("/:colorIdOrName", deleteItem);

module.exports = router;
