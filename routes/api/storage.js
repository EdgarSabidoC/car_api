const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../../utils/handleStorage");
const { getItemValidator } = require("../../validators/storage"); // Middlewares
const {
	getItems,
	getItem,
	createItem,
	deleteItem,
} = require("../../controllers/storage");

/* Gets an item list */
router.get("/", getItems);

/* Gets an item */
router.get("/:id", getItemValidator, getItem);

/* Creates an item register */
router.post("/", uploadMiddleware.single("myfile"), createItem);

/* Deletes an item register */
router.delete("/:id", getItemValidator, deleteItem);

module.exports = router;
