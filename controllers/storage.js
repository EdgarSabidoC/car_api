const fs = require("fs");
const { storageModel } = require("../models"); // References to exported in models/index.js
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;
const ENGINE_DB = process.env.ENGINE_DB;

/**
 * It gets all the data from the database and sends it to the client
 * @param req - The request object.
 * @param res - The response object.
 */
const getItems = async (req, res) => {
	try {
		const data =
			ENGINE_DB === "mongodb"
				? await storageModel.find({})
				: await storageModel.findAll();
		res.send({ data });
	} catch (err) {
		handleHttpError(res, "ERROR_GET_ITEMS: " + err);
	}
};

/**
 * `getItem` is a function that takes in a request and a response and returns nothing
 * @param req - The request object.
 * @param res - The response object.
 */
const getItem = async (req, res) => {
	try {
		const { id } = matchedData(req);
		const data =
			ENGINE_DB === "mongodb"
				? await storageModel.findById(id)
				: await storageModel.findOne({ where: { id } });
		res.send({ data });
	} catch (err) {
		handleHttpError(res, "ERROR_GET_ITEM");
	}
};

/**
 * This function creates a new item in the database.
 * @param req - The request object. This is an object that represents the HTTP request that the client
 * sent to the server. It contains information about the request, including the URL, the HTTP headers,
 * and much more.
 * @param res - The response object.
 */
const createItem = async (req, res) => {
	try {
		const { file } = req;
		const fileData = {
			filename: file.filename,
			url: `${PUBLIC_URL}/${file.filename}`,
		};
		const data = await storageModel.create(fileData);
		res.send({ data });
	} catch (err) {
		handleHttpError(res, "ERROR_CREATE_ITEM: " + err);
	}
};

/**
 * This function deletes an item from the database.
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
const deleteItem = async (req, res) => {
	try {
		const { id } = matchedData(req);
		const dataFile = await storageModel.findById(id);
		await storageModel.delete({ _id: id }); // Deletes the file from DB.
		const { filename } = dataFile;
		const filePath = `${MEDIA_PATH}/${filename}`; // Absolute path.
		// fs.unlinkSync(filePath); // Deletes the file from storage.
		const data = {
			filePath,
			deleted: true,
		};
		res.send({ data });
	} catch (err) {
		handleHttpError(res, "ERROR_DELETE_ITEM");
	}
};

module.exports = { getItems, getItem, createItem, deleteItem };
