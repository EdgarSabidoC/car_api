const express = require("express");
const router = express.Router();
const {
	createItemValidator,
	getItemValidator,
} = require("../../validators/maintenance_type"); // Middlewares
const {
	getItems,
	getItem,
	createItem,
	updateItem,
	deleteItem,
} = require("../../controllers/maintenance_type"); // Controladores

// Middleware para requerir una API_KEY:
const customHeader = require("../../middleware/customHeader");

/* Obtiene una lista de elementos del registro */
router.get("/", getItems);

/* Obtiene un elemento del registro */
router.get("/:maintenanceTypeIdOrConcept", getItemValidator, getItem);

/* Crea un elemento en el registro */
router.post("/", createItem);

/* Actualiza un elemento del registro */
router.put("/:maintenanceTypeIdOrConcept", getItemValidator, updateItem);

/* Elimina un elemento del registro */
router.delete("/:maintenanceTypeIdOrConcept", getItemValidator, deleteItem);

module.exports = router;
