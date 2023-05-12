const express = require("express");
const router = express.Router();
const {
	createItemValidator,
	getItemValidator,
} = require("../../validators/postal_code"); // Middlewares para validar.
const {
	getItems,
	getItem,
	createItem,
	updateItem,
	deleteItem,
} = require("../../controllers/postal_code"); // Controladores

// Middlewares:
const customHeader = require("../../middleware/customHeader"); // Middleware para requerir una API_KEY.
const { recordLog } = require("../../middleware/logRecord"); // Middleware para grabar en la bitácora.
const { authMiddleware } = require("../../middleware/session"); // Middleware de autenticación.
const { checkRole } = require("../../middleware/role"); // Middleware de verificación de rol.
const devMode = process.env.NODE_ENV;

/* Obtiene una lista de elementos */
router.get("/", recordLog, getItems);

/* Obtiene un elemento */
router.get("/:code", recordLog, getItemValidator, getItem);

/* Crea un elemento en el registro */
router.post("/", recordLog, createItemValidator, createItem);

/* Actualiza un elemento del registro */
router.put("/:code", recordLog, getItemValidator, updateItem);

/* Elimina un elemento del registro */
router.delete("/:code", recordLog, getItemValidator, deleteItem);

module.exports = router;
