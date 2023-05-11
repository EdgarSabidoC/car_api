const express = require("express");
const router = express.Router();
const {
	createItemValidator,
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
router.get("/:date/:time", recordLog, getItemValidator, getItems);

/* Crea un elemento en el registro */
router.post("/", recordLog, createItemValidator, createItem);

/* Actualiza un elemento del registro */
router.put("/:date/:time", recordLog, getItemValidator, updateItem);

/* Elimina un elemento del registro */
router.delete("/:date/:time", recordLog, getItemValidator, deleteItem);

module.exports = router;
